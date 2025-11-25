'use client'

import { useState, useEffect } from 'react'

import { axiosClassic } from '@/api/interceptors'

import { Btn, UIField } from '@/shared'

export default function VerifyEmail() {
	const [email, setEmail] = useState('')
	const [code, setCode] = useState('')
	const [loading, setLoading] = useState(false)
	const [message, setMessage] = useState('')
	const [codeSent, setCodeSent] = useState(false)

	// Автоматически получаем email из localStorage при загрузке
	useEffect(() => {
		const savedEmail = localStorage.getItem('email')
		if (savedEmail) {
			setEmail(savedEmail)
		}
	}, [])

	const handleResend = async () => {
		if (!email) return setMessage('Введите email')

		setLoading(true)
		setMessage('')

		try {
			await axiosClassic.post('/auth/resend-verification', { email })
			setMessage('Код отправлен на почту')
			setCodeSent(true)
		} catch (err: any) {
			setMessage(err.response?.data?.message || 'Ошибка')
		} finally {
			setLoading(false)
		}
	}

	const handleVerify = async () => {
		if (!code || code.length !== 6) return setMessage('Введите 6-значный код')

		setLoading(true)
		setMessage('')

		try {
			const res = await axiosClassic.post('/auth/verify-email', { email, code })
			setMessage('Email подтверждён! Перенаправление...')
			// Сохраняем токены (если возвращаются)
			localStorage.setItem('accessToken', res.data.accessToken)
			// Удаляем email из localStorage после успешной верификации
			localStorage.removeItem('email')
			// Редирект через 1.5 сек
			setTimeout(() => {
				window.location.href = '/chat'
			}, 1500)
		} catch (err: any) {
			setMessage(err.response?.data?.message || 'Неверный код')
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className='min-h-screen flex items-center justify-center p-4'>
			<div className='max-w-md w-full rounded-lg shadow-md p-6 space-y-6'>
				<h1 className='text-2xl font-bold text-center'>Подтверждение email</h1>

				{/* Email */}
				<UIField
					type='email'
					value={email}
					onChange={e => setEmail(e.currentTarget.value)}
					placeholder='your@email.com'
					disabled={codeSent}
				/>

				{/* Кнопка отправки кода */}
				{!codeSent && (
					<Btn
						onClick={handleResend}
						disabled={loading || !email}
					>
						{loading ? 'Отправка...' : 'Отправить код'}
					</Btn>
				)}

				{/* Поле для кода (только после отправки) */}
				{codeSent && (
					<>
						<p className='text-sm text-center text-gray-600'>
							Введите 6-значный код из письма
						</p>

						<UIField
							type='text'
							value={code}
							onChange={e =>
								setCode(e.currentTarget.value.replace(/\D/g, '').slice(0, 6))
							}
							placeholder='123456'
							maxLength={6}
						/>

						<div className='flex gap-2'>
							<Btn
								onClick={handleVerify}
								disabled={loading || code.length !== 6}
								className='flex-1'
							>
								{loading ? 'Проверка...' : 'Подтвердить'}
							</Btn>
							<Btn
								onClick={handleResend}
								disabled={loading}
								className='flex-1'
							>
								Повторно
							</Btn>
						</div>
					</>
				)}

				{message && (
					<p
						className={`text-center text-sm ${message.includes('отправлен') || message.includes('подтверждён') ? 'text-green-600' : 'text-red-600'}`}
					>
						{message}
					</p>
				)}
			</div>
		</div>
	)
}
