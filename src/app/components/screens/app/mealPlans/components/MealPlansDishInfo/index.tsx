import { useMutation, useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'
import { useState } from 'react'

import { NutrientBalance } from '../../../favoriteDishes/components/Recipe/NutrientBalance/NutrientBalance'

import styles from './index.module.scss'
import CalorieCircleForMealPlan from '@/app/components/ui/calorieCircle/CalorieCircleForMealPlan'
import { useTheme } from '@/context/ThemeContext'
import { DishIngredients } from '@/entities/dish'
import { DishInstructions } from '@/entities/dish/ui/DishInstructions'
import { toggleFavoriteDish } from '@/feature/dishes/model/dishes-api'
import { Recipe } from '@/feature/meal-plans/model/types'
import { Btn } from '@/shared/ui'

interface PropTypes {
	isRightSectionVisible: boolean
	isLoading: boolean
	handleBackButtonClick: () => void
	handleTabClick: (tab: 'ingredients' | 'instructions') => void
	activeTab: 'ingredients' | 'instructions'
	selectedRecipe: Recipe | null
	proteinMealPlan: number
	fatMealPlan: number
	carbsMealPlan: number
	proteinPercentageMealPlan: number
	fatPercentageMealPlan: number
	carbsPercentageMealPlan: number
	percentage: number
	mealPlanTotalCalories: number
}

export const MealPlansDishInfo = ({
	handleBackButtonClick,
	handleTabClick,
	activeTab,
	isRightSectionVisible,
	isLoading,
	selectedRecipe,
	carbsMealPlan,
	fatMealPlan,
	proteinMealPlan,
	proteinPercentageMealPlan,
	fatPercentageMealPlan,
	carbsPercentageMealPlan,
	percentage,
	mealPlanTotalCalories
}: PropTypes) => {
	const queryClient = useQueryClient()
	const { isDarkMode } = useTheme()
	const [localIsFavorite, setLocalIsFavorite] = useState(
		selectedRecipe?.isFavorite || false
	)

	const toggleFavoriteMutation = useMutation({
		mutationFn: toggleFavoriteDish,
		onError: (error: Error) => {
			console.error('Failed to toggle favorite:', error.message)
		},
		onSuccess: () => {
			setLocalIsFavorite(prev => !prev)
			queryClient.invalidateQueries({ queryKey: ['dishes'] })
			queryClient.invalidateQueries({
				queryKey: ['recipe', selectedRecipe?.id]
			})
			queryClient.invalidateQueries({ queryKey: ['plans'] })
		}
	})

	const handleFavorite = async () => {
		if (selectedRecipe?.id) {
			await toggleFavoriteMutation.mutateAsync(selectedRecipe.id)
		}
	}

	return (
		<div
			className={`${styles.rightSection} ${!isRightSectionVisible ? styles.hidden : ''}  ${isLoading ? styles.hidden : ''}`}
		>
			<div className={styles.calendar}>
				<div className={styles.daySelected}>
					<button
						className={styles.backButton}
						onClick={() => handleBackButtonClick()}
					>
						<Image
							src={
								!isDarkMode
									? `${'/icons/arrows/t-left.png'} `
									: `${'/icons/arrows/t.png'} `
							}
							alt=''
							width={40}
							height={40}
							className={styles.leftIcon}
						/>
					</button>
					<h1 className={styles.daySelectedTitle}>{selectedRecipe?.name}</h1>
				</div>
				<div className={styles.rightSectionContainer}>
					<div className={styles.statisticsSection}>
						<NutrientBalance
							carbs={carbsMealPlan}
							fats={fatMealPlan}
							protein={proteinMealPlan}
						/>
					</div>
					<div className={styles.timeAndCaloriesContainer}>
						<div className={styles.timeWrapper}>
							<h1 className={styles.timeTitle}>Время приготовления</h1>
							<h1 className={styles.timeText}>
								{selectedRecipe?.cooking_time} минут
							</h1>
						</div>
						<CalorieCircleForMealPlan
							value={percentage}
							totalCalories={mealPlanTotalCalories}
							isDarkMode={isDarkMode}
						/>
					</div>

					<div className={styles.ingredientsAndInstructionsTabContainer}>
						<button
							className={`${styles.tabButton} ${activeTab === 'ingredients' ? styles.active : ''}`}
							onClick={() => handleTabClick('ingredients')}
						>
							Ингредиенты
						</button>
						<button
							className={`${styles.tabButton} ${activeTab === 'instructions' ? styles.active : ''}`}
							onClick={() => handleTabClick('instructions')}
						>
							Инструкция
						</button>
						<div
							className={styles.slider}
							style={{ left: activeTab === 'ingredients' ? '0' : '50%' }}
						/>
					</div>

					<div className={styles.content}>
						{activeTab === 'ingredients' ? (
							<DishIngredients ingredients={selectedRecipe?.ingredients} />
						) : (
							<div>
								<h3>Инструкция:</h3>
								<DishInstructions instruction={selectedRecipe?.instruction} />
							</div>
						)}
					</div>
					{!localIsFavorite && (
						<Btn onClick={handleFavorite}>Добавить в избранное</Btn>
					)}
				</div>
			</div>
		</div>
	)
}
