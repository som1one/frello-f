import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	addConsumedMeal,
	fetchCaloriesHistory,
	fetchMealPlans,
	removeConsumedMeal
} from './meal-plans.api'
import { MealPlan } from './types'

export const useMealPlans = () => {
	const queryClient = useQueryClient()
	const {
		data: plans = [],
		error: plansError,
		isLoading: isPlansLoading
	} = useQuery<MealPlan[], Error>({
		queryKey: ['plans'],
		queryFn: fetchMealPlans
	})

	const {
		data: caloriesHistory,
		isLoading: isCaloriesLoading,
		error: caloriesError
	} = useQuery({
		queryKey: ['calories-history'],
		queryFn: fetchCaloriesHistory
	})

	const {
		mutate: updateCalories,
		isPending: isCaloriesUpdating,
		error: updateCaloriesError
	} = useMutation({
		mutationKey: ['update-calories-history'],
		mutationFn: ({ mealId, planId }: { mealId: number; planId: number }) =>
			addConsumedMeal({ mealId, planId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['calories-history'] })
		}
	})

	const {
		mutate: removeCalories,
		isPending: isCaloriesRemoving,
		error: removeCaloriesError
	} = useMutation({
		mutationKey: ['remove-calories-history'],
		mutationFn: ({ mealId, planId }: { mealId: number; planId: number }) =>
			removeConsumedMeal({ mealId, planId }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['calories-history'] })
		}
	})

	return {
		plansError,
		plans,
		isPlansLoading,
		caloriesHistory,
		isCaloriesLoading,
		updateCalories,
		isCaloriesUpdating,
		updateCaloriesError,
		removeCalories,
		isCaloriesRemoving,
		removeCaloriesError,
		caloriesError
	}
}
