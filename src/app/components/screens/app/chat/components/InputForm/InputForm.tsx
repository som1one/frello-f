import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import styles from './InputForm.module.scss'
import { SendMessageFunc } from '@/feature/chat/model/chat.types'

import useIsMobile from '@/hooks/useIsMobile'

interface PropTypes {
	sendMessage: SendMessageFunc
}

const quickQueries = [
	'План питания на неделю',
	'Рецепт',
	'Ужин за 30 мин'
]

export const InputForm = ({ sendMessage }: PropTypes) => {
	const isMobile = useIsMobile(1045)
	const [isExpanded, setIsExpanded] = useState(isMobile)

	useEffect(() => {
		setIsExpanded(isMobile)
	}, [isMobile])
	const [inputValue, setInputValue] = useState('')
	const textareaRef = useRef<HTMLTextAreaElement>(null)

	const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
		if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && inputValue.trim()) {
			e.preventDefault()
			sendMessage(inputValue)
			setInputValue('')
		}
	}

	const handleSendMessage = () => {
		if (inputValue.trim()) {
			sendMessage(inputValue)
			setInputValue('')
		}
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValue(e.target.value)
		if (textareaRef.current) {
			textareaRef.current.style.height = 'auto'
			const newHeight = Math.min(textareaRef.current.scrollHeight, 5 * 20)
			textareaRef.current.style.height = `${newHeight}px`
			textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
		}
	}

	const handleQuickQuery = (query: string) => {
		setInputValue(query)
		textareaRef.current?.focus()
	}

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded)
	}

	return (
		<div className={styles.container}>
			<div
				className={`${styles.quickQueries} ${isExpanded ? styles.expanded : ''}`}
			>
				{quickQueries.map((query, index) => (
					<button
						key={index}
						className={styles.quickQueryButton}
						onClick={() => handleQuickQuery(query)}
					>
						{query}
					</button>
				))}
			</div>

			<button
				className={styles.toggleButton}
				onClick={toggleExpanded}
				aria-label={isExpanded ? "Свернуть подсказки" : "Показать подсказки"}
			>
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					className={isExpanded ? styles.arrowDown : styles.arrowUp}
				>
					<path
						d="M18 15L12 9L6 15"
						stroke="currentColor"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</svg>
			</button>

			<div
				className={styles.inputForm}
				onClick={() => textareaRef.current?.focus()}
			>
				<textarea
					ref={textareaRef}
					placeholder='Введите запрос...'
					className={styles.input}
					value={inputValue}
					onChange={handleInputChange}
					onKeyDown={handleKeyDown}
					rows={1}
				/>
				<button
					className={styles.button}
					onClick={handleSendMessage}
				>
					<Image
						src='/icons/send/send.png'
						width={55}
						height={55}
						alt='Send'
					/>
				</button>
			</div>
			<div className={styles.disclaimer}>
				Создано с помощью ИИ. Может быть неточным.
			</div>
		</div>
	)
}
