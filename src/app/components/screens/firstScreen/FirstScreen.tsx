// components/screens/firstScreen/FirstScreen.jsx
'use client'

// Добавляем, если используем клиентские хуки или анимации
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import styles from './FirstScreen.module.scss'
import buttonsStyles from '@/app/components/ui/buttons/Buttons.module.scss'

// components/screens/firstScreen/FirstScreen.jsx

export function FirstScreen() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.imageWrapper}>
					<Image
						src='/images/firstScreenImages/firstScreenImage.svg'
						alt='Frello Hero Image'
						fill
						style={{ objectFit: 'contain', objectPosition: 'center bottom' }}
						priority // Загружаем сразу, так как это главная страница
					/>
				</div>
				<div className={styles.content}>
					<div className={styles.title}>
						<span className={styles.continuation}>
							Получите тело, о котором мечтаете
						</span>
					</div>
					<div className={styles.smallText}>
						<p className={styles.text}>
							Без срывов, без стресса и без отказа от жизни, которую любите.<br/>
							Достигайте формы мечты, продолжая жить своей жизнью — чувствуя себя легче, сильнее и увереннее каждый день.

						</p>
					</div>
					<div className={styles.button}>
						<Link href='/chat'>
							<button
								className={clsx(
									buttonsStyles.buttonShaded,
									styles.customButton
								)}
							>
								Попробовать бесплатно
								<Image
									className={styles.arrow}
									src='/icons/arrows/tryArrow.png'
									alt='Arrow'
									width={63}
									height={17}
								/>
							</button>
						</Link>
					</div>
				</div>
			</div>
		</div>
	)
}
