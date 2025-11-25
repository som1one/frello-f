'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import styles from './index.module.scss'
import CirclesLayout from '@/app/(main)/CirclesLayout'
import { authService } from '@/services/auth.service'
import { Btn, UIField, UILink } from '@/shared/ui'

interface IVerifyEmailForm {
	code: string
}

export default function ConfirmEmail() {
	const [serverError, setServerError] = useState<string | null>(null)
	const [isVerified, setIsVerified] = useState(false)
	const { push } = useRouter()

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IVerifyEmailForm>({
		mode: 'onSubmit',
		defaultValues: {
			code: ''
		}
	})

	const email = localStorage.getItem('email')

	const { mutate, isPending } = useMutation({
		mutationKey: ['verify-email'],
		mutationFn: (data: IVerifyEmailForm) =>
			authService.verifyEmail(data.code, email),
		async onSuccess({ message, accessToken }) {
			toast.success('Email успешно подтверждён!')
			localStorage.setItem('accessToken', accessToken)
			setIsVerified(true)
			console.log('message', message)
			
			// Auto-create first chat for new user
			try {
				const response = await fetch('/api/chats/create', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${accessToken}`
					},
					body: JSON.stringify({ title: 'Новый чат' })
				})
				if (response.ok) {
					console.log('First chat created successfully')
				}
			} catch (error) {
				console.error('Failed to create first chat:', error)
			}
			
			push('/chat')
			localStorage.removeItem('email')
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

	const onSubmit = (data: IVerifyEmailForm) => {
		mutate(data)
	}

	if (!email && !isVerified) {
		return (
			<div className={styles.container}>
				<div className={styles.formContainer}>
					<p className='text-sm text-red-500 font-medium'>
						Email не найден. Пожалуйста, начните регистрацию заново.
					</p>
					<Link
						href='/register'
						className='text-orange-600 hover:underline'
					>
						Вернуться к регистрации
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className={styles.container}>
			<CirclesLayout />

			{/* Форма */}
			<div className={styles.formContainer}>
				<h2 className={styles.title}>Подтверждение Email</h2>
				<p className='text-center font-bold'>
					Вам на почту{' '}
					<span className='text-orange-500 font-bold'>{email}</span> пришло
					письмо с кодом подтверждения
				</p>
				<p className='text-center'>Введите этот код в поле ниже</p>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-4 mt-4'
					noValidate
					method='POST'
				>
					<Controller
						control={control}
						name='code'
						rules={{
							required: 'Код обязателен',
							pattern: {
								value: /^\d{6}$/,
								message: 'Код должен состоять из 6 цифр'
							}
						}}
						render={({ field }) => (
							<UIField
								type='text'
								placeholder='Код подтверждения'
								{...field}
							/>
						)}
					/>
					{errors.code && (
						<p className='text-sm text-red-500 font-medium'>
							{errors.code.message}
						</p>
					)}

					{serverError && (
						<p className='text-sm text-red-500 font-medium'>{serverError}</p>
					)}

					<Btn
						type='submit'
						isLoading={isPending}
					>
						Подтвердить
					</Btn>
				</form>
				<p className='mt-4 text-center text-m text-text font-bold'>
					Уже подтвердили? <UILink href='/login'>Войти</UILink>
				</p>
			</div>
		</div>
	)
}
