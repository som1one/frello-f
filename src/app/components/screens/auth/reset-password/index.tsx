'use client'

import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import styles from './index.module.scss'
import CirclesLayout from '@/app/(main)/CirclesLayout'
import { authService } from '@/services/auth.service'
import { Btn, UIField } from '@/shared/ui'

interface IResetForm {
	password: string
	confirmPassword: string
}

export const ResetPassword = () => {
	const [showPassword, setShowPassword] = useState(false)
	const [showConfirm, setShowConfirm] = useState(false)
	const searchParams = useSearchParams()
	const token = searchParams.get('token')
	const { push } = useRouter()

	const {
		control,
		handleSubmit,
		formState: { errors },
		watch
	} = useForm<IResetForm>({ mode: 'onSubmit' })

	const { mutate, isPending } = useMutation({
		mutationKey: ['reset-password-confirm'],
		mutationFn: (data: IResetForm) =>
			authService.confirmResetPassword(token!, data.password),
		onSuccess() {
			toast.success('Пароль успешно изменён')
			push('/login')
		},
		onError(error: AxiosError<{ message: string; statusCode: number }>) {
			const msg = error.response?.data?.message
			const code = error.response?.data?.statusCode
			if (msg === 'Недействительный или истёкший токен' && code === 400) {
				push('/forgot-password')
				toast.error(msg)
			} else {
				toast.error(msg || 'Ошибка')
			}
		}
	})

	const onSubmit = (data: IResetForm) => mutate(data)

	if (typeof window === 'undefined') return null

	if (!token) {
		toast.error('Неверная ссылка')
		push('/login')
		return null
	}

	return (
		<div className={styles.container}>
			<CirclesLayout />

			<div className={styles.formContainer}>
				<div className='space-y-6'>
					<h2 className='text-2xl text-center font-bold'>Новый пароль</h2>

					<form
						onSubmit={handleSubmit(onSubmit)}
						className='space-y-5'
						noValidate
					>
						{/* Новый пароль */}
						<div>
							<Controller
								control={control}
								name='password'
								rules={{
									required: 'Пароль обязателен',
									minLength: { value: 6, message: 'Минимум 6 символов' }
								}}
								render={({ field }) => (
									<div className='relative'>
										<UIField
											type={showPassword ? 'text' : 'password'}
											placeholder='Новый пароль'
											{...field}
											value={field.value ?? ''}
										/>
										<button
											type='button'
											className='absolute right-3 top-1/2 -translate-y-1/2'
											onClick={() => setShowPassword(!showPassword)}
										>
											<Image
												src={
													showPassword
														? '/icons/eyes/view.svg'
														: '/icons/eyes/hide.svg'
												}
												alt=''
												width={20}
												height={20}
											/>
										</button>
									</div>
								)}
							/>
							{errors.password && (
								<p className='mt-1 text-sm text-red-600'>
									{errors.password.message}
								</p>
							)}
						</div>

						{/* Подтверждение пароля */}
						<div>
							<Controller
								control={control}
								name='confirmPassword'
								rules={{
									required: 'Подтвердите пароль',
									validate: value =>
										value === watch('password') || 'Пароли не совпадают'
								}}
								render={({ field }) => (
									<div className='relative'>
										<UIField
											type={showConfirm ? 'text' : 'password'}
											placeholder='Повторите пароль'
											{...field}
											value={field.value ?? ''}
										/>
										<button
											type='button'
											className='absolute right-3 top-1/2 -translate-y-1/2'
											onClick={() => setShowConfirm(!showConfirm)}
										>
											<Image
												src={
													showConfirm
														? '/icons/eyes/view.svg'
														: '/icons/eyes/hide.svg'
												}
												alt=''
												width={20}
												height={20}
											/>
										</button>
									</div>
								)}
							/>
							{errors.confirmPassword && (
								<p className='mt-1 text-sm text-red-600'>
									{errors.confirmPassword.message}
								</p>
							)}
						</div>

						<Btn
							isLoading={isPending}
							type='submit'
							className='w-full'
						>
							Сохранить
						</Btn>
					</form>
				</div>
			</div>
		</div>
	)
}
