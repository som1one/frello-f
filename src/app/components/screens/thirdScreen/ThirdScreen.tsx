import Image from 'next/image'
import React from 'react'

import { StartButton } from '../../ui/buttons/Buttons'

import styles from './ThirdScreen.module.scss'
import { TitleWithLine } from '@/app/components/TitleWithLine/TitleWithLine'

interface IFeature {
	image: string
	alt: string
	title: string
	description: string
	buttonText: string
}

const features: IFeature[] = [
	{
		image: '/images/secondScreenImages/firstphone.jpg',
		alt: '',
		title: 'Всё для результата в одном месте',
		description:
			'Frello автоматически создаёт персональные планы, подбирает меню под ваши цели, формирует списки покупок и отслеживает прогресс на графиках, чтобы вы могли сосредоточиться на жизни — и при этом достигать результат',
		buttonText: 'Начать преобразование'
	},
	{
		image: '/images/secondScreenImages/firstpc.jpg',
		alt: '',
		title: 'Достижение цели без стресса и срывов',
		description:
			'Вы достигаете формы мечты, не отказываясь от того, что любите. Frello позволяет быть собой — и при этом становиться лучше',
		buttonText: 'Начать без стресса'
	},
	{
		image: '/images/secondScreenImages/secondphone.jpg',
		alt: '',
		title: 'Экономите время — не теряете результат',
		description:
			'Frello позволяет экономить время на готовке и планировании, при этом вы получаете вкусное, сбалансированное питание и стабильный прогресс.',
		buttonText: 'Экономить время'
	},
	{
		image: '/images/secondScreenImages/secondpc.jpg',
		alt: '',
		title: 'Поддержка, которая всегда рядом',
		description:
			'Frello поддерживает, когда хочется сорваться, корректирует план и отслеживает прогресс — чтобы вы уверенно шли к цели без давления и жёстких правил',
		buttonText: 'Чувствовать поддержку'
	}
]

export function ThirdScreen() {
	return (
		<div>
			<section
				className={styles.featuresSection}
				id='why-frello'
			>
				<TitleWithLine title='Почему именно Frello?' />
				<div
					className={styles.featuresContainer}
				>
					{features.map((feature, i) => (
						<div
							key={i}
							className={styles.featureCard}
						>
							<div
								className={styles.imageWrapper}
							>
								<Image
									src={feature.image}
									alt={feature.alt}
									width={0}
									height={0}
									sizes="100vw"
									style={{ width: '100%', height: 'auto' }}
								/>
							</div>
							<h3>{feature.title}</h3>
							<p>{feature.description}</p>
							<div className={styles.button}>
								<StartButton text={feature.buttonText} />
							</div>
						</div>
					))}
				</div>
			</section>
		</div>
	)
}
