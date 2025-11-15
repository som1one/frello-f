import Image from 'next/image'
import { RefObject, useState } from 'react'
import { createPortal } from 'react-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

import styles from './ChangePasswordModal.module.scss'
import { changeUserPassword } from '@/entities/user'

interface ChangePasswordModalProps {
	closeModal: () => void
	modalRef: RefObject<HTMLDivElement>
}

interface FormData {
	currentPassword: string
	newPassword: string
	confirmPassword: string
}

export const ChangePasswordModal = ({
	closeModal,
	modalRef
}: ChangePasswordModalProps) => {
	useLockBodyScroll(true)

	const [showCurrentPassword, setShowCurrentPassword] = useState(false)
	const [showNewPassword, setShowNewPassword] = useState(false)
	const [showConfirmPassword, setShowConfirmPassword] = useState(false)

	const {
		register,
		handleSubmit,
		formState: { errors },
		watch,
		reset
	} = useForm<FormData>({
		mode: 'onChange',
		defaultValues: {
			currentPassword: '',
			newPassword: '',
			confirmPassword: ''
		}
	})

	const currentPassword = watch('currentPassword')
	const newPassword = watch('newPassword')

	const onSubmit = async (data: FormData) => {
		try {
			const response = await changeUserPassword({
				currentPassword: data.currentPassword,
				newPassword: data.newPassword
			})
			localStorage.setItem('accessToken', response.accessToken)
			localStorage.setItem('refreshToken', response.refreshToken)
			toast.success(response.message)
			reset()
			closeModal()
		} catch (error: any) {
			toast.error(error.response?.data?.message || 'Ошибка смены пароля')
		}
	}

	const toggleCurrentPasswordVisibility = () => {
		setShowCurrentPassword(!showCurrentPassword)
	}

	const toggleNewPasswordVisibility = () => {
		setShowNewPassword(!showNewPassword)
	}

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword)
	}

	const modalContent = (
		<div
			className={styles.modalBackdrop}
			onClick={closeModal}
			ref={modalRef}
		>
			<div
				className={styles.modalContent}
				onClick={e => e.stopPropagation()}
			>
				<h2 className={styles.changePasswordTitle}>Изменение пароля</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='flex flex-col gap-4'
				>
					<div className={styles.field}>
						<label
							htmlFor='currentPassword'
							className={styles.label}
						>
							Текущий пароль
						</label>
						<div className={styles.passwordWrapper}>
							<input
								type={showCurrentPassword ? 'text' : 'password'}
								id='currentPassword'
								placeholder='Введите текущий пароль'
								autoComplete='new-password'
								spellCheck='false'
								className={styles.input}
								{...register('currentPassword', {
									required: 'Текущий пароль обязателен'
								})}
							/>
							<button
								type='button'
								className={styles.eyeButton}
								onClick={toggleCurrentPasswordVisibility}
							>
								<Image
									src={
										showCurrentPassword
											? '/icons/eyes/view.svg'
											: '/icons/eyes/hide.svg'
									}
									alt='Toggle current password visibility'
									width={24}
									height={24}
									className={styles.eyeIcon}
								/>
							</button>
						</div>
						{errors.currentPassword && (
							<p className={styles.error}>{errors.currentPassword.message}</p>
						)}
					</div>
					<div className={styles.field}>
						<label
							htmlFor='newPassword'
							className={styles.label}
						>
							Новый пароль
						</label>
						<div className={styles.passwordWrapper}>
							<input
								type={showNewPassword ? 'text' : 'password'}
								id='newPassword'
								placeholder='Введите новый пароль'
								className={styles.input}
								{...register('newPassword', {
									required: 'Новый пароль обязателен',
									minLength: {
										value: 6,
										message: 'Новый пароль должен быть минимум 6 символов'
									},
									validate: value =>
										value !== currentPassword ||
										'Новый пароль не может совпадать с текущим'
								})}
							/>
							<button
								type='button'
								className={styles.eyeButton}
								onClick={toggleNewPasswordVisibility}
							>
								<Image
									src={
										showNewPassword
											? '/icons/eyes/view.svg'
											: '/icons/eyes/hide.svg'
									}
									alt='Toggle new password visibility'
									width={24}
									height={24}
									className={styles.eyeIcon}
								/>
							</button>
						</div>
						{errors.newPassword && (
							<p className={styles.error}>{errors.newPassword.message}</p>
						)}
					</div>
					<div className={styles.field}>
						<label
							htmlFor='confirmPassword'
							className={styles.label}
						>
							Подтвердите новый пароль
						</label>
						<div className={styles.passwordWrapper}>
							<input
								type={showConfirmPassword ? 'text' : 'password'}
								id='confirmPassword'
								placeholder='Подтвердите новый пароль'
								className={styles.input}
								{...register('confirmPassword', {
									required: 'Подтверждение пароля обязательно',
									validate: value =>
										value === newPassword || 'Пароли не совпадают'
								})}
							/>
							<button
								type='button'
								className={styles.eyeButton}
								onClick={toggleConfirmPasswordVisibility}
							>
								<Image
									src={
										showConfirmPassword
											? '/icons/eyes/view.svg'
											: '/icons/eyes/hide.svg'
									}
									alt='Toggle confirm password visibility'
									width={24}
									height={24}
									className={styles.eyeIcon}
								/>
							</button>
						</div>
						{errors.confirmPassword && (
							<p className={styles.error}>{errors.confirmPassword.message}</p>
						)}
					</div>
					<div className={styles.modalActions}>
						<button
							className={styles.buttonUnpainted}
							onClick={closeModal}
							type='button'
						>
							Отменить
						</button>
						<button
							type='submit'
							className={styles.buttonShaded}
						>
							Сохранить
						</button>
					</div>
				</form>
			</div>
		</div>
	)
	return createPortal(modalContent, document.body)
}
