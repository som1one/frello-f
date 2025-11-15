import React, { useEffect } from 'react'

import renameChatModelStyles from '../renameChatModal/RenameChatModal.module.scss'

import styles from './ConfirmationDialog.module.scss'
import { useTheme } from '@/context/ThemeContext'

interface ConfirmationDialogProps {
	isVisible: boolean
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
	isVisible,
	onConfirm,
	onCancel
}) => {
	const { isDarkMode } = useTheme()

	// Add keydown event listeners for "Enter" and "Escape"
	useEffect(() => {
		if (!isVisible) return

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Enter') {
				onConfirm()
			} else if (event.key === 'Escape') {
				onCancel()
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [isVisible, onConfirm, onCancel])

	if (!isVisible) return null

	return (
		<div className={styles.overlay}>
			<div
				className={`${styles.dialog} ${!isDarkMode ? styles.lightDialog : ''}`}
			>
				<h1 className={renameChatModelStyles.title}>
					Вы уверены, что хотите удалить все чаты?
				</h1>
				<div className={styles.buttons}>
					<button
						className={styles.confirmButton}
						onClick={onConfirm}
					>
						Да
					</button>
					<button
						className={`${styles.cancelButton} ${!isDarkMode ? styles.lightCancelButton : ''}`}
						onClick={onCancel}
					>
						Нет
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationDialog
