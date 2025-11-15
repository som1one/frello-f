import React from 'react'
import styles from './ConfirmationDialog.module.scss'

interface ConfirmationDialogProps {
	isVisible: boolean
	onConfirm: () => void
	onCancel: () => void
}

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
																																 isVisible,
																																 onConfirm,
																																 onCancel,
																															 }) => {
	if (!isVisible) return null

	return (
		<div className={styles.overlay}>
			<div className={styles.dialog}>
				<h2>Вы уверены, что хотите удалить блюдо из избранного?</h2>
				<div className={styles.actions}>
					<button onClick={onConfirm} className={styles.confirmButton}>
						Удалить
					</button>
					<button onClick={onCancel} className={styles.cancelButton}>
						Отмена
					</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmationDialog
