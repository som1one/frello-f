import { advancedFieldsConfig } from './advancedFieldsConfig'
import {
	activityLevelOptions,
	allergiesOptions,
	budgetPreferencesOptions,
	cookingOptions,
	cookingPreferencesOptions,
	cookingTimeConstraintsOptions,
	dietTypeOptions,
	favoriteFoodsOptions,
	flexibleDayFrequencyOptions,
	flexibleDayTypeOptions,
	flexibleDaysOptions,
	mealTimePreferencesOptions,
	medicalRestrictionsOptions,
	nutritionGoalOptions,
	nutritionPreferencesOptions,
	personalRestrictionsOptions,
	religiousRestrictionsOptions,
	seasonalPreferencesOptions
} from './options'
import { Option } from '@/app/components/ui/MultiSelectDropdown/MultiSelectDropdown'

export interface FieldConfig {
	name: string
	label: string
	placeholder?: string
	type: 'number' | 'multiSelect' | 'string' | 'avatar' | 'singleSelect'
	options?: Option[]
	unit?: string
	tab?: string
	max?: number
}

export interface TabConfig {
	name: string
	fields: FieldConfig[]
}

export const formFieldsConfig: (FieldConfig | TabConfig)[] = [
	{
		name: 'avatar',
		label: 'Аватар',
		type: 'avatar'
	},
	{
		name: 'email',
		label: 'Электронная почта',
		placeholder: 'Введите электронную почту',
		type: 'string'
	},
	{
		name: 'password',
		label: 'Пароль',
		placeholder: 'Введите пароль',
		type: 'string'
	},
	{
		name: 'height',
		label: 'Рост',
		placeholder: 'Введите рост (см)',
		type: 'number',
		unit: 'см',
		max: 250
	},
	{
		name: 'weight',
		label: 'Вес',
		placeholder: 'Введите вес (кг)',
		type: 'number',
		unit: 'кг',
		max: 200
	},
	{
		name: 'mealFrequency',
		label: 'Количество приемов пищи в день',
		placeholder: 'Сколько раз в день вы хотели бы питаться?',
		type: 'number',
		unit: ' ',
		max: 10
	},
	{
		name: 'favoriteFoods',
		label: 'Любимые продукты, блюда и напитки',
		placeholder: 'Выберите любимые продукты',
		type: 'multiSelect',
		options: favoriteFoodsOptions
	},
	{
		name: 'medicalRestrictions',
		label: 'Медицинские ограничения',
		placeholder: 'Выберите медицинские ограничения',
		type: 'multiSelect',
		options: medicalRestrictionsOptions
	},
	{
		name: 'cookingPreferences',
		label: 'Предпочтения по приготовлению',
		placeholder: 'Выберите предпочтения по приготовлению',
		type: 'multiSelect',
		options: cookingPreferencesOptions
	},
	{
		name: 'cookingTimeConstraints',
		label: 'Временные ограничения на готовку',
		placeholder: 'Выберите временные ограничения на готовку',
		type: 'multiSelect',
		options: cookingTimeConstraintsOptions
	},
	{
		name: 'flexibleDayFrequency',
		label: 'Частота гибких дней',
		placeholder: 'Выберите частоту гибких дней',
		type: 'singleSelect',
		options: flexibleDayFrequencyOptions
	},
	{
		name: 'flexibleDayType',
		label: 'Тип гибкого дня',
		placeholder: 'Выберите тип гибкого дня',
		type: 'singleSelect',
		options: flexibleDayTypeOptions
	},
	{
		name: 'flexibleDays',
		label: 'Конкретные гибкие дни',
		placeholder: 'Выберите конкретные гибкие дни',
		type: 'multiSelect',
		options: flexibleDaysOptions
	},
	{
		name: 'allergies',
		label: 'Аллергии и непереносимости',
		placeholder: 'Аллергии и непереносимости',
		type: 'multiSelect',
		options: allergiesOptions
	},
	{
		name: 'dietType',
		label: 'Тип диеты',
		placeholder: 'Выберите тип диеты',
		type: 'multiSelect',
		options: dietTypeOptions
	},
	{
		name: 'personalRestrictions',
		label: 'Личные ограничения',
		placeholder: 'Выберите личные ограничения',
		type: 'multiSelect',
		options: personalRestrictionsOptions
	},
	{
		name: 'mealTimePreferences',
		label: 'Предпочтения по времени приема пищи',
		placeholder: 'Выберите предпочтения по времени приёма пищи',
		type: 'multiSelect',
		options: mealTimePreferencesOptions
	},
	{
		name: 'religiousRestrictions',
		label: 'Религиозные ограничения',
		placeholder: 'Выберите религиозные ограничения',
		type: 'multiSelect',
		options: religiousRestrictionsOptions
	},
	{
		name: 'nutritionPreferences',
		label: 'Предпочтения по калорийности и макронутриентам',
		placeholder: 'Выберите предпочтения по калорийности и макронутриентам',
		type: 'multiSelect',
		options: nutritionPreferencesOptions
	},
	{
		name: 'seasonalPreferences',
		label: 'Сезонные и экологические предпочтения',
		placeholder: 'Выберите сезонные и экологические предпочтения',
		type: 'multiSelect',
		options: seasonalPreferencesOptions
	},
	{
		name: 'budgetPreferences',
		label: 'Бюджетные предпочтения',
		placeholder: 'Выберите бюджетные предпочтения',
		type: 'multiSelect',
		options: budgetPreferencesOptions
	},
	{
		name: 'cookingExperience',
		label: 'Опыт в кулинарии',
		placeholder: 'Выберите опыт в кулинарии',
		type: 'multiSelect',
		options: cookingOptions
	},
	{
		name: 'nutritionGoal',
		label: 'Цель по питанию',
		placeholder: 'Выберите цель по питанию',
		type: 'multiSelect',
		options: nutritionGoalOptions
	},
	{
		name: 'activityLevel',
		label: 'Уровень активности',
		placeholder: 'Выберите уровень активности',
		type: 'multiSelect',
		options: activityLevelOptions
	},
	...advancedFieldsConfig
]
