// Ключевые слова для приемов пищи
export const mealKeywords =
	/(Завтрак|Обед|Ужин|Полдник|Перекус|Первый Перекус|Ланч|Десерт|Второй завтрак|Утренний перекус|Поздний ужин|Фуршет|Кофе-брейк|Бранч|Ранний завтрак):/gi

// Дни недели и планы питания
export const weekDaysKeywords =
	/(Понедельник|Вторник|Среда|Четверг|Пятница|Суббота|Воскресенье):/gi
export const mealPlanKeywords =
	/(Прием пищи \d+|День \d+|План питания на день|План питания на \d+ дней|План питания на \d+ дня|План питания на неделю|План питания на \d+ недель|План питания на \d+ недели):/gi

// Прочие ключевые слова
export const ingredientKeywords =
	/(Ингредиенты|Инструкция приготовления|Инструкция\s*\n*\s*приготовления|Время приготовления):/gi
export const nutritionKeywords =
	/(Количество белков, жиров, углеводов|Количество килокалорий на 100 ?г(рамм)?):/gi

// Слова для левой панели сообщений
export const leftMessagePanelWords =
	/(Инструкция приготовления:|Инструкция приготовления|Инструкция\s+приготовления|Инструкция\s*\n*\s*приготовления|Инструкция \n приготовления:|План питания|Рецепт|Завтрак|Обед|Ужин|Полдник|Перекус|Ланч|Десерт|День \d+)/gi

export const dayKeywords = /(День \d+)/gi

export const highlightText = (text: string): string => {
	const highlightedText = text
		.replace(
			mealKeywords,
			match => `<span style="color: #F9881F; font-weight: 700;">${match}</span>`
		)
		.replace(
			weekDaysKeywords,
			match => `<span style="color: #FF774C; font-weight: 700;">${match}</span>`
		)
		.replace(
			mealPlanKeywords,
			match => `<span style="color: #FF774C; font-weight: 700;">${match}</span>`
		)
		.replace(
			ingredientKeywords,
			match => `<span style="color: #F9881F; font-weight: 700;">${match}</span>`
		)
		.replace(
			/(Количество килокалорий на порцию:)/gi,
			match => `<span style="color: #F9881F; font-weight: 700;">${match}</span>`
		)
		.replace(
			nutritionKeywords,
			match => `<span style="color: #F9881F; font-weight: 700;">${match}</span>`
		)
		.replace(
			/(Блюдо):/i,
			match => `<span style="color: #F9881F; font-weight: 700;">${match}</span>`
		)

	return highlightedText
}
