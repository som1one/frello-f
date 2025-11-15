import clsx from 'clsx'
import Image from 'next/image'

import { TitleWithLine } from '../../TitleWithLine/TitleWithLine'

import styles from './SecondScreen.module.scss'

type FeatureCardProps = {
	icon?: string
	title: string
	description: string
	image?: string
}

const FeatureCard = ({ icon, title, description, image }: FeatureCardProps) => {
	return (
		<div
			className={clsx(
				styles.card,
				image === '/icons/forSecondScreen/secondScreenLogo.svg' &&
					styles.specialCard
			)}
		>
			<div className='flex flex-col gap-2'>
				{icon && (
					<div>
						<Image
							src={icon}
							alt={`${title} Icon`}
							width={50}
							height={50}
						/>
					</div>
				)}
				<div className={styles.titleAndDescription}>
					<h3 className={styles.title}>{title}</h3>
					<p className={styles.description}>{description}</p>
				</div>
			</div>

			{image && (
				<div
					className={clsx(
						styles.imageWrapper,
						image === '/icons/forSecondScreen/secondScreenLogo.svg' &&
							styles.imageRight
					)}
				>
					<Image
						src={image}
						alt={title}
						width={300}
						height={200}
					/>
				</div>
			)}
		</div>
	)
}

export const SecondScreen = () => {
	const features = [
		{
	icon: '/icons/forSecondScreen/1.svg',
	title: 'Тело мечты — без лишних запретов и срывов',
	description:
		'Худейте или набирайте мышечную массу, даже если хотите побаловать себя или провести время за семейным ужином'
},
{
	icon: '/icons/forSecondScreen/2.svg',
	title: 'Набор мышечной массы без срывов и чувства вины',
	description:
		'Набор мышечной массы без подсчётов, ошибок в БЖУ и чувства вины. Frello делает питание точным, простым и удобным — чтобы вы чувствовали контроль над своей жизнью'
},
{
	icon: '/icons/forSecondScreen/3.svg',
	title: 'Больше никаких срывов и чувства провала',
	description:
		'Гибкие дни в Frello позволяют есть то, что хочется — и при этом продолжать худеть. Вы больше не бросаете всё после одного "плохого" дня'
},
{
	icon: '/icons/forSecondScreen/4.svg',
	title: 'Не нужно думать, что готовить завтра',
	description:
		'Готовый персональный план на день и неделю — под ваши цели, вкус и бюджет. Больше никаких спонтанных решений, которые заканчиваются срывом',
	image: '/icons/forSecondScreen/secondScreenImage.jpg'
},
{
	icon: '',
	title: 'Результат — без чувства вины',
	description:
		'Графики в Frello показывают прогресс и динамику. Вы видите, что движетесь к цели — даже после сложных дней',
	image: '/icons/forSecondScreen/secondScreenLogo.svg'
},
{
	icon: '/icons/forSecondScreen/5.svg',
	title: 'Еда для всей семьи — без двойной работы',
	description:
		'Скажите Frello, что у вас семья, и сервис учтёт её предпочтения при составлении плана. Ваша порция будет в рамках плана, а остальные едят как обычно — без двойной готовки и стресса'
}

	]

	return (
		<div className={styles.wrapper}>
			<TitleWithLine
				id='features'
				title='Быть собой — и при этом достигать цели'
			/>

			<div className={styles.container}>
				<section className={styles.featuresGrid}>
					<div className={styles.container}>
						{features.map((feature, index) => (
							<FeatureCard
								key={index}
								{...feature}
							/>
						))}
					</div>
				</section>
			</div>
		</div>
	)
}
