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
	nutritionGoalOptions,
	nutritionPreferencesOptions,
	personalRestrictionsOptions,
	seasonalPreferencesOptions,
	hasOvenOptions
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
	min?: number
	maxLength?: number
	maxSelections?: number
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
		label: 'Рост (см)',
		placeholder: 'Введите ваш рост',
		type: 'number',
		maxLength: 3,
		unit: 'см',
		min: 1
	},
	{
		name: 'weight',
		label: 'Вес (кг, регулярно обновляйте)',
		placeholder: 'Введите ваш вес',
		type: 'number',
		maxLength: 3,
		unit: 'кг',
		min: 1
	},
	{
		name: 'mealFrequency',
		label: 'Количество приемов пищи в день',
		placeholder: 'Выберите количество приемов пищи',
		type: 'number',
		maxLength: 1,
		unit: ' ',
		min: 3,
		max: 6
	},
	{
		name: 'hasOven',
		label: 'Есть ли у вас доступ к духовке?',
		placeholder: 'Выберите вариант',
		type: 'singleSelect',
		options: hasOvenOptions
	},
	{
		name: 'favoriteFoods',
		label: 'Любимые продукты, блюда и напитки',
		placeholder: 'Выберите любимые продукты',
		type: 'multiSelect',
		options: favoriteFoodsOptions
	},
	{
		name: 'currentProducts',
		label: 'Какие продукты у вас сейчас есть',
		placeholder: 'Введите, какие продукты у вас сейчас есть',
		type: 'text'
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
		name: 'activityLevel',
		label: 'Уровень активности',
		placeholder: 'Выберите уровень активности',
		type: 'singleSelect',
		options: activityLevelOptions
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
		name: 'nutritionPreferences',
		label: 'Предпочтения по калорийности и макронутриентам',
		placeholder: 'Выберите предпочтения по КБЖУ',
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
	}
]
