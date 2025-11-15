// Интерфейс для элемента истории калорий
export interface CaloriesHistoryItem {
	planId: number
	calories: number
	mealIds: number[]
}
