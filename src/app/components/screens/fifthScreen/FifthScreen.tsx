import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

import styles from './FifthScreen.module.scss'
import { TitleWithLine } from '@/app/components/TitleWithLine/TitleWithLine'
import { createPayment } from '@/feature/payment/model/payment.service'
import { getAccessToken } from '@/services/auth-token.service'

export function FifthScreen() {
	const token = getAccessToken()
	const [currentSlide, setCurrentSlide] = useState(0)
	const router = useRouter()

	// Планы с добавлением старой и новой цены и иконок
	const plans = [
		{
			id: 1,
			title: '1 месяц',
			titleSlug: '1 month',
			oldPrice: 1799,
			price: 999,
			icon: '/icons/forFifthScreen/1.svg'
		},
		{
			id: 2,
			title: '6 месяцев',
			titleSlug: '6 month',
			oldPrice: 5999,
			price: 3999,
			icon: '/icons/forFifthScreen/3.svg'
		},
		{
			id: 4,
			title: '12 месяцев',
			titleSlug: '12 month',
			oldPrice: 11999,
			price: 6999,
			icon: '/icons/forFifthScreen/4.svg'
		}
	]

	const handlePurchase = async (planId: number) => {
		if (!token) {
			await router.push('/login')
			return
		}

		try {
			const { redirectUrl } = await createPayment(planId)
			// Мгновенный редирект на страницу оплаты ЮKassa
			window.location.href = redirectUrl
		} catch (error: any) {
			console.error('Error creating payment:', error.message)
			toast.error(error.message || 'Ошибка при создании платежа')
		}
	}

	const calculateDiscount = (oldPrice: number, price: number) => {
		if (oldPrice === 0 || oldPrice <= price) return 0
		const discount = ((oldPrice - price) / oldPrice) * 100
		return Math.round(discount)
	}

	const handleNext = () => {
		setCurrentSlide(prev => (prev + 1) % plans.length)
	}

	const handlePrev = () => {
		setCurrentSlide(prev => (prev - 1 + plans.length) % plans.length)
	}

	const handleDotClick = (index: number) => {
		setCurrentSlide(index)
	}

	return (
		<>
			<div
				className={styles.container}
				id='pricing'
			>
				<TitleWithLine title='Выберите свой лучший план' />
				<section className={styles.pricingSection}>
					<div className={styles.planContainer}>
						<div className={styles.planCard}>
							<div
								className={styles.planSlider}
								style={{ transform: `translateX(-${currentSlide * 100}%)` }}
							>
								{plans.map((plan, index) => (
									<div
										className={styles.slide}
										key={index}
									>
										<h2 className={styles.planTitle}>{plan.title}</h2>
										<div className={styles.iconContainer}>
											<Image
												src={plan.icon}
												alt={`${plan.title} icon`}
												width={60}
												height={60}
											/>
										</div>
										<div className={styles.priceContainer}>
											<h3 className={styles.price}>{plan.price} руб</h3>
											{plan.oldPrice > 0 && (
												<p className={styles.oldPrice}>{plan.oldPrice} руб</p>
											)}
											{plan.oldPrice > 0 && (
												<p className={styles.discount}>
													Скидка: {calculateDiscount(plan.oldPrice, plan.price)}%
												</p>
											)}
										</div>
										<button
											onClick={() => handlePurchase(plan.id)}
											className={styles.planButton}
										>
											Начать
										</button>
									</div>
								))}
							</div>
							<div
								className={styles.arrowPrev}
								onClick={handlePrev}
							></div>
							<div
								className={styles.arrowNext}
								onClick={handleNext}
							></div>
						</div>
					</div>
					<div className={styles.featuresListContainer}>
						<div className={styles.featuresList}>
							<h1>
								Frello — Получите тело, о котором мечтаете.
							</h1>
							<p>Без срывов, без стресса и без отказа от жизни, которую любите.</p>
							<ul>
								<li>Достижение цели без стресса и срывов</li>
								<li>Экономия времени и усилий каждый день</li>
								<li>
									Персональные планы питания
								</li>
								<li>Наглядные графики прогресса, чтобы видеть результат и динамику</li>
								<li>Персональные советы и рекомендации</li>
							</ul>
						</div>
						<div className={styles.slideIndicator}>
							{plans.map((_, index) => (
								<span
									key={index}
									className={`${styles.dot} ${currentSlide === index ? styles.active : ''}`}
									onClick={() => handleDotClick(index)}
								></span>
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	)
}
