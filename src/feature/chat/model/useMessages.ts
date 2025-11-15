import { QueryClient, useMutation, useQuery } from '@tanstack/react-query'
import { useCallback, useState } from 'react'

import { handleError } from '@/utils/errorHandler'
import { logger } from '@/utils/logger'

import {
	fetchChatGPTResponse,
	fetchMessages,
	regenerateMessage
} from './chat.service'
import { AiResponseType, Message } from './chat.types'

interface ArgsTypes {
	activeChatId: number | null
	queryClient: QueryClient
}

export const useMessages = ({ activeChatId, queryClient }: ArgsTypes) => {
	const [isLimitModalOpen, setIsLimitModalOpen] = useState(false)
	const [error, setError] = useState<string | null>(null)

	const { data: messages = [], error: messagesError } = useQuery<
		Message[],
		Error
	>({
		queryKey: ['messages', activeChatId],
		queryFn: () => fetchMessages(activeChatId!),
		enabled: !!activeChatId
	})

	const setLimitType = useCallback(
		(type: 'daily' | 'trial' | null) => {
			queryClient.setQueryData(['limitType'], type)
		},
		[queryClient]
	)

	const fetchAiResponseMutation = useMutation<
		{ userMessage: Message; assistantMessage: Message | null } | null,
		Error,
		{
			chatId: number
			content: string
		},
		{ tempUserMessage: Message; tempAssistantMessage: Message }
	>({
		mutationFn: async ({ chatId, content }) =>
			fetchChatGPTResponse(chatId, content),
		onMutate: async ({ chatId, content }) => {
			await queryClient.cancelQueries({ queryKey: ['messages', chatId] })
			const tempUserMessage: Message = {
				id: Date.now(),
				content: content,
				isUser: true,
				chatId,
				dishId: null,
				planId: null,
				createdAt: new Date().toISOString(),
				aiResponseType: AiResponseType.TEXT,
				isLiked: false
			}
			const tempAssistantMessage: Message = {
				id: Date.now() + 1,
				content: '',
				isUser: false,
				chatId,
				dishId: null,
				planId: null,
				createdAt: new Date().toISOString(),
				aiResponseType: AiResponseType.TEXT,
				isLiked: false
			}
			queryClient.setQueryData(
				['messages', chatId],
				(old: Message[] | undefined) => [
					...(old ?? []),
					tempUserMessage,
					tempAssistantMessage
				]
			)
			setError(null)
			return { tempUserMessage, tempAssistantMessage }
		},
		onError: (error, { chatId }, context) => {
			queryClient.setQueryData(
				['messages', chatId],
				(old: Message[] | undefined) =>
					old?.filter(
						msg =>
							msg.id !== context?.tempUserMessage.id &&
							msg.id !== context?.tempAssistantMessage.id
					) ?? []
			)
			handleError(error, setError, setIsLimitModalOpen, setLimitType)
		},
		onSuccess: (response, { chatId }, context) => {
			if (!response) return
			const { userMessage, assistantMessage } = response
			queryClient.setQueryData(
				['messages', chatId],
				(old: Message[] | undefined) => {
					const filtered =
						old?.filter(
							msg =>
								msg.id !== context?.tempUserMessage.id &&
								msg.id !== context?.tempAssistantMessage.id
						) ?? []
					return [
						...filtered,
						userMessage,
						...(assistantMessage ? [assistantMessage] : [])
					]
				}
			)
		}
	})

	const regenerateMessageMutation = useMutation<
		{ assistantMessage: Message | null; userMessage: Message },
		Error,
		{
			chatId: number
			messageId: number
		},
		{ prevAssistantMessageId: number | null; prevUserMessageId: number | null }
	>({
		mutationFn: async ({ chatId, messageId }) =>
			regenerateMessage(chatId, messageId),
		onMutate: async ({ chatId, messageId }) => {
			await queryClient.cancelQueries({ queryKey: ['messages', chatId] })
			const prevMessages =
				queryClient.getQueryData<Message[]>(['messages', chatId]) ?? []
			const prevAssistantMessage = prevMessages.find(
				(msg, index) => !msg.isUser && prevMessages[index - 1]?.id === messageId
			)
			const prevUserMessage = prevMessages.find(
				msg => msg.isUser && msg.id === messageId
			)
			setError(null)
			return {
				prevAssistantMessageId: prevAssistantMessage?.id ?? null,
				prevUserMessageId: prevUserMessage?.id ?? null
			}
		},
		onError: error => {
			handleError(error, setError, setIsLimitModalOpen, setLimitType)
		},
		onSuccess: (response, { chatId }, context) => {
			if (!response) return
			const { assistantMessage, userMessage } = response
			queryClient.setQueryData(
				['messages', chatId],
				(old: Message[] | undefined) => {
					const filtered =
						old?.filter(
							msg =>
								msg.id !== context?.prevAssistantMessageId &&
								msg.id !== context?.prevUserMessageId
						) ?? []
					return [
						...filtered,
						userMessage,
						...(assistantMessage
							? [{ ...assistantMessage, isUser: false }]
							: [])
					]
				}
			)
			queryClient.invalidateQueries({ queryKey: ['messages', chatId] }) // Рефетч с сервера
		}
	})

	const animateMessage = useCallback(
		(chatId: number, messageId: number, fullText: string): Promise<void> => {
			return new Promise(resolve => {
				let currentText = ''
				let index = 0
				const chunkSize = 5 // Рендерим по 5 символов за раз
				const delay = 10 // Задержка в мс между обновлениями

				const animate = () => {
					if (index < fullText.length) {
						currentText += fullText.slice(index, index + chunkSize)
						queryClient.setQueryData(
							['messages', chatId],
							(old: Message[] | undefined) =>
								old?.map(msg =>
									msg.id === messageId ? { ...msg, content: currentText } : msg
								) ?? []
						)
						index += chunkSize
						setTimeout(animate, delay)
					} else {
						resolve()
					}
				}
				setTimeout(animate, delay)
			})
		},
		[queryClient]
	)

	const sendMessage = useCallback(
		async (content: string) => {
			if (!content.trim() || !activeChatId) return
			try {
				const response = await fetchAiResponseMutation.mutateAsync({
					chatId: activeChatId,
					content: content
				})

				if (!response) {
					throw new Error('No response from fetchChatGPTResponse')
				}

				const { assistantMessage } = response

				// await animateMessage(activeChatId, userMessage.id, userMessage.content)

				if (assistantMessage) {
					await animateMessage(
						activeChatId,
						assistantMessage.id,
						assistantMessage.content
					)
				}
			} catch (error: any) {
				console.error(error)
				// handleError(error, setError, setIsLimitModalOpen, setLimitType)
			}
		},
		[activeChatId, messages, queryClient, fetchAiResponseMutation]
	)

	const handleRegenerateMessage = useCallback(
		async ({ chatId, messageId }: { chatId: number; messageId: number }) => {
			try {
				const response = await regenerateMessageMutation.mutateAsync({
					chatId,
					messageId
				})

				const { assistantMessage } = response

				// await animateMessage(chatId, userMessage.id, userMessage.content)

				if (assistantMessage) {
					await animateMessage(
						chatId,
						assistantMessage.id,
						assistantMessage.content
					)
				}
			} catch (error: any) {
				console.error(error)
				// handleError(error, setError, setIsLimitModalOpen, setLimitType)
			}
		},
		[regenerateMessageMutation, queryClient, messages]
	)

	const retryLastMessage = useCallback(async () => {
		if (!activeChatId || !messages.length) {
			setError('Нет сообщений для повторного запроса.')
			return
		}
		const lastUserMessage = messages.find(
			msg => msg.isUser && msg.chatId === activeChatId
		)
		if (!lastUserMessage) {
			setError('Нет пользовательских сообщений для повторного запроса.')
			return
		}
		await fetchAiResponseMutation.mutateAsync({
			chatId: activeChatId,
			content: lastUserMessage.content
		})
	}, [activeChatId, messages, fetchAiResponseMutation])

	if (messagesError) {
		logger.error('Messages error', messagesError.message)
	}

	const limitType = queryClient.getQueryData<'daily' | 'trial'>(['limitType'])

	return {
		messages,
		messagesError,
		handleRegenerateMessage,
		sendMessage,
		isSendMessageLoading: fetchAiResponseMutation.isPending,
		isRegenerating: regenerateMessageMutation.isPending,
		isLimitModalOpen,
		setIsLimitModalOpen,
		error,
		retryLastMessage,
		limitType
	}
}
