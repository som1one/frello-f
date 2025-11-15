import { useEffect, useState } from 'react'

import styles from './MealPlansDish.module.scss'
import { Meal } from '@/feature/meal-plans/model/types'

interface PropTypes {
	meal: Meal
	index: number
	activeDay: number
	handleBackButtonClick: (meal?: Meal) => void
	checkboxes: boolean[]
	handleCheckboxChange: (dayIndex: number, mealIndex: number) => void
	isLoading: boolean
}

export const MealPlansDish = ({
	meal,
	index,
	activeDay,
	handleBackButtonClick,
	checkboxes,
	handleCheckboxChange,
	isLoading
}: PropTypes) => {
	const [isShowLoader, setIsShowLoader] = useState(false)

	useEffect(() => {
		if (isLoading) {
			const timer = setTimeout(() => setIsShowLoader(true), 300)
			return () => clearTimeout(timer)
		} else {
			setIsShowLoader(false)
		}
	}, [isLoading])

	return (
		<div className={styles.mealCard}>
			<div className={styles.details}>
				<div className={styles.mealNumberCircle}>{index + 1}</div>

				<div>
					<button onClick={() => handleBackButtonClick(meal)}>
						<p className={styles.mealName}>{meal.recipeName}</p>
					</button>
				</div>

				<div className={styles.checkboxContainer}>
					<input
						type='checkbox'
						className={styles.checkbox}
						id={`mealCheckbox-${activeDay}-${index}`}
						checked={checkboxes[index]}
						onChange={() => handleCheckboxChange(activeDay, index)}
						disabled={isShowLoader}
					/>
					<label
						htmlFor={`mealCheckbox-${activeDay}-${index}`}
						className={isShowLoader ? styles.loadingLabel : ''}
					>
						{isShowLoader && <span className={styles.loader}></span>}
					</label>
				</div>
			</div>
		</div>
	)
}
