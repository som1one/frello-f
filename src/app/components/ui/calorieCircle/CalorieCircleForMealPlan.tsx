import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { FC } from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import styles from './CalorieCircleForMealPlan.module.scss'

interface CalorieCircleProps {
	value: number
	totalCalories: number
	isDarkMode: boolean
}

const CalorieCircleForMealPlan: FC<CalorieCircleProps> = ({
	value,
	totalCalories,
	isDarkMode
}) => {
	const pathname = usePathname()
	const isFavoriteDishesPage = pathname === '/favoriteDishes'

	return (
		<div className={styles.calorieCircle}>
			<h1 className={styles.calorieTitle}>Ккал / порция</h1>
			<div className={styles.progressBarWrapper}>
				<CircularProgressbar
					value={value}
					maxValue={totalCalories}
					className={
						isFavoriteDishesPage
							? styles.progressBar
							: styles.MealPlanProgressBar
					}
					styles={buildStyles({
						pathColor: 'rgba(240, 136, 40, 1)',
						textColor: isDarkMode ? '#FFFFFF' : '#000000',
						trailColor: isDarkMode
							? 'rgba(255, 255, 255, 0.1)'
							: 'rgba(139, 140, 145, 0.13)',
						backgroundColor: 'transparent'
					})}
				/>
				<div className={styles.calorieTextIcon}>
					<Image
						src={
							isDarkMode
								? '/icons/calories/calories.png'
								: '/icons/calories/light-calories.png'
						}
						alt='Calories icon'
						width={24}
						height={24}
						className={styles.calorieIcon}
					/>
					<p className={styles.calorieText}>{totalCalories} ккал</p>
				</div>
			</div>
		</div>
	)
}

export default CalorieCircleForMealPlan
