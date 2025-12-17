import clsx from 'clsx'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

import { NutrientBalance } from './NutrientBalance/NutrientBalance'
import styles from './Recipe.module.scss'
import CalorieCircle from '@/app/components/ui/calorieCircle/CalorieCircle'
import { useTheme } from '@/context/ThemeContext'
import { DishIngredients } from '@/entities/dish'
import { DishInstructions } from '@/entities/dish/ui/DishInstructions'
import { IDish } from '@/feature/dishes/model/dishes.types'

interface PropTypes {
	title: string
	currentDish: IDish
	onDelete: (dishId: number) => void
}

export const Recipe = ({ title, currentDish, onDelete }: PropTypes) => {
	const [menuOpen, setMenuOpen] = useState(false)

	const menuRef = useRef<HTMLDivElement | null>(null)

	const { isDarkMode } = useTheme()
	const calories = currentDish ? currentDish.calories : 0
	const maxCalories = 2000 // Standard daily intake reference
	const percentage = (calories / maxCalories) * 100

	const protein = currentDish ? currentDish.proteins : 0
	const fats = currentDish ? currentDish.fats : 0
	const carbs = currentDish ? currentDish.carbs : 0
	const preparationTime = currentDish ? currentDish.cooking_time : 'N/A'

	const toggleMenu = () => setMenuOpen(!menuOpen)

	const deleteFavoriteDish = async (dishId: number) => {
		onDelete(dishId)
		setMenuOpen(false)
	}

	return (
		<div className={styles.recipe}>
			<div className='flex gap-2 items-center'>
				<h2 className={styles.title}>{title}</h2>
				<div
					className={styles.menuIcon}
					onClick={toggleMenu}
				>
					<Image
						src={
							isDarkMode
								? '/icons/menuIcons/properties.png'
								: '/icons/menuIcons/light-properties.png'
						}
						alt='menu'
						width={33}
						height={33}
					/>
				</div>
			</div>
			{menuOpen && (
				<div
					className={styles.menu}
					ref={menuRef}
				>
					<div
						className={styles.menuItem}
						onClick={() => deleteFavoriteDish(currentDish.id)}
					>
						<Image
							src='/icons/forChatLIst/delete.png'
							alt='Удалить'
							width={40}
							height={40}
						/>
						<span>Удалить</span>
					</div>
				</div>
			)}
			<div className={styles.wrapper}>
				<div className={styles.firstBlockWrapper}>
					<div className={styles.firstBlock}>
						{currentDish && currentDish.ingredients.trim() && (
							<DishIngredients ingredients={currentDish.ingredients} />
						)}
						<div className={styles.secondBlockCaloriesAndNutrients}>
							<CalorieCircle
								value={percentage}
								caloriesPer100g={currentDish.calories}
								maxCalories={maxCalories}
								percentage={percentage}
								isDarkMode={isDarkMode}
							/>
							<NutrientBalance
								protein={protein}
								fats={fats}
								carbs={carbs}
							/>
						</div>
					</div>
				</div>

				{currentDish.instruction && (
					<div className={styles.secondBlockWrapper}>
						<div className={styles.secondBlock}>
							<div className={styles.instructions}>
								<h3>Инструкция приготовления</h3>
								<DishInstructions instruction={currentDish?.instruction} />
							</div>

							{preparationTime && (
								<div className={clsx(styles.calorieCircle, styles.timeWrapper)}>
									<h3>Время приготовления</h3>
									<p className={styles.timeText}>{preparationTime} минут</p>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	)
}
