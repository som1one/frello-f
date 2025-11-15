import { TabConfig } from './formFieldsConfig'

export const advancedFieldsConfig: TabConfig[] = [
	{
		name: 'Витамины',
		fields: [
			{
				name: 'vitaminD3',
				label: 'Витамин D3',
				placeholder: 'Витамин D3',
				type: 'number',
				unit: 'нг/мл'
			},
			{
				name: 'ferritin',
				label: 'Ферритин',
				placeholder: 'Ферритин',
				type: 'number',
				unit: 'нг/мл'
			},
			{
				name: 'vitaminB12',
				label: 'Витамин B12',
				placeholder: 'Витамин B12',
				type: 'number',
				unit: 'пг/мл'
			},
			{
				name: 'vitaminC',
				label: 'Витамин C',
				placeholder: 'Витамин C',
				type: 'number',
				unit: 'мг/дл'
			},
			{
				name: 'vitaminA',
				label: 'Витамин A',
				placeholder: 'Витамин A',
				type: 'number',
				unit: 'мкг/дл'
			},
			{
				name: 'vitaminE',
				label: 'Витамин E',
				placeholder: 'Витамин E',
				type: 'number',
				unit: 'мг/л'
			},
			{
				name: 'vitaminK',
				label: 'Витамин K',
				placeholder: 'Витамин K',
				type: 'number',
				unit: 'нг/мл'
			}
		]
	},

	{
		name: 'Минералы',
		fields: [
			{
				name: 'iron',
				label: 'Железо',
				placeholder: 'Железо',
				type: 'number',
				unit: 'мкг/дл'
			},
			{
				name: 'magnesium',
				label: 'Магний',
				placeholder: 'Магний',
				type: 'number',
				unit: 'мг/дл'
			},
			{
				name: 'calcium',
				label: 'Кальций',
				placeholder: 'Кальций',
				type: 'number',
				unit: 'мг/дл'
			},
			{
				name: 'potassium',
				label: 'Калий',
				placeholder: 'Калий',
				type: 'number',
				unit: 'ммоль/л'
			},
			{
				name: 'sodium',
				label: 'Натрий',
				placeholder: 'Натрий',
				type: 'number',
				unit: 'ммоль/л'
			},
			{
				name: 'phosphorus',
				label: 'Фосфор',
				placeholder: 'Фосфор',
				type: 'number',
				unit: 'мг/дл'
			},
			{
				name: 'zinc',
				label: 'Цинк',
				placeholder: 'Цинк',
				type: 'number',
				unit: 'мкг/дл'
			}
		]
	},

	{
		name: 'Холестерин и липиды',
		fields: [
			{
				name: 'totalCholesterol',
				label: 'Общий холестерин',
				placeholder: 'Общий холестерин',
				type: 'number',
				unit: 'мг/дл'
			},
			{
				name: 'ldlCholesterol',
				label: 'ЛПНП (плохой холестерин)',
				placeholder: 'ЛПНП',
				type: 'number',
				unit: 'мг/дл'
			},
			{
				name: 'triglycerides',
				label: 'Триглицериды',
				placeholder: 'Триглицериды',
				type: 'number',
				unit: 'мг/дл'
			}
		]
	},

	{
		name: 'Сахар и углеводный обмен',
		fields: [
			{
				name: 'fastingGlucose',
				label: 'Глюкоза натощак',
				placeholder: 'Глюкоза натощак',
				type: 'number',
				unit: 'мг/дл'
			},
			{
				name: 'hba1c',
				label: 'Гликированный гемоглобин',
				placeholder: 'HbA1c (%)',
				type: 'number',
				unit: '%'
			},
			{
				name: 'homaIr',
				label: 'HOMA-IR',
				placeholder: 'HOMA-IR',
				type: 'number',
				unit: ''
			}
		]
	},

	{
		name: 'Гормоны',
		fields: [
			{
				name: 'insulin',
				label: 'Инсулин',
				placeholder: 'Инсулин',
				type: 'number',
				unit: 'мкЕд/мл'
			},
			{
				name: 'cortisol',
				label: 'Кортизол',
				placeholder: 'Кортизол',
				type: 'number',
				unit: 'мкг/дл'
			},
			{
				name: 'testosterone',
				label: 'Тестостерон',
				placeholder: 'Тестостерон',
				type: 'number',
				unit: 'нг/дл'
			},
			{
				name: 'estrogen',
				label: 'Эстроген',
				placeholder: 'Эстроген',
				type: 'number',
				unit: 'пг/мл'
			},
			{
				name: 'tsh',
				label: 'ТТГ',
				placeholder: 'ТТГ',
				type: 'number',
				unit: 'мкЕд/мл'
			},
			{
				name: 't3Free',
				label: 'Свободный Т3',
				placeholder: 'Свободный Т3',
				type: 'number',
				unit: 'пг/мл'
			},
			{
				name: 't4Free',
				label: 'Свободный Т4',
				placeholder: 'Свободный Т4',
				type: 'number',
				unit: 'нг/дл'
			},
			{
				name: 'antiTpo',
				label: 'Антитела к ТПО',
				placeholder: 'Антитела к ТПО',
				type: 'number',
				unit: 'Ед/мл'
			}
		]
	},

	{
		name: 'Белок и аминокислоты',
		fields: [
			{
				name: 'albumin',
				label: 'Альбумин',
				placeholder: 'Альбумин',
				type: 'number',
				unit: 'г/дл'
			},
			{
				name: 'totalProtein',
				label: 'Общий белок',
				placeholder: 'Общий белок',
				type: 'number',
				unit: 'г/дл'
			},
			{
				name: 'creatinine',
				label: 'Креатинин',
				placeholder: 'Креатинин',
				type: 'number',
				unit: 'мг/дл'
			}
		]
	},

	{
		name: 'Воспаление и маркеры здоровья',
		fields: [
			{
				name: 'crp',
				label: 'С-реактивный белок',
				placeholder: 'С-реактивный белок',
				type: 'number',
				unit: 'мг/л'
			},
			{
				name: 'homocysteine',
				label: 'Гомоцистеин',
				placeholder: 'Гомоцистеин',
				type: 'number',
				unit: 'мкмоль/л'
			}
		]
	},

	{
		name: 'Антиоксиданты и стресс',
		fields: [
			{
				name: 'glutathione',
				label: 'Глутатион',
				placeholder: 'Глутатион',
				type: 'number',
				unit: 'мкмоль/л'
			},
			{
				name: 'mda',
				label: 'Малоновый диальдегид (MDA)',
				placeholder: 'MDA',
				type: 'number',
				unit: 'нмоль/мл'
			},
			{
				name: 'totalAntioxidantStatus',
				label: 'Общий антиоксидантный статус',
				placeholder: 'ОАС',
				type: 'number',
				unit: 'ммоль/л'
			}
		]
	}
]
