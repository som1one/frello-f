import { createPortal } from 'react-dom'
import { useEffect } from 'react'

import styles from './FlexibleDaysInfoModal.module.scss'
import { ModalWithTransition } from '@/shared/ui/ModalWithTransition/ModalWithTransition'

interface PropTypes {
	isOpen: boolean
	onClose: () => void
}

export const FlexibleDaysInfoModal = ({ isOpen, onClose }: PropTypes) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose()
			}
		}

		if (isOpen) {
			document.addEventListener('keydown', handleEscape)
		}

		return () => {
			document.removeEventListener('keydown', handleEscape)
		}
	}, [isOpen, onClose])

	const modalContent = (
		<ModalWithTransition
			isOpen={isOpen}
			isNeedWrapper
		>
			<div
				className={styles.modalWrapper}
				onClick={onClose}
			>
				<div
					className={styles.modalContent}
					onClick={(e) => e.stopPropagation()}
				>
					<div className={styles.content}>
						<p className={styles.text}>
							В гибкие дни — никаких ограничений. Ешьте что хотите, когда хотите, сколько хотите.
							Это ваши дни свободы, когда можно расслабиться и насладиться любимыми блюдами без чувства вины.
						</p>
						<button
							className={styles.closeButton}
							onClick={onClose}
						>
							Закрыть
						</button>
					</div>
				</div>
			</div>
		</ModalWithTransition>
	)

	return createPortal(modalContent, document.body)
}
