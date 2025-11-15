'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

import styles from './index.module.scss'
import CirclesLayout from '@/app/(main)/CirclesLayout'
import { authService } from '@/services/auth.service'
import { Btn, UIField } from '@/shared/ui'
import toast from 'react-hot-toast'

interface IResetForm {
	email: string
}

export default function ForgotPassword() {
	const { push } = useRouter()

	const {
		control,
		handleSubmit,
		formState: { errors }
	} = useForm<IResetForm>({ mode: 'onSubmit' })

	const { mutate, isPending } = useMutation({
		mutationKey: ['reset-password'],
		mutationFn: (data: IResetForm) => authService.resetPassword(data.email),
		onSuccess() {
			toast.success('Ссылка для сброса пароля отправлена на почту')
			push('/login')
		},
		onError(error: any) {
			toast.error(error.response?.data?.message || 'Ошибка')
		}
	})

	const onSubmit = (data: IResetForm) => mutate(data)

	return (
		<div className={styles.container}>
			<CirclesLayout />
			<div className={styles.formContainer}>
				<h2 className='text-2xl font-bold text-center mb-6'>
					Восстановление пароля
				</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className='space-y-5'
					noValidate
				>
					<Controller
						control={control}
						name='email'
						rules={{
							required: 'Email обязателен',
							pattern: { value: /^\S+@\S+$/i, message: 'Некорректный email' }
						}}
						render={({ field }) => (
							<UIField
								type='email'
								placeholder='Ваш email'
								{...field}
							/>
						)}
					/>
					{errors.email && (
						<p className='text-sm text-red-600 -mt-3'>{errors.email.message}</p>
					)}
					<Btn
						isLoading={isPending}
						type='submit'
						className='w-full'
					>
						Отправить ссылку
					</Btn>
				</form>
			</div>
		</div>
	)
}
