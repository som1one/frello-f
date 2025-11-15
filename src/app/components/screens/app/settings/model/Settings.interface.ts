export interface MultiSelectField {
	values: string[]
	customInputs: Record<string, string>
}

export interface SettingsForm {
	[key: string]:
		| number
		| string
		| MultiSelectField
		| AdvancedSettings
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
	medicalRestrictions: MultiSelectField
	cookingTimeConstraints: MultiSelectField
	cookingPreferences: MultiSelectField
	allergies: MultiSelectField
	dietType: MultiSelectField
	personalRestrictions: MultiSelectField
	mealTimePreferences: MultiSelectField
	religiousRestrictions: MultiSelectField
	nutritionPreferences: MultiSelectField
	seasonalPreferences: MultiSelectField
	budgetPreferences: MultiSelectField
	cookingExperience: MultiSelectField
	nutritionGoal: MultiSelectField
	activityLevel: MultiSelectField
	advancedSettings: AdvancedSettings
	flexibleDayFrequency: MultiSelectField
  flexibleDayType: MultiSelectField
  flexibleDays: MultiSelectField
}

export interface AdvancedSettings {
	vitaminD3: number | null
	ferritin: number | null
	vitaminB12: number | null
	vitaminC: number | null
	vitaminA: number | null
	vitaminE: number | null
	vitaminK: number | null
	iron: number | null
	magnesium: number | null
	calcium: number | null
	potassium: number | null
	sodium: number | null
	phosphorus: number | null
	zinc: number | null
	totalCholesterol: number | null
	ldlCholesterol: number | null
	triglycerides: number | null
	fastingGlucose: number | null
	hba1c: number | null
	homaIr: number | null
	insulin: number | null
	cortisol: number | null
	testosterone: number | null
	estrogen: number | null
	tsh: number | null
	t3Free: number | null
	t4Free: number | null
	antiTpo: number | null
	albumin: number | null
	totalProtein: number | null
	creatinine: number | null
	crp: number | null
	homocysteine: number | null
	glutathione: number | null
	mda: number | null
	totalAntioxidantStatus: number | null
}
