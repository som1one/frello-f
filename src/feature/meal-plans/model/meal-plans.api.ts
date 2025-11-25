import { axiosWithAuth } from '@/api/interceptors'

import { MealPlan, Recipe } from './types'

interface GetDishResponse {
	recipe: Recipe | null
}

interface ConsumedMeal {
	id: number
	userId: string
	mealId: number
	planId: number
	calories: number
	createdAt: string
}

export interface CaloriesHistoryItem {
	planId: number
	calories: number
	mealIds: number[]
	date: string
}

export const fetchMealPlans = async (): Promise<MealPlan[]> => {
	const response = await axiosWithAuth.get('/plan/lastWeek')
	return response.data
}

export const getOrGenerateDish = async (
	dishId: number
): Promise<GetDishResponse> => {
	const response = await axiosWithAuth.get(`/recipe/${dishId}`)
	return response.data
}

export const fetchCaloriesHistory = async () => {
	const response = await axiosWithAuth.get<CaloriesHistoryItem[]>(
		'/consumed-meal/calories-history'
	)
	console.log(response.data, 'response.data')
	return response.data
}

export const addConsumedMeal = async ({
	planId,
	mealId
}: {
	planId: number
	mealId: number
}) => {
	const response = await axiosWithAuth.post<ConsumedMeal>('/consumed-meal', {
		planId: planId,
		mealId: mealId
	})
	console.log('add meal response', response.data)
	return response.data
}

export const removeConsumedMeal = async ({
	planId,
	mealId
}: {
	planId: number
	mealId: number
}) => {
	const response = await axiosWithAuth.delete<ConsumedMeal>('/consumed-meal', {
		data: { planId, mealId }
	})
	console.log(response.data, 'remove meal response.data')
	return response.data
}
