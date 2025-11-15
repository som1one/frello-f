// types/chat.types.ts
import { Dispatch, SetStateAction } from 'react'

export interface Chat {
	id: number
	userId: string
	title: string
	createdAt: string
	messages: Message[]
}

export enum AiResponseType {
	TEXT = 'TEXT',
	MEAL_PLAN = 'MEAL_PLAN',
	REGENERATION_TEXT = 'REGENERATION_TEXT',
	REGENERATION_MEAL_PLAN = 'REGENERATION_MEAL_PLAN',
	RECIPE = 'RECIPE'
}

export interface Message {
	id: number
	content: string
	isUser: boolean
	dishId: number | null
	planId: number | null
	aiResponseType: AiResponseType
	chatId?: number
	userId?: string
	createdAt?: string
	isLiked: boolean
}

export interface DishDetails {
	name: string
	proteins: number
	fats: number
	carbs: number
	calories?: number
	ingredients?: string[]
	instructions?: string[]
}

export interface PlanDetails {
	mealFrequency?: number
	meals: Array<{
		dishId: number
		time: string
	}>
}

export interface ChatContextType {
	chats: Chat[]
	activeChatId: number | null
	setActiveChatId: (id: number | null) => void
	messages: Message[]
	addNewChat: () => Promise<void>
	deleteChat: (chatId: number) => Promise<void>
	deleteAllChats: () => Promise<void>
	toggleFavorite: toggleFavoriteFunc
	renameChat: (chatId: number, newChatTitle: string) => void
	isChatListLoading: boolean
	sendMessage: SendMessageFunc
	handleRegenerateMessage: handleRegenerateMessageFunc
	isSendMessageLoading: boolean
	isRegenerating: boolean
	isLimitModalOpen: boolean
	setIsLimitModalOpen: Dispatch<SetStateAction<boolean>>
	isSettingsFilled: boolean
	error: string | null
	retryLastMessage: () => Promise<void>
	limitType?: 'daily' | 'trial'
}

export interface RegenerateMessageArgs {
	chatId: number
	messageId: number
	content: string
}

export interface FetchChatGPTResponse {
	result: string
	dishDetails: DishDetails
	planDetails: PlanDetails[]
}

export type SendMessageFunc = (content: string) => Promise<void>

export type handleRegenerateMessageFunc = ({
	chatId,
	messageId
}: {
	chatId: number
	messageId: number
}) => Promise<void>

export type toggleFavoriteFunc = ({
	chatId,
	messageId
}: {
	chatId: number
	messageId: number
}) => Promise<void>
