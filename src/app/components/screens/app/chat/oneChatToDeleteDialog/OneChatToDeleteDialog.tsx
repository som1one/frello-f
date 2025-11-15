import React, { useEffect } from 'react'

import styles from '../confirmationDialog/ConfirmationDialog.module.scss'
import ConfirmationDialogStyles from '../confirmationDialog/ConfirmationDialog.module.scss'
import renameChatModelStyles from '../renameChatModal/RenameChatModal.module.scss'

import { useTheme } from '@/context/ThemeContext'

interface ConfirmationDialogProps {
	isVisible: boolean
	onConfirm: () => void
	onCancel: () => void
}

const OneChatToDeleteDialog: React.FC<ConfirmationDialogProps> = ({
	isVisible,
	onConfirm,
	onCancel
}) => {
	const { isDarkMode } = useTheme()

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
	}, [isVisible, onConfirm])

	if (!isVisible) return null

	return (
		<div className={styles.overlay}>
			<div
				className={`${styles.dialog}  ${!isDarkMode ? ConfirmationDialogStyles.lightDialog : ''}`}
			>
				<h1 className={renameChatModelStyles.title}>
					Вы уверены, что хотите удалить этот чат?
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

export default OneChatToDeleteDialog
