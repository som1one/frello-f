import cn from 'classnames'
import { useEffect, useRef } from 'react'

import { InputForm } from '../InputForm/InputForm'

import styles from './ChatMessages.module.scss'
import { MessageItem } from './MessageItem/MessageItem'
import {
	Message,
	SendMessageFunc,
	handleRegenerateMessageFunc,
	savePlanOrRecipeFunc,
	toggleFavoriteFunc
} from '@/feature/chat/model/chat.types'

interface PropTypes {
	isDarkMode: boolean
	isCollapsed: boolean
	activeChatId: number | null
	chatMessages: Message[]
	sendMessage: SendMessageFunc
	handleRegenerateMessage: handleRegenerateMessageFunc
	isSendMessageLoading: boolean
	isRegenerating: boolean
	toggleFavorite: toggleFavoriteFunc
	savePlanOrRecipe: savePlanOrRecipeFunc
	error: string | null
	retryLastMessage: () => Promise<void>
}

export const ChatMessages = ({
	isDarkMode,
	isCollapsed,
	activeChatId,
	chatMessages,
	sendMessage,
	handleRegenerateMessage,
	isSendMessageLoading,
	isRegenerating,
	toggleFavorite,
	savePlanOrRecipe,
	error,
	retryLastMessage
}: PropTypes) => {
	const messagesEndRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const scrollToBottom = () => {
			if (messagesEndRef.current) {
				messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
			}
		}
		const raf = requestAnimationFrame(scrollToBottom)
		return () => cancelAnimationFrame(raf)
	}, [chatMessages, activeChatId])

	const lastUserMessageId = chatMessages
		.filter(message => message.isUser)
		.slice(-1)[0]?.id

	return (
		<div className={styles.chatMain}>
			<div
				className={cn(styles.chatMessages, {
					[styles.emptyChat]: activeChatId !== null && chatMessages.length === 0
				})}
			>
				{activeChatId !== null && chatMessages.length === 0 ? (
					<div className={styles.emptyChatMessage}>
						<p>В этом чате нет сообщений, задайте любой вопрос</p>
					</div>
				) : (
					activeChatId !== null &&
					chatMessages.map((message, index) => (
						<MessageItem
							key={message?.id || index}
							activeChatId={activeChatId}
							isCollapsed={isCollapsed}
							isDarkMode={isDarkMode}
							message={message}
							regenerateMessage={handleRegenerateMessage}
							isLast={index === chatMessages.length - 1}
							isSendMessageLoading={isSendMessageLoading}
							isRegenerating={isRegenerating}
							toggleFavorite={toggleFavorite}
							savePlanOrRecipe={savePlanOrRecipe}
							lastUserMessageId={lastUserMessageId}
						/>
					))
				)}
				{error && (
					<div
						className={cn(styles.errorBanner, {
							[styles.darkMode]: isDarkMode
						})}
					>
						<p>{error}</p>
						{error.includes('Попробуйте снова') && (
							<button onClick={retryLastMessage}>Повторить</button>
						)}
					</div>
				)}
				<div className={styles.mobileSpacer} />
				<div ref={messagesEndRef} />
			</div>

			{activeChatId !== null && <InputForm sendMessage={sendMessage} />}
		</div>
	)
}
