'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import styles from './Auth.module.scss'
import CirclesStyles from '@/app/(main)/Layout.module.scss'
import { authService } from '@/services/auth.service'
import { Btn, UILink } from '@/shared/ui'

interface IAuthForm {
	email: string
	password: string
}

export function Login() {
	const [showPassword, setShowPassword] = useState(false)
	const [serverError, setServerError] = useState<string | null>(null)
	const { push } = useRouter()

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IAuthForm>({
		mode: 'onSubmit'
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main('login', data),
		onSuccess(response) {
			const { user } = response.data;

			localStorage.setItem('email', user.email);

			if (!user.isActivated) {
				toast.info('Подтвердите email');
				push('/verify-email');
				return;
			}

			toast.success('Успешно!');
			push('/chat');
		},
		onError(error: AxiosError<{ message: string }>) {
			console.error('Ошибка запроса:', error.response)
			const errorMessage = error.response?.data?.message || 'Произошла ошибка'

			if (errorMessage.includes('Email не подтверждён') || errorMessage.includes('не подтвержден')) {
				toast.info('Пожалуйста, подтвердите ваш email')
				push('/register/confirm-email')
				return
			}

			setServerError(errorMessage)
		}
	})


	const onSubmit = (data: IAuthForm) => {
		// Сохраняем email в localStorage перед отправкой
		localStorage.setItem('email', data.email)
		mutate(data)
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	return (
		<div className={styles.container}>
			<div>
				<div className={`${CirclesStyles.circle2} ${styles.circle}`} />
				<div className={`${CirclesStyles.circle2} ${styles.circle2}`} />
			</div>
			<div
				className={`${styles.formWrapper} ${Object.keys(errors).length > 0 ? styles.hasErrors : ''}`}
			>
				<div className={styles.form}>
					<div className={styles.wrapper}>
						<h2 className={styles.title}>Вход</h2>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={styles.formContent}
							noValidate
						>
							<Controller
								control={control}
								name='email'
								rules={{
									required: 'Email обязателен',
									pattern: {
										value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
										message:
											'Пожалуйста, укажите корректный адрес электронной почты'
									}
								}}
								render={({ field }) => (
									<input
										type='email'
										placeholder='Электронная почта'
										className={styles.input}
										{...field}
									/>
								)}
							/>
							{errors.email && (
								<p className={styles.errorText}>{errors.email.message}</p>
							)}

							<Controller
								control={control}
								name='password'
								rules={{
									required: 'Пароль обязателен',
									minLength: {
										value: 6,
										message: 'Пароль должен содержать не менее 6 символов'
									}
								}}
								render={({ field }) => (
									<div className={styles.passwordWrapper}>
										<input
											type={showPassword ? 'text' : 'password'}
											placeholder='Пароль'
											className={styles.input}
											{...field}
										/>
										<button
											type='button'
											className={styles.eyeButton}
											onClick={togglePasswordVisibility}
										>
											<Image
												src={
													showPassword
														? '/icons/eyes/view.svg'
														: '/icons/eyes/hide.svg'
												}
												alt=''
												className={styles.eyeIcon}
												width={24}
												height={24}
											/>
										</button>
									</div>
								)}
							/>
							{errors.password && (
								<p className={styles.errorText}>{errors.password.message}</p>
							)}
							{serverError && <p className={styles.errorText}>{serverError}</p>}
							<Btn
								isLoading={isPending}
								type='submit'
							>
								Войти
							</Btn>
						</form>
						<p className={styles.secondText}>
							Еще нет аккаунта?{' '}
							<UILink href='/register'>Зарегистрироваться</UILink>
						</p>
						<UILink
							className='font-bold mt-4'
							href='/forgot-password'
						>
							Забыли пароль?
						</UILink>
					</div>
				</div>
			</div>
		</div>
	)
}
