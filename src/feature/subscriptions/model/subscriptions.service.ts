import { axiosWithAuth } from '@/api/interceptors'

import { Chat } from '@/feature/chat/model/chat.types'

export const purchaseRequest = async (titleSlug: string): Promise<Chat> => {
	const response = await axiosWithAuth.post('/subscriptions/purchase', {
		titleSlug
	})
	return response.data
}
