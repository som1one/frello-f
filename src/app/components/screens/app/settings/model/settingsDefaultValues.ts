import { SettingsForm } from './Settings.interface'

export const settingsDefaultValues: SettingsForm = {
	email: '',
	password: '',
	height: null,
	weight: null,
	avatar: null,
	gender: 'female',
	birthdate: '',
	mealFrequency: 4,
	favoriteFoods: { values: [], customInputs: {} },
	cookingPreferences: { values: [], customInputs: {} },
	allergies: { values: [], customInputs: {} },
	dietType: { values: [], customInputs: {} },
	personalRestrictions: { values: [], customInputs: {} },
	mealTimePreferences: { values: [], customInputs: {} },
	cookingTimeConstraints: { values: [], customInputs: {} },
	nutritionPreferences: { values: [], customInputs: {} },
	seasonalPreferences: { values: [], customInputs: {} },
	budgetPreferences: { values: [], customInputs: {} },
	cookingExperience: { values: [], customInputs: {} },
	nutritionGoal: { values: [], customInputs: {} },
	flexibleDayFrequency: { values: [], customInputs: {} },
	flexibleDayType: { values: [], customInputs: {} },
	flexibleDays: { values: [], customInputs: {} },
	activityLevel: { values: [], customInputs: {} }
}
