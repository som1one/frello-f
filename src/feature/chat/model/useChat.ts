// hooks/useChat.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { logger } from '@/utils/logger'

import {
	checkSettingsFilled,
	createChat,
	deleteAllChats,
	deleteChat,
	fetchChats,
	renameChat,
	savePlanOrRecipe,
	toggleFavorite
} from './chat.service'
import { Chat, ChatContextType, savePlanOrRecipeFunc } from './chat.types'
import { useMessages } from './useMessages'

export const useChat = (): ChatContextType => {
	const queryClient = useQueryClient()
	const router = useRouter()
	// Загрузка чатов
	const {
		data: chats = [],
		error: chatsError,
		isLoading: isChatListLoading
	} = useQuery<Chat[], Error>({
		queryKey: ['chats'],
		queryFn: fetchChats
	})

	const { data: isSettingsFilled } = useQuery({
		queryKey: ['settings-fill'],
		queryFn: checkSettingsFilled
	})

	const [activeChatId, setActiveChatId] = useState<number | null>(null)

	useEffect(() => {
		if (!activeChatId && chats.length > 0) {
			setActiveChatId(chats[0].id)
		}
	}, [chats, activeChatId])

	const {
		messages,
		handleRegenerateMessage,
		messagesError,
		sendMessage,
		isSendMessageLoading,
		isRegenerating,
		isLimitModalOpen,
		setIsLimitModalOpen,
		error,
		retryLastMessage,
		limitType
	} = useMessages({ activeChatId, queryClient })

	// Создание нового чата
	const createChatMutation = useMutation({
		mutationFn: async () => {
			let title = 'Новый чат'
			let chatCount = 1
			while (
				chats.some(
					chat =>
						chat.title === (chatCount === 1 ? title : `${title} (${chatCount})`)
				)
			) {
				chatCount++
			}
			title = chatCount === 1 ? title : `${title} (${chatCount})`
			return createChat(title)
		},
		onSuccess: newChat => {
			queryClient.setQueryData(['chats'], (old: Chat[] | undefined) => [
				...(old ?? []),
				newChat
			])
			setActiveChatId(newChat.id)
			queryClient.setQueryData(['messages', newChat.id], [])
			// Navigate to chat page
			router.push('/chat')
		},
		onError: (error: Error) => {
			console.error('Failed to create chat:', error.message)
		}
	})

	// Удаление чата
	const deleteChatMutation = useMutation({
		mutationFn: deleteChat,
		onSuccess: (_, chatId) => {
			queryClient.setQueryData(
				['chats'],
				(old: Chat[] | undefined) =>
					old?.filter(chat => chat.id !== chatId) ?? []
			)
			if (activeChatId === chatId) {
				const remainingChats = queryClient.getQueryData<Chat[]>(['chats']) ?? []
				setActiveChatId(
					remainingChats.length > 0
						? remainingChats[remainingChats.length - 1].id
						: null
				)
			}
			queryClient.removeQueries({ queryKey: ['messages', chatId] })
		},
		onError: (error: Error) => {
			logger.error('Failed to delete chat:', error.message)
		}
	})

	// Удаление всех чатов
	const deleteAllChatsMutation = useMutation({
		mutationFn: deleteAllChats,
		onSuccess: () => {
			queryClient.setQueryData(['chats'], [])
			queryClient.removeQueries({ queryKey: ['messages'] })
			setActiveChatId(null)
		},
		onError: (error: Error) => {
			logger.error('Failed to delete all chats:', error.message)
		}
	})

	// Переключение избранного
	const toggleFavoriteMutation = useMutation({
		mutationFn: ({
			chatId,
			messageId
		}: {
			chatId: number
			messageId: number
		}) => toggleFavorite(chatId, messageId),
		onError: (error: Error) => {
			logger.error('Failed to toggle favorite:', error.message)
		}
	})

	// Сохранение плана или рецепта
	const savePlanOrRecipeMutation = useMutation({
		mutationFn: (messageId: number) => savePlanOrRecipe(messageId),
		onSuccess: () => {
			// Обновляем сообщения после сохранения
			if (activeChatId) {
				queryClient.invalidateQueries({ queryKey: ['messages', activeChatId] })
			}
		},
		onError: (error: Error) => {
			logger.error('Failed to save plan or recipe:', error.message)
		}
	})

	const renameChatMutation = useMutation({
		mutationFn: ({
			chatId,
			newChatTitle
		}: {
			chatId: number
			newChatTitle: string
		}) => renameChat(chatId, newChatTitle),
		onSuccess: (_updatedChat, { chatId, newChatTitle }) => {
			queryClient.setQueryData(
				['chats'],
				(old: Chat[] | undefined) =>
					old?.map(chat =>
						chat.id === chatId ? { ...chat, title: newChatTitle } : chat
					) ?? []
			)
			logger.log('Renaming done successfully')
		},
		onError: (error: Error) => {
			logger.error('Failed to rename chat:', error.message)
		}
	})

	// Адаптация сигнатур для соответствия ChatContextType
	const addNewChat = useCallback(async (): Promise<void> => {
		await createChatMutation.mutateAsync()
	}, [createChatMutation])

	const renameChatCallback = useCallback(
		async (chatId: number, newChatTitle: string): Promise<void> => {
			if (!chatId || !newChatTitle.trim()) {
				logger.error('Invalid chatId or empty title')
				return
			}
			await renameChatMutation.mutateAsync({ chatId, newChatTitle })
		},
		[renameChatMutation]
	)

	if (chatsError || messagesError) {
		logger.error('Chat error:', chatsError?.message || messagesError?.message)
	}

	return {
		chats,
		activeChatId,
		messages,
		addNewChat,
		deleteChat: deleteChatMutation.mutateAsync,
		deleteAllChats: deleteAllChatsMutation.mutateAsync,
		toggleFavorite: toggleFavoriteMutation.mutateAsync,
		savePlanOrRecipe: savePlanOrRecipeMutation.mutateAsync as savePlanOrRecipeFunc,
		renameChat: renameChatCallback,
		isChatListLoading,
		sendMessage,
		setActiveChatId,
		handleRegenerateMessage,
		isSendMessageLoading,
		isRegenerating,
		isLimitModalOpen,
		setIsLimitModalOpen,
		isSettingsFilled,
		error,
		retryLastMessage,
		limitType
	}
}
