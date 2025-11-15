// @/types/plan.types.ts
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack'

export interface Meal {
	id: number
	type: MealType
	recipeName: string
	calories: number
	dishId: number
}

export interface MealPlan {
	id: number
	date: string
	visible?: boolean
	meals: Meal[]
}

export interface Recipe {
	id: number
	createdAt: string
	updatedAt: string
	isFavorite: boolean
	name: string
	ingredients: string
	instruction: string
	proteins: number
	fats: number
	carbs: number
	cooking_time: number
	calories: number
	userId: string
}
