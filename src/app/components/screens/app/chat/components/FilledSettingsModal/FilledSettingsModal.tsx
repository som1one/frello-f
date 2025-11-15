import cn from 'classnames'
import Link from 'next/link'
import { createPortal } from 'react-dom'

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

import styles from './FilledSettingsModal.module.scss'

interface FilledSettingsModalProps {
	closeModal: () => void
	isNameModalClosing: boolean
}

export const FilledSettingsModal = ({
	closeModal,
	isNameModalClosing,
}: FilledSettingsModalProps) => {
	useLockBodyScroll(!isNameModalClosing)

	const modalContent = (
		<div
			className={styles.modalBackdrop}
			onClick={closeModal}
		>
			<div
				className={cn(
					styles.modalContent,
					!isNameModalClosing && styles.closing
				)}
				onClick={e => e.stopPropagation()}
			>
				<h2 className={styles.changePasswordTitle}>
					Заполните информацию о себе
				</h2>
				<div className='text-center flex flex-col gap-2 font-medium'>
					<p>
						Заполните информацию о себе в настройках, чтобы получать персонализированные ответы и открыть все возможности сервиса
					</p>
				</div>
				<div className={styles.modalActions}>
					<Link href='/settings'>
						<button
							type='button'
							className={styles.buttonShaded}
						>
							В настройки
						</button>
					</Link>
				</div>
			</div>
		</div>
	)
	return createPortal(modalContent, document.body)
}
