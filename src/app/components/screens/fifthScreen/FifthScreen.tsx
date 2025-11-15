import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

import styles from './FifthScreen.module.scss'
import { TitleWithLine } from '@/app/components/TitleWithLine/TitleWithLine'
import { purchaseRequest } from '@/feature/subscriptions/model/subscriptions.service'
import { getAccessToken } from '@/services/auth-token.service'
import { ModalWithTransition } from '@/shared/ui'

export function FifthScreen() {
	const token = getAccessToken()
	const [currentSlide, setCurrentSlide] = useState(0)
	const [selectedPlan, setSelectedPlan] = useState<{
		title: string
		price: number
		titleSlug: string
	} | null>(null)
	const [isModalOpen, setIsModalOpen] = useState(false)
	const router = useRouter()

	// Планы с добавлением старой и новой цены и иконок
	const plans = [
		{
			id: 1,
			title: '1 месяц',
			titleSlug: '1 month',
			oldPrice: 0,
			price: 999,
			icon: '/icons/forFifthScreen/1.svg'
		},
		{
			id: 2,
			title: '6 месяцев',
			titleSlug: '6 month',
			oldPrice: 0,
			price: 3999,
			icon: '/icons/forFifthScreen/3.svg'
		},
		{
			id: 4,
			title: '12 месяцев',
			titleSlug: '12 month',
			oldPrice: 0,
			price: 6999,
			icon: '/icons/forFifthScreen/4.svg'
		}
	]

	const handlePurchase = async (titleSlug: string) => {
		if (!token) {
			await router.push('/login')
			return
		}

		const plan = plans.find(p => p.titleSlug === titleSlug)
		if (plan) {
			setSelectedPlan(plan)
			setIsModalOpen(true)
		}
	}

	const confirmPurchase = async () => {
		if (!selectedPlan) return
		try {
			await purchaseRequest(selectedPlan.titleSlug)
			toast.success('Подписка успешно оформлена!')
			setIsModalOpen(false)
			await router.push('/chat')
		} catch (error: any) {
			console.error('Error purchasing subscription:', error.message)
			toast.error(error.message || 'Ошибка при оформлении подписки')
		}
	}

	const cancelPurchase = () => {
		setIsModalOpen(false)
		setTimeout(() => {
			setSelectedPlan(null)
		}, 300)
	}

	const calculateDiscount = (oldPrice: number, price: number) => {
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
											<p className={styles.oldPrice}>{plan.oldPrice} руб</p>
											<p className={styles.discount}>
												Скидка: {calculateDiscount(plan.oldPrice, plan.price)}%
											</p>
										</div>
										<button
											onClick={() => handlePurchase(plan.titleSlug)}
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
			<ModalWithTransition
				isOpen={isModalOpen}
				className={styles.modalWrapper}
			>
				<div className={styles.modalContent}>
					<h2 className={styles.modalTitle}>Подтверждение покупки</h2>
					{selectedPlan && (
						<div className={styles.modalBody}>
							<p>
								Вы выбрали план: <strong>{selectedPlan.title}</strong>
							</p>
							<p>
								Стоимость: <strong>{selectedPlan.price} руб</strong>
							</p>
							<p>
								Скидка:{' '}
								<strong>
									{calculateDiscount(
										plans.find(p => p.titleSlug === selectedPlan.titleSlug)!
											.oldPrice,
										selectedPlan.price
									)}
									%
								</strong>
							</p>
						</div>
					)}
					<div className={styles.modalActions}>
						<button
							onClick={confirmPurchase}
							className={styles.confirmButton}
						>
							Подтвердить
						</button>
						<button
							onClick={cancelPurchase}
							className={styles.cancelButton}
						>
							Отмена
						</button>
					</div>
				</div>
			</ModalWithTransition>
		</>
	)
}
