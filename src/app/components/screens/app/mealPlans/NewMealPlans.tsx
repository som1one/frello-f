'use client'

import { useQueryClient } from '@tanstack/react-query'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import toast from 'react-hot-toast'

import styles from './NewMealPlans.module.scss'
import { MealPlansDish } from './components/MealPlansDish/MealPlansDish'
import { MealPlansDishInfo } from './components/MealPlansDishInfo'
import { MealPlansTabs } from './components/MealPlansTabs/MealPlansTabs'
import { getOrGenerateDish } from '@/feature/meal-plans/model/meal-plans.api'
import { Meal, Recipe } from '@/feature/meal-plans/model/types'
import { useMealPlans } from '@/feature/meal-plans/model/useMealPlans'

interface DayData {
	totalCalories: number
	filledHeight: number
	checkboxes: boolean[]
}

const PLANS_COUNT = 14
const DAY_DISH_COUNT = 5

const LOCAL_KEY = 'mealPlanCheckboxesV1'

export const NewMealPlans = () => {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isRightSectionVisible, setIsRightSectionVisible] = useState(false)
	const [activeDay, setActiveDayTab] = useState<number>(0)
	const [dayData, setDayData] = useState<DayData[]>(
		Array(PLANS_COUNT)
			.fill(null)
			.map(() => ({
				totalCalories: 0,
				filledHeight: 0,
				checkboxes: Array(DAY_DISH_COUNT).fill(false)
			}))
	)
	const [activeTab, setActiveTab] = useState<'ingredients' | 'instructions'>(
		'ingredients'
	)
	const [selectedRecipeId, setSelectedRecipeId] = useState<number | null>(null)
	const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)

	const {
		plans,
		isPlansLoading,
		caloriesHistory,
		isCaloriesLoading,
		caloriesError,
		updateCalories,
		isCaloriesUpdating,
		updateCaloriesError,
		removeCalories,
		isCaloriesRemoving,
		removeCaloriesError
	} = useMealPlans()

	const handleCreateMealPlan = () => {
		router.push('/chat?message=план питания на неделю')
	}

	const queryClient = useQueryClient()

	const proteinMealPlan = selectedRecipe?.proteins || 0
	const fatMealPlan = selectedRecipe?.fats || 0
	const carbsMealPlan = selectedRecipe?.carbs || 0

	const proteinPercentageMealPlan = (proteinMealPlan / 100) * 100
	const fatPercentageMealPlan = (fatMealPlan / 100) * 100
	const carbsPercentageMealPlan = (carbsMealPlan / 100) * 100

	const mealPlanTotalCalories = selectedRecipe?.calories || 0
	const maxCalories = 1000
	const percentage = (mealPlanTotalCalories / maxCalories) * 100

	const newDayData = useMemo(() => {
		if (!caloriesHistory || !plans) {
			return Array(7)
				.fill(null)
				.map(() => ({
					totalCalories: 0,
					filledHeight: 0,
					checkboxes: Array(5).fill(false)
				}))
		}

		// Собираем все ID съеденных блюд за все время для чекбоксов
		const allConsumedMealIds = new Set(
			caloriesHistory.flatMap(history => history.mealIds || [])
		)

		return plans.map((plan, index) => {
			// Считаем калории только для отмеченных блюд текущего плана
			const totalCalories = plan.meals.reduce((sum, meal) => {
				if (allConsumedMealIds.has(meal.id)) {
					return sum + (meal.calories || 0)
				}
				return sum
			}, 0)

			const totalCaloriesForDay =
				plan.meals.reduce((sum, meal) => sum + (meal.calories || 0), 0) || 1

			const filledHeight = Math.min(
				(totalCalories / totalCaloriesForDay) * 100,
				100
			)

			const checkboxes = Array(5).fill(false)
			if (plan.meals) {
				plan.meals.forEach((meal, mealIndex) => {
					if (mealIndex < checkboxes.length && allConsumedMealIds.has(meal.id)) {
						checkboxes[mealIndex] = true
					}
				})
			}

			return { totalCalories, filledHeight, checkboxes }
		})
	}, [caloriesHistory, plans, new Date().toDateString()])

	useEffect(() => {
		if (newDayData.length > 0) {
			setDayData(prev => {
				if (JSON.stringify(prev) !== JSON.stringify(newDayData)) {
					return newDayData
				}
				return prev
			})
		}
	}, [newDayData])

	// при маунте смотрим localStorage
	useEffect(() => {
		const saved = localStorage.getItem(LOCAL_KEY)
		if (saved) {
			try {
				const checks: boolean[][] = JSON.parse(saved)
				if (Array.isArray(checks) && checks.length === dayData.length) {
					setDayData(prev => prev.map((v, i) => ({ ...v, checkboxes: checks[i] })))
				}
			} catch (e) { }
		}
		// eslint-disable-next-line
	}, [])
	// при каждом изменении чекбоксов (dayData)
	useEffect(() => {
		const arr = dayData.map(d => d.checkboxes)
		localStorage.setItem(LOCAL_KEY, JSON.stringify(arr))
	}, [dayData])


	const handleBackButtonClick = async (meal?: Meal) => {
		if (!meal) {
			setIsRightSectionVisible(!isRightSectionVisible)
			setSelectedRecipeId(null)
			return
		}

		if (isRightSectionVisible && selectedRecipeId === meal.dishId) {
			setIsRightSectionVisible(false)
			setSelectedRecipeId(null)
			return
		}

		if (!meal.dishId) {
			console.error('Meal ID is missing')
			return
		}

		setIsLoading(true)
		setSelectedRecipeId(meal.dishId)

		try {
			const dishData = await queryClient.fetchQuery({
				queryKey: ['recipe', meal.dishId],
				queryFn: () => getOrGenerateDish(meal.dishId),
				staleTime: 5 * 60 * 1000
			})

			if (dishData?.recipe) {
				setSelectedRecipe(dishData.recipe)
				setIsRightSectionVisible(true)
			} else {
				console.error('Failed to fetch dish: response is null')
			}
		} catch (error) {
			console.error('Failed to fetch recipe:', error)
			toast.error('Ошибка при загрузке рецепта')
		} finally {
			setIsLoading(false)
		}
	}

	const handleTabClick = (tab: 'ingredients' | 'instructions') => {
		setActiveTab(tab)
	}

	const handleCheckboxChange = async (dayIndex: number, mealIndex: number) => {
		if (isCaloriesUpdating || isCaloriesRemoving) return
		const meal = plans[dayIndex].meals[mealIndex]

		// Используем ID плана, к которому принадлежит блюдо
		const planId = plans[dayIndex]?.id

		if (!planId) {
			console.error('No plan found')
			return
		}

		try {
			if (dayData[dayIndex].checkboxes[mealIndex]) {
				removeCalories({ mealId: meal.id, planId })
			} else {
				updateCalories({ mealId: meal.id, planId })
			}
			await queryClient.invalidateQueries({ queryKey: ['calories-history'] })
		} catch (error) {
			console.error('Failed to update consumed meal:', error)
			toast.error('Ошибка при обновлении статуса блюда')
		}
	}

	const containerClass = clsx(
		styles.container,
		isRightSectionVisible && styles.containerHidden,
		isRightSectionVisible || (!isLoading && styles.noRightSection)
	)

	const isCheckboxLoading = isCaloriesUpdating || isCaloriesRemoving

	if (isPlansLoading || isCaloriesLoading) {
		return <div className={styles.center}>Загрузка плана...</div>
	}

	if (!plans || plans.length === 0) {
		return (
			<div className={styles.noMealPlanContainer}>
				<div className={clsx(styles.container, styles.noDishesContainer)}>
					<h1 className={styles.title}>
						У вас еще нет сохраненного плана питания
					</h1>
					<button
						onClick={handleCreateMealPlan}
						className={`${styles.regenerateButton} ${styles.regenerateMealPlanButton}`}
					>
						<Image
							src='/icons/forMealPlans/add.png'
							alt=''
							width={40}
							height={40}
							className={styles.regenerateMealPlanImage}
						/>
						<h1 className={styles.regenerateMealPlanButtonTitle}>
							Создать план питания
						</h1>
					</button>
				</div>
			</div>
		)
	}

	return (
		<div className={containerClass}>
			<div
				className={clsx(
					styles.middleSection,
					isRightSectionVisible && styles.middleSectionHidden,
					isLoading && styles.hidden
				)}
			>
				<div
					className={clsx(
						styles.header,
						isRightSectionVisible && styles.rightSectionHeader
					)}
				>
					<div>
						<h2>План питания</h2>
						<p className={styles.description}>
							Правильное питание — ключ к здоровью и энергии каждый день!
						</p>
					</div>
					<div>
						<button
							onClick={handleCreateMealPlan}
							className={`${styles.regenerateButton} ${styles.regenerateMealPlanButton}`}
						>
							<Image
								src='/icons/forMealPlans/regenerate.png'
								alt=''
								width={30}
								height={30}
								className={styles.regenerateMealPlanImage}
							/>
							<h1 className={styles.regenerateMealPlanButtonTitle}>
								Новый план питания
							</h1>
						</button>
					</div>
				</div>

				<MealPlansTabs
					activeDay={activeDay}
					onDayChange={setActiveDayTab}
					plans={plans}
				/>

				{plans[activeDay]?.meals.map((meal, index) => (
					<MealPlansDish
						key={index}
						activeDay={activeDay}
						meal={meal}
						index={index}
						handleBackButtonClick={handleBackButtonClick}
						checkboxes={dayData[activeDay].checkboxes}
						handleCheckboxChange={handleCheckboxChange}
						isLoading={isCheckboxLoading}
					/>
				))}
				<div className={styles.calorieSquareContainer}>
					<div
						className={styles.calorieSquare}
						style={{ height: `${dayData[activeDay].filledHeight}%` }}
					/>
					<p className={styles.calorieCountText}>
						Количество съеденных килокалорий за день:{' '}
						{dayData[activeDay].totalCalories} ккал
					</p>
				</div>
			</div>

			{isLoading && (
				<div className={`${styles.rightSection} ${styles.center}`}>
					Загрузка...
				</div>
			)}

			{isRightSectionVisible && (
				<MealPlansDishInfo
					activeTab={activeTab}
					isRightSectionVisible={isRightSectionVisible}
					isLoading={isLoading}
					selectedRecipe={selectedRecipe}
					carbsMealPlan={carbsMealPlan}
					fatMealPlan={fatMealPlan}
					proteinMealPlan={proteinMealPlan}
					proteinPercentageMealPlan={proteinPercentageMealPlan}
					fatPercentageMealPlan={fatPercentageMealPlan}
					carbsPercentageMealPlan={carbsPercentageMealPlan}
					percentage={percentage}
					mealPlanTotalCalories={mealPlanTotalCalories}
					handleBackButtonClick={handleBackButtonClick}
					handleTabClick={handleTabClick}
				/>
			)}
		</div>
	)
}
