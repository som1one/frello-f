'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import styles from './PaymentSuccess.module.scss'

export default function PaymentSuccessPage() {
	const router = useRouter()

	useEffect(() => {
		// Показываем сообщение об успешной оплате
		toast.success('Оплата успешно выполнена! Подписка активирована.')

		// Перенаправляем в чат через 3 секунды
		const timer = setTimeout(() => {
			router.push('/chat')
		}, 3000)

		return () => clearTimeout(timer)
	}, [router])

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<div className={styles.iconContainer}>
					<svg
						width='80'
						height='80'
						viewBox='0 0 24 24'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<circle
							cx='12'
							cy='12'
							r='10'
							stroke='#4caf50'
							strokeWidth='2'
							fill='none'
						/>
						<path
							d='M8 12l2 2 4-4'
							stroke='#4caf50'
							strokeWidth='2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</div>
				<h1 className={styles.title}>Оплата успешно выполнена!</h1>
				<p className={styles.message}>
					Ваша подписка активирована. Вы будете перенаправлены в чат...
				</p>
			</div>
		</div>
	)
}

