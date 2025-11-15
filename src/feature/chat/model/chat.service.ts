// services/chat.service.ts
import { axiosWithAuth } from '@/api/interceptors'

import { Chat, Message } from './chat.types'

export const fetchChats = async (): Promise<Chat[]> => {
	const response = await axiosWithAuth.get('/chats')
	return response.data
}

export const fetchMessages = async (chatId: number): Promise<Message[]> => {
	const response = await axiosWithAuth.get(`/chats/${chatId}/messages`)
	return response.data
}

export const createChat = async (title: string): Promise<Chat> => {
	const response = await axiosWithAuth.post('/chats/create', { title })
	return response.data
}

export const deleteChat = async (chatId: number): Promise<void> => {
	await axiosWithAuth.post(`/chats/${chatId}/delete`)
}

export const deleteAllChats = async (): Promise<void> => {
	await axiosWithAuth.delete('/chats/delete-all')
}

export const renameChat = async (chatId: number, newChatTitle: string) => {
	return await axiosWithAuth.patch(`/chats/${chatId}/rename`, {
		newTitle: newChatTitle
	})
}

export const toggleFavorite = async (
	chatId: number,
	messageId: number
): Promise<void> => {
	await axiosWithAuth.post(`/ai/chat/${chatId}/message/${messageId}/favorite`)
	// if (message.planId && message.planId > 0 && message.id) {
	// 	await axiosWithAuth.post(`/plan/toggle/byMessageId/${message.id}`)
	// }
	// if (!message.planId && message.dishId && message.dishId > 0) {
	// 	await axiosWithAuth.post(`/dish/favorite/toggle/${message.dishId}`)
	// }
}

export const regenerateMessage = async (
	chatId: number,
	messageId: number
): Promise<{ assistantMessage: Message | null; userMessage: Message }> => {
	console.log('regenerateMessage args', {
		chatId,
		messageId
	})
	try {
		const response = await axiosWithAuth.post(
			`/ai/chat/${chatId}/message/${messageId}/regenerate`
		)
		console.log('response regenerate', response.data)
		return response.data
	} catch (error) {
		console.error('Failed to regenerate message:', error)
		throw error
	}
}

export const fetchChatGPTResponse = async (
	chatId: number,
	content: string
): Promise<{
	userMessage: Message
	assistantMessage: Message | null
}> => {
	try {
		console.log('Request params', {
			content
		})
		const response = await axiosWithAuth.post(`/ai/chat/${chatId}`, {
			content
		})
		return response.data.data
	} catch (error: any) {
		console.error(error)
		throw error
	}
}

export const checkSettingsFilled = async () => {
	try {
		const response = await axiosWithAuth.get(`/user/profile-filled`)
		console.log('response', response)
		return response.data.profileFilled
	} catch (error: any) {
		console.error(
			'Failed to check settings response:',
			error.response?.data || error.message
		)
		throw new Error(
			error.response?.data?.message || 'Failed to check settings response'
		)
	}
}

export const updateSettingsFilled = async (filled: boolean) => {
	try {
		const response = await axiosWithAuth.post(`/user/profile-filled`, {
			profileFilled: filled
		})
		return response.data.data
	} catch (error: any) {
		console.error(
			'Failed to check settings response:',
			error.response?.data || error.message
		)
		throw new Error(
			error.response?.data?.message || 'Failed to check settings response'
		)
	}
}
