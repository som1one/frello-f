// utils/settingsMapper.ts
import {
	MultiSelectField,
	SettingsForm
} from '@/app/components/screens/app/settings/model/Settings.interface'
import { UserSettings } from '@/entities/settings'

type MultiSelectFieldKeys = keyof Pick<
	UserSettings,
	| 'favoriteFoods'
	| 'cookingPreferences'
	| 'cookingTimeConstraints'
	| 'allergies'
	| 'dietType'
	| 'personalRestrictions'
	| 'mealTimePreferences'
	| 'nutritionPreferences'
	| 'seasonalPreferences'
	| 'budgetPreferences'
	| 'cookingExperience'
	| 'nutritionGoal'
	| 'activityLevel'
	| 'flexibleDays'
	| 'flexibleDayFrequency'
	| 'flexibleDayType'
>

const multiSelectFields: MultiSelectFieldKeys[] = [
	'favoriteFoods',
	'cookingPreferences',
	'allergies',
	'dietType',
	'personalRestrictions',
	'mealTimePreferences',
	'cookingTimeConstraints',
	'nutritionPreferences',
	'seasonalPreferences',
	'budgetPreferences',
	'cookingExperience',
	'nutritionGoal',
	'activityLevel',
	'flexibleDays',
	'flexibleDayFrequency',
	'flexibleDayType'
] as const



export const mapSettingsFormToUserSettings = (
	form: SettingsForm
): Partial<UserSettings> => {
	const result: Partial<UserSettings> = {
		email: form.email,
		gender: form.gender,
		birthdate: form.birthdate,
		height: form.height ?? undefined,
		weight: form.weight ?? undefined,
		mealFrequency: form.mealFrequency ?? undefined
	}

	// Маппинг MultiSelectFields с customInputs
	multiSelectFields.forEach(field => {
		result[field] = form[field].values
		// Сохраняем customInputs для каждого поля
		if (form[field].customInputs && Object.keys(form[field].customInputs).length > 0) {
			const customInputsKey = `${field}CustomInputs` as keyof UserSettings
			result[customInputsKey] = form[field].customInputs as any
		}
	})

	return result
}

export const mapUserSettingsToSettingsForm = (
	settings: UserSettings | null
): SettingsForm => {
	const defaultMultiSelect: MultiSelectField = { values: [], customInputs: {} }

	const result: SettingsForm = {
		email: settings?.email || '',
		password: '',
		height: settings?.height ?? null,
		weight: settings?.weight ?? null,
		avatar: null,
		gender: settings?.gender || '',
		birthdate: settings?.birthdate || '',
		mealFrequency: settings?.mealFrequency ?? null,
		favoriteFoods: defaultMultiSelect,
		cookingPreferences: defaultMultiSelect,
		allergies: defaultMultiSelect,
		cookingTimeConstraints: defaultMultiSelect,
		dietType: defaultMultiSelect,
		personalRestrictions: defaultMultiSelect,
		mealTimePreferences: defaultMultiSelect,
		nutritionPreferences: defaultMultiSelect,
		seasonalPreferences: defaultMultiSelect,
		budgetPreferences: defaultMultiSelect,
		cookingExperience: defaultMultiSelect,
		nutritionGoal: defaultMultiSelect,
		activityLevel: defaultMultiSelect,
		flexibleDayFrequency: defaultMultiSelect,
		flexibleDayType: defaultMultiSelect,
		flexibleDays: defaultMultiSelect
	}

	// Заполнение MultiSelectFields с customInputs
	multiSelectFields.forEach(field => {
		if (settings?.[field]) {
			const customInputsKey = `${field}CustomInputs` as keyof UserSettings
			const customInputs = (settings[customInputsKey] as Record<string, string> | undefined) || {}
			result[field] = { values: settings[field]! as string[], customInputs }
		}
	})

	return result
}

export const getChangedFields = (
	form: SettingsForm,
	original: UserSettings | null
): Partial<UserSettings> => {
	const changed: Partial<UserSettings> = {}

	if (!original) {
		return mapSettingsFormToUserSettings(form)
	}

	const formSettings = mapSettingsFormToUserSettings(form)

	// Проверяем простые поля
	const stringFields: (keyof Pick<
		UserSettings,
		'email' | 'gender' | 'birthdate'
	>)[] = ['email', 'gender', 'birthdate']

	stringFields.forEach(key => {
		const formValue = formSettings[key] as string | undefined
		const originalValue = original[key] as string | undefined
		if (formValue !== originalValue) {
			changed[key] = formValue
		}
	})

	const numberFields: (keyof Pick<
		UserSettings,
		'height' | 'weight' | 'mealFrequency'
	>)[] = ['height', 'weight', 'mealFrequency']
	numberFields.forEach(key => {
		const formValue = formSettings[key] as number | undefined
		const originalValue = original[key] as number | undefined
		if (formValue !== originalValue) {
			changed[key] = formValue
		}
	})

	// Проверяем MultiSelectFields (values и customInputs)
	multiSelectFields.forEach(key => {
		const formValues = formSettings[key] as string[] | undefined
		const originalValues = original[key] || []
		const valuesChanged = JSON.stringify(formValues) !== JSON.stringify(originalValues)
		
		// Проверяем customInputs
		const customInputsKey = `${key}CustomInputs` as keyof UserSettings
		const formCustomInputs = formSettings[customInputsKey] as Record<string, string> | undefined
		const originalCustomInputs = (original[customInputsKey] as Record<string, string> | undefined) || {}
		const customInputsChanged = JSON.stringify(formCustomInputs) !== JSON.stringify(originalCustomInputs)
		
		if (valuesChanged) {
			changed[key] = formValues
		}
		
		if (customInputsChanged && formCustomInputs) {
			changed[customInputsKey] = formCustomInputs as any
		}
	})

	return changed
}
