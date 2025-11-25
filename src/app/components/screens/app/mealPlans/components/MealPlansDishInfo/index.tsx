import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

import { NutrientBalance } from '../../../favoriteDishes/components/Recipe/NutrientBalance/NutrientBalance'

import styles from './index.module.scss'
import CalorieCircleForMealPlan from '@/app/components/ui/calorieCircle/CalorieCircleForMealPlan'
import { useTheme } from '@/context/ThemeContext'
import { DishIngredients } from '@/entities/dish'
import { DishInstructions } from '@/entities/dish/ui/DishInstructions'
import { toggleFavoriteDish } from '@/feature/dishes/model/dishes-api'
import { Recipe } from '@/feature/meal-plans/model/types'
import { Btn } from '@/shared/ui'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

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

	const dishInfoRef = useRef<HTMLDivElement>(null)
	const [mounted, setMounted] = useState(false)

	useLockBodyScroll(isRightSectionVisible && !isLoading)

	useEffect(() => {
		setMounted(true)
	}, [])

	// Sync local favorite state when selectedRecipe changes
	useEffect(() => {
		if (selectedRecipe) {
			setLocalIsFavorite(selectedRecipe.isFavorite || false)
		}
	}, [selectedRecipe?.isFavorite, selectedRecipe?.id])

	if (!isRightSectionVisible || isLoading || !selectedRecipe) {
		return null
	}

	const modalContent = (
		<div className={styles.modalOverlay} onClick={(e) => {
			if (e.target === e.currentTarget) {
				handleBackButtonClick()
			}
		}}>
			<div className={styles.modalContent} ref={dishInfoRef}>
				<button
					className={styles.closeButton}
					onClick={() => handleBackButtonClick()}
					aria-label="Закрыть"
				>
					<span className={styles.closeIcon}>×</span>
				</button>
				<div className={styles.modalBody}>
					<div className={styles.header}>
						<h1 className={styles.title}>{selectedRecipe?.name}</h1>
					</div>
					<div className={styles.contentContainer}>
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
								<div className={styles.instructionsWrapper}>
									<p className={styles.instructionTitle}>Инструкция</p>
									<DishInstructions instruction={selectedRecipe?.instruction} />
								</div>
							)}
						</div>
						{!localIsFavorite && (
							<div className={styles.favoriteButton} onClick={handleFavorite}>
								<Btn>Добавить в избранное</Btn>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	)

	if (!mounted) {
		return null
	}

	return createPortal(modalContent, document.body)
}
