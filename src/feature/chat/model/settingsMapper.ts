// utils/settingsMapper.ts
import {
	AdvancedSettings,
	MultiSelectField,
	SettingsForm
} from '@/app/components/screens/app/settings/model/Settings.interface'
import { UserSettings } from '@/entities/settings'

type MultiSelectFieldKeys = keyof Pick<
	UserSettings,
	| 'favoriteFoods'
	| 'medicalRestrictions'
	| 'cookingPreferences'
	| 'cookingTimeConstraints'
	| 'allergies'
	| 'dietType'
	| 'personalRestrictions'
	| 'mealTimePreferences'
	| 'religiousRestrictions'
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
	'medicalRestrictions',
	'cookingPreferences',
	'allergies',
	'dietType',
	'personalRestrictions',
	'mealTimePreferences',
	'cookingTimeConstraints',
	'religiousRestrictions',
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

const advancedSettingsKeys = [
	'vitaminD3',
	'ferritin',
	'vitaminB12',
	'vitaminC',
	'vitaminA',
	'vitaminE',
	'vitaminK',
	'iron',
	'magnesium',
	'calcium',
	'potassium',
	'sodium',
	'phosphorus',
	'zinc',
	'totalCholesterol',
	'ldlCholesterol',
	'triglycerides',
	'fastingGlucose',
	'hba1c',
	'homaIr',
	'insulin',
	'cortisol',
	'testosterone',
	'estrogen',
	'tsh',
	't3Free',
	't4Free',
	'antiTpo',
	'albumin',
	'totalProtein',
	'creatinine',
	'crp',
	'homocysteine',
	'glutathione',
	'mda',
	'totalAntioxidantStatus'
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

	// Маппинг MultiSelectFields
	multiSelectFields.forEach(field => {
		result[field] = form[field].values
	})

	// Маппинг advancedSettings
	const advancedSettings: Partial<UserSettings['advancedSettings']> = {}
	advancedSettingsKeys.forEach(key => {
		advancedSettings[key] = form.advancedSettings[key] ?? undefined
	})
	if (Object.keys(advancedSettings).length > 0) {
		result.advancedSettings = advancedSettings
	}

	return result
}

export const mapUserSettingsToSettingsForm = (
	settings: UserSettings | null
): SettingsForm => {
	const defaultMultiSelect: MultiSelectField = { values: [], customInputs: {} }
	const defaultAdvancedSettings: AdvancedSettings = {
		vitaminD3: null,
		ferritin: null,
		vitaminB12: null,
		vitaminC: null,
		vitaminA: null,
		vitaminE: null,
		vitaminK: null,
		iron: null,
		magnesium: null,
		calcium: null,
		potassium: null,
		sodium: null,
		phosphorus: null,
		zinc: null,
		totalCholesterol: null,
		ldlCholesterol: null,
		triglycerides: null,
		fastingGlucose: null,
		hba1c: null,
		homaIr: null,
		insulin: null,
		cortisol: null,
		testosterone: null,
		estrogen: null,
		tsh: null,
		t3Free: null,
		t4Free: null,
		antiTpo: null,
		albumin: null,
		totalProtein: null,
		creatinine: null,
		crp: null,
		homocysteine: null,
		glutathione: null,
		mda: null,
		totalAntioxidantStatus: null
	}

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
		medicalRestrictions: defaultMultiSelect,
		cookingPreferences: defaultMultiSelect,
		allergies: defaultMultiSelect,
		cookingTimeConstraints: defaultMultiSelect,
		dietType: defaultMultiSelect,
		personalRestrictions: defaultMultiSelect,
		mealTimePreferences: defaultMultiSelect,
		religiousRestrictions: defaultMultiSelect,
		nutritionPreferences: defaultMultiSelect,
		seasonalPreferences: defaultMultiSelect,
		budgetPreferences: defaultMultiSelect,
		cookingExperience: defaultMultiSelect,
		nutritionGoal: defaultMultiSelect,
		activityLevel: defaultMultiSelect,
		advancedSettings: defaultAdvancedSettings,
		flexibleDayFrequency: defaultMultiSelect,
		flexibleDayType: defaultMultiSelect,
		flexibleDays: defaultMultiSelect
	}

	// Заполнение MultiSelectFields
	multiSelectFields.forEach(field => {
		if (settings?.[field]) {
			result[field] = { values: settings[field]! as string[], customInputs: {} }
		}
	})

	// Заполнение advancedSettings
	if (settings?.advancedSettings) {
		advancedSettingsKeys.forEach(key => {
			result.advancedSettings[key] = settings.advancedSettings?.[key] ?? null
		})
	}

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

	// Проверяем MultiSelectFields
	multiSelectFields.forEach(key => {
		const formValues = formSettings[key] as string[] | undefined
		const originalValues = original[key] || []
		if (JSON.stringify(formValues) !== JSON.stringify(originalValues)) {
			changed[key] = formValues
		}
	})

	// Проверяем advancedSettings
	const advancedChanged: Partial<UserSettings['advancedSettings']> = {}
	advancedSettingsKeys.forEach(key => {
		const formValue = formSettings.advancedSettings?.[key]
		const originalValue = original.advancedSettings?.[key]
		if (formValue !== originalValue) {
			advancedChanged[key] = formValue
		}
	})

	if (Object.keys(advancedChanged).length > 0) {
		changed.advancedSettings = advancedChanged
	}

	return changed
}
