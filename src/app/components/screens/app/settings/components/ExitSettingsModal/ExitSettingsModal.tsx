import { ReactNode } from 'react'

import styles from './ExitSettingsModal.module.scss'
import { createPortal } from 'react-dom'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

interface PropTypes {
	isOpen: boolean
	onClose: () => void
	onSave: () => void
	onDiscard: () => void
	children: ReactNode
}

export const ExitSettingsModal = ({
	isOpen,
	onClose,
	onSave,
	onDiscard,
	children
}: PropTypes) => {
	if (!isOpen) return null
	
	useLockBodyScroll(true)

	const modalContent = (
		<div className={styles.overlay}>
			<div className={styles.modalContent}>
				<div className='mb-6 text-lg font-medium text-center text-gray-900 dark:text-gray-100'>
					{children}
				</div>
				<div className='flex flex-col gap-3'>
					<div className='w-full flex flex-col gap-3'>
						<button
							type='button'
							onClick={onSave}
							className={styles.buttonShaded}
						>
							Сохранить
						</button>
						{/*<button
							type='button'
							onClick={onDiscard}
							className={styles.buttonShaded}
						>
							Отменить изменения
						</button>*/}
					</div>
					<div className='w-full'>
						<button
							type='button'
							onClick={onClose}
							className={styles.buttonShaded}
						>
							Выйти без сохранения
						</button>
					</div>
				</div>
			</div>
		</div>
	)

	return createPortal(modalContent, document.body)
}
