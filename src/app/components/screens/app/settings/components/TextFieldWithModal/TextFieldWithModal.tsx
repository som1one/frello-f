import { useState, useRef } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { createPortal } from 'react-dom'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'
import { Label } from '@/shared/ui/Label/Label'
import styles from './TextFieldWithModal.module.scss'

interface TextFieldWithModalProps {
	name: string
	label: string
	placeholder: string
	modalTitle: string
	modalPlaceholder: string
}

export const TextFieldWithModal = ({
	name,
	label,
	placeholder,
	modalTitle,
	modalPlaceholder
}: TextFieldWithModalProps) => {
	const { control } = useFormContext()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)
	
	useLockBodyScroll(isModalOpen)

	return (
		<>
			<Controller
				name={name}
				control={control}
				render={({ field }) => (
					<div className={styles.field}>
						<Label>{label}</Label>
						<button
							type="button"
							className={styles.selectButton}
							onClick={() => setIsModalOpen(true)}
						>
							{field.value && field.value.trim()
								? field.value.length > 50
									? `${field.value.substring(0, 50)}...`
									: field.value
								: placeholder}
						</button>
					</div>
				)}
			/>

			{isModalOpen &&
				createPortal(
					<div
						className={styles.modalBackdrop}
						onClick={() => setIsModalOpen(false)}
						ref={modalRef}
					>
						<div
							className={styles.modalContent}
							onClick={e => e.stopPropagation()}
						>
							<h2 className={styles.modalTitle}>{modalTitle}</h2>
							<Controller
								name={name}
								control={control}
								render={({ field }) => (
									<textarea
										{...field}
										className={styles.textarea}
										placeholder={modalPlaceholder}
										rows={6}
									/>
								)}
							/>
							<div className={styles.modalActions}>
								<button
									type="button"
									className={styles.cancelButton}
									onClick={() => setIsModalOpen(false)}
								>
									Отмена
								</button>
								<button
									type="button"
									className={styles.saveButton}
									onClick={() => setIsModalOpen(false)}
								>
									Сохранить
								</button>
							</div>
						</div>
					</div>,
					document.body
				)}
		</>
	)
}

