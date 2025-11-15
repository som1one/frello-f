import cn from 'classnames'
import { RefObject } from 'react'
import { createPortal } from 'react-dom'
import { useFormContext } from 'react-hook-form'

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

import styles from './ChangeNameModal.module.scss'

interface ChangeNameModalProps {
	closeModal: () => void
	isNameModalClosing: boolean
	modalRef: RefObject<HTMLDivElement>
}

export const ChangeNameModal = ({
	closeModal,
	isNameModalClosing,
	modalRef
}: ChangeNameModalProps) => {
	const { register } = useFormContext()

	useLockBodyScroll(!isNameModalClosing)

	const modalContent = (
		<div
			ref={modalRef}
			className={styles.modalBackdrop}
			onClick={closeModal}
		>
			<div
				className={cn(
					styles.modalContent,
					isNameModalClosing && styles.closing
				)}
				onClick={e => e.stopPropagation()}
			>
				<h2 className={styles.changePasswordTitle}>Изменение имени</h2>
				<div className={styles.field}>
					<label
						htmlFor='newName'
						className={styles.label}
					>
						Введите новое имя
					</label>
					<input
						type='text'
						id='newName'
						{...register('name')}
						placeholder='Введите новое имя'
						className={styles.input}
					/>
					{/* {errors.name?.message && (
						<span className={styles.errorMessage}>
							{errors.name.message as string}
						</span>
					)} */}
				</div>
				<div className={styles.modalActions}>
					<button
						type='button'
						className={styles.buttonUnpainted}
						onClick={closeModal}
					>
						Отменить
					</button>
					<button
						type='button'
						className={styles.buttonShaded}
						// onClick={handleSaveName}
					>
						Сохранить
					</button>
				</div>
			</div>
		</div>
	)
	return createPortal(modalContent, document.body)
}
