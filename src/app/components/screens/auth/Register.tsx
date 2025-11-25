'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import styles from './Auth.module.scss'
import CirclesStyles from '@/app/(main)/Layout.module.scss'
import { authService } from '@/services/auth.service'
import { Btn } from '@/shared/ui'
import { UILink } from '@/shared/ui/UILink'

interface IAuthForm {
	email: string
	password: string
	repeatPassword: string
	agreeToPolicy: boolean
	agreeToOferta: boolean
	promoCode?: string
}

export function Register() {
	const [showPassword, setShowPassword] = useState(false)
	const [showRepeatPassword, setShowRepeatPassword] = useState(false)
	const [serverError, setServerError] = useState<string | null>(null)
	const [promoValidation, setPromoValidation] = useState<{
		isValidating: boolean
		isValid: boolean | null
	}>({ isValidating: false, isValid: null })
	const { push } = useRouter()

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<IAuthForm>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
			repeatPassword: '',
			agreeToPolicy: false,
			agreeToOferta: false,
			promoCode: ''
		}
	})

	const { mutate, isPending } = useMutation({
		mutationKey: ['auth'],
		mutationFn: (data: IAuthForm) => authService.main('register', data),
		onSuccess() {
			toast.success('Успешно!')
			localStorage.setItem('email', watch('email'))
			push('/register/confirm-email')
		},
		onError(error: AxiosError) {
			let errorMessage = 'Произошла ошибка. Попробуйте снова'
			if (error.response && error.response.data) {
				const data = error.response.data
				if (typeof data === 'string') {
					errorMessage = data
				} else if (typeof data === 'object' && 'message' in data) {
					errorMessage = (data as { message: string }).message
				}
			}
			setServerError(errorMessage)
			toast.error(errorMessage)
		}
	})

	// Debounced promo code validation
	const promoCode = watch('promoCode')
	useEffect(() => {
		if (!promoCode || promoCode.trim() === '') {
			setPromoValidation({ isValidating: false, isValid: null })
			return
		}

		setPromoValidation({ isValidating: true, isValid: null })
		const timer = setTimeout(async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_SERVER_URL}/auth/validate-promo/${promoCode.toUpperCase()}`
				)
				const data = await response.json()
				setPromoValidation({ isValidating: false, isValid: data.valid })
			} catch (error) {
				setPromoValidation({ isValidating: false, isValid: false })
			}
		}, 500) // 500ms debounce

		return () => clearTimeout(timer)
	}, [promoCode])

	const onSubmit = (data: IAuthForm) => {
		if (data.password !== data.repeatPassword) {
			toast.error('Пароли не совпадают')
			return
		}
		mutate(data)
	}

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword)
	}

	const toggleRepeatPasswordVisibility = () => {
		setShowRepeatPassword(!showRepeatPassword)
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
					<h2 className={styles.title}>Регистрация</h2>
					<div className={styles.wrapper}>
						<form
							onSubmit={handleSubmit(onSubmit)}
							className={styles.formContent}
							noValidate
							method='POST'
						>
							<div className='flex flex-col gap-1'>
								<Controller
									control={control}
									name='email'
									rules={{
										required: 'Email обязателен',
										pattern: {
											value:
												/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
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
							</div>

							<div className='flex flex-col gap-1'>
								<Controller
									control={control}
									name='password'
									rules={{
										required: 'Пароль обязателен',
										minLength: {
											value: 6,
											message: 'Пароль должен содержать не менее 6 символов'
										},
										pattern: {
											value: /^[^А-Яа-яЁё]*$/i, // Regex to disallow Cyrillic characters
											message: 'Пароль не должен содержать русские символы'
										},
										validate: {
											noOnlyNumbers: value =>
												/\D/.test(value) ||
												'Пароль не должен содержать только цифры' // Check for non-numeric characters
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
													alt='Toggle password visibility'
													width={24}
													height={24}
													className={styles.eyeIcon}
												/>
											</button>
										</div>
									)}
								/>
								{errors.password && (
									<p className={styles.errorText}>{errors.password.message}</p>
								)}
							</div>

							<div className='flex flex-col gap-1'>
								<Controller
									control={control}
									name='repeatPassword'
									rules={{
										required: 'Повтор пароля обязателен',
										validate: value =>
											value === watch('password') || 'Пароли не совпадают'
									}}
									render={({ field }) => (
										<div className={styles.passwordWrapper}>
											<input
												type={showRepeatPassword ? 'text' : 'password'}
												placeholder='Повторите пароль'
												className={styles.input}
												{...field}
											/>
											<button
												type='button'
												className={styles.eyeButton}
												onClick={toggleRepeatPasswordVisibility}
											>
												<Image
													src={
														showRepeatPassword
															? '/icons/eyes/view.svg'
															: '/icons/eyes/hide.svg'
													}
													alt='Toggle repeat password visibility'
													width={24}
													height={24}
													className={styles.eyeIcon}
												/>
											</button>
										</div>
									)}
								/>
								{errors.repeatPassword && (
									<p className={styles.errorText}>
										{errors.repeatPassword.message}
									</p>
								)}
							</div>

							<div className='flex flex-col gap-1'>
								<Controller
									control={control}
									name='promoCode'
									rules={{
										pattern: {
											value: /^[A-Za-z0-9-_]*$/i,
											message:
												'Промокод может содержать только буквы, цифры, дефис или подчеркивание'
										}
									}}
									render={({ field: { onChange, value, ...rest } }) => (
										<div className={styles.passwordWrapper}>
											<input
												type='text'
												placeholder='Промокод (не обязательно)'
												className={styles.input}
												value={value}
												onChange={(e) => onChange(e.target.value.toUpperCase())}
												style={{ textTransform: 'uppercase' }}
												{...rest}
											/>
											{promoValidation.isValidating && (
												<span className={styles.promoIndicator} style={{ color: '#888' }}>
													⏳
												</span>
											)}
											{!promoValidation.isValidating && promoValidation.isValid === true && (
												<span className={styles.promoIndicator} style={{ color: '#4ade80' }}>
													✓
												</span>
											)}
											{!promoValidation.isValidating && promoValidation.isValid === false && value && (
												<span className={styles.promoIndicator} style={{ color: '#f87171' }}>
													✗
												</span>
											)}
										</div>
									)}
								/>
								{errors.promoCode && (
									<p className={styles.errorText}>{errors.promoCode.message}</p>
								)}
							</div>

							<div className='flex flex-col gap-1'>
								<Controller
									control={control}
									name='agreeToPolicy'
									rules={{
										required:
											'Необходимо согласиться с политикой конфиденциальности'
									}}
									render={({
										field: { value, onChange, onBlur, name, ref }
									}) => (
										<label className={styles.checkboxWrapper}>
											<input
												type='checkbox'
												checked={value}
												onChange={onChange}
												onBlur={onBlur}
												name={name}
												ref={ref}
											/>
											<span>
												Я согласен на обработку персональных данных в
												соответствии с{' '}
												<Link
													href='/policy'
													className={styles.policyLink}
												>
													Политикой конфиденциальности
												</Link>
											</span>
										</label>
									)}
								/>
								{errors.agreeToPolicy && (
									<p className={styles.errorText}>
										{errors.agreeToPolicy.message}
									</p>
								)}
							</div>

							<div className='flex flex-col gap-1'>
								<Controller
									control={control}
									name='agreeToOferta'
									rules={{
										required: 'Необходимо принять условия Публичной оферты'
									}}
									render={({
										field: { value, onChange, onBlur, name, ref }
									}) => (
										<label className={styles.checkboxWrapper}>
											<input
												type='checkbox'
												checked={value}
												onChange={onChange}
												onBlur={onBlur}
												name={name}
												ref={ref}
											/>
											<span>
												Я принимаю условия{' '}
												<Link
													href='/oferta'
													className={styles.policyLink}
												>
													Публичной оферты
												</Link>
											</span>
										</label>
									)}
								/>
								{errors.agreeToOferta && (
									<p className={styles.errorText}>
										{errors.agreeToOferta.message}
									</p>
								)}
							</div>

							{serverError && <p className={styles.errorText}>{serverError}</p>}

							<Btn
								type='submit'
								isLoading={isPending}
							>
								Зарегистрироваться
							</Btn>
						</form>
						<p className={styles.secondText}>
							Уже есть аккаунт? <UILink href='/login'>Войти</UILink>
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
