'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import styles from './SixthScreen.module.scss'
import { TitleWithLine } from '@/app/components/TitleWithLine/TitleWithLine'

export function SixthScreen() {
	const [activeIndices, setActiveIndices] = useState<number[]>([]) // Массив активных индексов
	const answerRefs = useRef<(HTMLDivElement | null)[]>([]) // Массив ссылок на элементы ответов
	const questions = [
		{
			question: 'Как работает Frello?',
			answer:
				'Frello анализирует ваши вкусы, бюджет и диетические ограничения, чтобы создавать персонализированные планы питания и рецепты. Сервис автоматически подбирает рацион под ваши цели — будь то снижение веса, набор мышечной массы или поддержание здоровья — делая питание простым, удобным и эффективным.'
		},
		{
			question: 'Каких целей можно достичь с помощью Frello?',
			answer:
				'С помощью Frello вы можете достигать разных целей: похудение, набор мышечной массы, улучшение общего здоровья и самочувствия и многое другое. Сервис создаёт персональные планы питания и рекомендации, чтобы вы легко прогрессировали без лишнего стресса.'
		},
		{
			question: 'А если у меня есть аллергии или особая диета?',
			answer:
				'Укажите в настройках ваши ограничения — вегетарианство, веганство, аллергии или непереносимость продуктов. Frello подстроит рацион под ваши потребности.'
		},
		{
			question:
				'Нужны ли мне специальные знания о питании и здоровье для использования Frello?',
			answer:
				'Нет, Frello разработан так, чтобы быть удобным и доступным для каждого. Вам не нужно иметь специальных знаний о питании или здоровье, чтобы использовать наши планы питания и легко достигать своих целей.'
		},
		{
			question: 'Что делать, если мои цели или вкусы меняются?',
			answer:
				'Просто обновите настройки профиля. Frello автоматически адаптирует план и рекомендации под новые цели и предпочтения.'
		},
		{
			question: 'Как Frello помогает избежать срывов и чувства вины?',
			answer:
				'С помощью функции "Гибкие Дни" и персонализированных буферов калорий Frello позволяет есть желаемые продукты без нарушения прогресса, сохраняя мотивацию и комфорт.'
		},
		{
			question: 'Можно ли есть любимые блюда и при этом достигать цели?',
			answer:
				'Да! Frello учитывает ваши предпочтения и интегрирует любимые блюда в план питания, чтобы вы наслаждались едой и при этом достигали цели.'
		}
	]

	const toggleAnswer = (index: number) => {
		if (activeIndices.includes(index)) {
			setActiveIndices(activeIndices.filter(i => i !== index)) // Убираем индекс, если он уже активен
		} else {
			setActiveIndices([...activeIndices, index]) // Добавляем индекс, если он еще не активен
		}
	}

	const getHeight = (index: number) => {
		const ref = answerRefs.current[index]
		return ref ? ref.scrollHeight : 0 // Получаем высоту содержимого блока
	}

	return (
		<div
			className={styles.container}
			id={'FAQ'}
		>
			<TitleWithLine title='Часто задаваемые вопросы'/>
			<div className={styles.faqList}>
				{questions.map((item, index) => (
					<div
						key={index}
						className={styles.faqItem}
					>
						<div
							className={styles.question}
							onClick={() => toggleAnswer(index)}
						>
							<span className='text-white'>{item.question}</span>
							<Image
								src='/icons/arrows/whitedown.png'
								alt='arrow'
								width={24}
								height={24}
								className={`${styles.arrow} ${activeIndices.includes(index) ? styles.rotate : ''}`}
							/>
						</div>
						<div
							className={`${styles.answer} ${activeIndices.includes(index) ? styles.open : ''}`}
							ref={(el: HTMLDivElement | null) => {
								answerRefs.current[index] = el
							}}
							style={{
								height: activeIndices.includes(index)
									? getHeight(index) + 'px'
									: '0px', // Устанавливаем высоту динамически
								transition: 'height 0.5s ease' // Плавная анимация
							}}
						>
							<p>{item.answer}</p>
						</div>
						{/* Рендер линии только если не последний элемент */}
						{index !== questions.length - 1 && (
							<div className={styles.line}></div>
						)}
					</div>
				))}
			</div>
		</div>
	)
}
