// components/screens/firstScreen/FirstScreen.jsx
'use client'

// Добавляем, если используем клиентские хуки или анимации
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

import styles from './FirstScreen.module.scss'
import buttonsStyles from '@/app/components/ui/buttons/Buttons.module.scss'

// components/screens/firstScreen/FirstScreen.jsx

interface FirstScreenProps {
	firstScreenRef?: React.RefObject<HTMLDivElement>
}

export function FirstScreen({ firstScreenRef }: FirstScreenProps) {
	return (
		<div ref={firstScreenRef} className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<div className={styles.title}>
						<span className={styles.continuation}>
							Получите тело, о котором мечтаете
						</span>
					</div>
					<div className={styles.smallText}>
						<p className={styles.text}>
							Без срывов, без стресса и без отказа от жизни, которую любите.<br />
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

				<div className={styles.womanWrapper}>
					<Image
						src='/images/firstScreenImages/3.png'
						alt='Woman'
						fill
						style={{ objectFit: 'contain', objectPosition: '50% bottom' }}
						priority
					/>
				</div>

				<div className={styles.transformationContainer}>
					<div className={styles.leftSideWrapper}>
						<p className={styles.imageLabel}>Указываете данные о себе</p>
						<div className={styles.leftColumn}>
							<Image
								src='/images/firstScreenImages/sleva.jpg'
								alt='Before'
								fill
								style={{ objectFit: 'cover', objectPosition: 'top' }}
								priority
							/>
						</div>
					</div>

					<div className={styles.arrowWrapper}>
						<Image
							src='/images/firstScreenImages/2.png'
							alt='Arrow'
							width={80}
							height={80}
							className={styles.drawnArrow}
							priority
						/>
					</div>

					<div className={styles.rightSideWrapper}>
						<div className={styles.rightBlock}>
							<p className={styles.imageLabel}>Получаете персональный план питания</p>
							<div className={styles.rightImageTop}>
								<Image
									src='/images/firstScreenImages/sprava.jpg'
									alt='After Top'
									fill
									style={{ objectFit: 'cover' }}
									priority
								/>
							</div>
						</div>
						<div className={styles.rightBlock}>
							<p className={styles.imageLabel}>Достигаете цели</p>
							<div className={styles.rightImageBottom}>
								<Image
									src='/images/firstScreenImages/1.jpg'
									alt='After Bottom'
									fill
									style={{ objectFit: 'cover' }}
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
