import Image from 'next/image'
import { useRef, useState } from 'react'

import styles from './InputForm.module.scss'
import { SendMessageFunc } from '@/feature/chat/model/chat.types'

interface PropTypes {
	sendMessage: SendMessageFunc
}

const quickQueries = [
	'План питания на неделю',
	'Как приготовить ',
	'Ужин за 30 мин'
]

export const InputForm = ({ sendMessage }: PropTypes) => {
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

	return (
		<div>
			<div className={styles.quickQueries}>
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
