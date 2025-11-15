// components/CalorieCircle.tsx
import Image from 'next/image'
import { FC } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import styles from './CalorieCircle.module.scss'

interface CalorieCircleProps {
	value: number
	caloriesPer100g: number
	percentage: number
	isDarkMode: boolean
	maxCalories: number
}

const CalorieCircle: FC<CalorieCircleProps> = ({
	value,
	caloriesPer100g,
	isDarkMode
}) => {
	return (
		<div className={styles.calorieCircle}>
			<h1 className={styles.calorieTitle}>Ккал / порция</h1>
			<CircularProgressbar
				value={value}
				className={styles.progressBar}
				styles={buildStyles({
					pathColor: 'rgba(240, 136, 40, 1)',
					textColor: 'white',
					trailColor: isDarkMode
						? 'rgba(255, 255, 255, 0.1)'
						: 'rgba(139, 140, 145, 0.13)'
				})}
			/>
			<div className={styles.calorieTextIcon}>
				<Image
					src={
						!isDarkMode
							? `${'/icons/calories/light-calories.png'}`
							: `${'/icons/calories/calories.png'}`
					}
					alt=''
					width={27}
					height={27}
				/>
				<p className={styles.calorieText}>{caloriesPer100g} ккал</p>
			</div>
		</div>
	)
}

export default CalorieCircle
