import cn from 'classnames'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import sanitizeHtml from 'sanitize-html'

import { highlightText } from '@/utils/highlight'

import styles from './MessageItem.module.scss'
import {
	AiResponseType,
	Message,
	handleRegenerateMessageFunc,
	savePlanOrRecipeFunc,
	toggleFavoriteFunc
} from '@/feature/chat/model/chat.types'

interface PropTypes {
	message: Message
	isDarkMode: boolean
	isCollapsed: boolean
	activeChatId: number
	isLast: boolean
	regenerateMessage: handleRegenerateMessageFunc
	isSendMessageLoading: boolean
	isRegenerating: boolean
	toggleFavorite: toggleFavoriteFunc
	savePlanOrRecipe: savePlanOrRecipeFunc
	lastUserMessageId: number
}

export const MessageItem = ({
	message,
	isDarkMode,
	isCollapsed,
	activeChatId,
	isLast,
	regenerateMessage,
	isRegenerating,
	isSendMessageLoading,
	toggleFavorite,
	savePlanOrRecipe,
	lastUserMessageId
}: PropTypes) => {
	const [isLiked, setIsLiked] = useState(message.isLiked)

	// Sync local state with message prop
	useEffect(() => {
		setIsLiked(message.isLiked)
	}, [message.isLiked])

	const handleAddToFavorites = async () => {
		try {
			console.log('Save button clicked:', { chatId: activeChatId, messageId: message.id, isLiked })
			
			// Сначала сохраняем план/рецепт в базу данных
			const saveResult = await savePlanOrRecipe(message.id)
			console.log('savePlanOrRecipe result:', saveResult)
			
			if (saveResult.alreadySaved) {
				toast.success('План питания или рецепт уже сохранён', {
					duration: 3000
				})
			} else if (saveResult.success) {
				toast.success('План питания или рецепт успешно сохранён', {
					duration: 3000
				})
			}
			
			// Затем добавляем в избранное (лайк)
			await toggleFavorite({ chatId: activeChatId, messageId: message.id })
			console.log('toggleFavorite completed successfully')
			setIsLiked(true)
		} catch (e) {
			console.error('Error saving:', e)
			toast.error('Произошла ошибка, попробуйте позже', {
				duration: 10000
			})
			setIsLiked(false)
		}
	}

	const handleRegenerateMessage = () => {
		regenerateMessage({
			chatId: activeChatId,
			messageId: lastUserMessageId
		})
	}

	const isFavorable = !message.isUser

	const getMessageClass = (message: Message) => {
		return cn(styles.message, {
			[styles.rightMessage]: message.isUser,
			[styles.leftMessage]: !message.isUser,
			[styles.rightMessageCollapsed]: isCollapsed && message.isUser,
			[styles.leftMessageCollapsed]: isCollapsed && !message.isUser,
			[styles.favorableMessage]: isFavorable,
			[styles.lastAiMessage]: isLast && !message.isUser // Добавляем margin-bottom ТОЛЬКО для последнего сообщения ИИ
		})
	}

	const renderedContent = useMemo(() => {
		const renderMessageContent = (content: string, isUser: boolean) => {
			if (isUser) {
				return sanitizeHtml(content.replace(/\n/g, '<br />'), {
					allowedTags: ['br', 'p']
				})
			}
			const highlighted = highlightText(content).replace(/\n/g, '<br/>')
			return sanitizeHtml(highlighted, {
				allowedTags: ['b', 'i', 'em', 'strong', 'p', 'br', 'span'],
				allowedAttributes: { span: ['style'] }
			})
		}
		return renderMessageContent(message.content, message.isUser)
	}, [message.content, message.isUser])

	if (!message) {
		return null
	}

	return (
		<div className={getMessageClass(message)}>
			<div className={styles.text}>
				<p
					dangerouslySetInnerHTML={{
						__html: renderedContent
					}}
				/>
			</div>

			{
				// Loading dots for the last message
				isLast &&
				!message.isUser &&
				(isSendMessageLoading || isRegenerating) && (
					<div className={styles.loadingDots}>
						<span className={styles.loadingText}>Пожалуйста, подождите</span>
						<span className={styles.dot}>.</span>
						<span className={styles.dot}>.</span>
						<span className={styles.dot}>.</span>
					</div>
				)
			}

			{
				// Left panel buttons - removed isLast condition
				isFavorable && (
					<div
						className={cn(styles.leftMessagePanel, {
							// [styles.hiddenWhileRenaming]: isRenaming,
							[styles.lightLeftMessagePanel]: !isDarkMode
						})}
					>
						<button
							className={cn(
								styles.leftMessagePanelButton,
								styles.firstButton
							)}
							onClick={handleAddToFavorites}
							disabled={isLiked}
						>
							<Image
								src={
									!isDarkMode
										? '/icons/forMealPlans/active-light-like.png'
										: '/icons/forMealPlans/active-like.png'
								}
								alt='Add to favorites'
								width={28}
								height={28}
							/>
							<span className={styles.buttonText}>
								{isLiked ? 'Сохранено' : 'Сохранить'}
							</span>
						</button>
					</div>
				)
			}
		</div>
	)
}