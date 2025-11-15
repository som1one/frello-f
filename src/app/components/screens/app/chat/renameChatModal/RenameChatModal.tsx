import { FC, useEffect, useState } from 'react'

import ConfirmationDialogStyles from '@/app/components/screens/app/chat/confirmationDialog/ConfirmationDialog.module.scss'

import confirmationDialog from '../confirmationDialog/ConfirmationDialog.module.scss'

import styles from './RenameChatModal.module.scss'
import { useTheme } from '@/context/ThemeContext'

interface RenameChatModalProps {
	isVisible: boolean
	currentChatName: string
	onRename: (newName: string) => void
	onCancel: () => void
}

const RenameChatModal: FC<RenameChatModalProps> = ({
	isVisible,
	currentChatName,
	onRename,
	onCancel
}) => {
	const [newChatName, setNewChatName] = useState<string>('')

	// Set/reset the chat name when the modal is shown or hidden
	useEffect(() => {
		if (isVisible) {
			setNewChatName(currentChatName) // Set the current name when opening the modal
		} else {
			setNewChatName('') // Clear the field when closing the modal
		}
	}, [isVisible, currentChatName])

	// Add keydown event listeners for "Enter" and "Escape"
	useEffect(() => {
		if (!isVisible) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				onRename(newChatName)
			} else if (event.key === 'Escape') {
				onCancel()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isVisible, newChatName, onRename, onCancel])

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		if (value.length <= 40) {
			setNewChatName(value)
		}
	}

	if (!isVisible) return null // Do not render if the modal is not visible
	const { isDarkMode } = useTheme()

	return (
		<div className={confirmationDialog.overlay}>
			<div
				className={`${styles.dialog}  ${!isDarkMode ? ConfirmationDialogStyles.lightDialog : ''}`}
			>
				<h2 className={styles.title}>Переименовать чат</h2>
				<input
					type='text'
					value={newChatName}
					autoFocus
					onChange={handleInputChange}
					className={styles.input}
					maxLength={40}
				/>
				<div className={styles.buttonContainer}>
					<button
						onClick={() => onRename(newChatName)}
						className={styles.renameButton}
					>
						Переименовать
					</button>
					<button
						onClick={onCancel}
						className={styles.cancelButton}
					>
						Отмена
					</button>
				</div>
			</div>
		</div>
	)
}

export default RenameChatModal
