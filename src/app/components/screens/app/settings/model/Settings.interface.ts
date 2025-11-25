export interface MultiSelectField {
	values: string[]
	customInputs: Record<string, string>
}

export interface SettingsForm {
	[key: string]:
	| number
	| string
	| MultiSelectField
	| File
	| null
	email: string
	password: string
	height: number | null
	weight: number | null
	avatar: File | null
	gender: string
	birthdate: string
	mealFrequency: number | null
	favoriteFoods: MultiSelectField
	cookingTimeConstraints: MultiSelectField
	cookingPreferences: MultiSelectField
	allergies: MultiSelectField
	dietType: MultiSelectField
	personalRestrictions: MultiSelectField
	mealTimePreferences: MultiSelectField
	nutritionPreferences: MultiSelectField
	seasonalPreferences: MultiSelectField
	budgetPreferences: MultiSelectField
	cookingExperience: MultiSelectField
	nutritionGoal: MultiSelectField
	activityLevel: MultiSelectField
	flexibleDayFrequency: MultiSelectField
	flexibleDayType: MultiSelectField
	flexibleDays: MultiSelectField
}
