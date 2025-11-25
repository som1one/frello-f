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
	/(Количество\s+белков,\s+жиров,\s+углеводов|Количество\s+килокалорий\s+на\s+100\s*г(рамм)?):/gi

// Слова для левой панели сообщений
export const leftMessagePanelWords =
	/(Инструкция приготовления:|Инструкция приготовления|Инструкция\s+приготовления|Инструкция\s*\n*\s*приготовления|Инструкция \n приготовления:|План питания|Рецепт|Завтрак|Обед|Ужин|Полдник|Перекус|Ланч|Десерт|День \d+)/gi

export const dayKeywords = /(День \d+)/gi

export const highlightText = (text: string): string => {
	// Сначала нормализуем текст: убираем переносы строк в заголовках и после них
	let normalizedText = text
		// Нормализуем "Инструкция приготовления:" - убираем переносы внутри строки заголовка
		.replace(/Инструкция\s*\n+\s*приготовления:\s*/gi, 'Инструкция приготовления:\n')
		// Убираем переносы строки сразу после "Количество белков, жиров, углеводов:" чтобы белки были в той же строке
		.replace(/(Количество\s+белков,\s+жиров,\s+углеводов:\s*)\n+\s*/gi, '$1')
		// Убираем переносы строки сразу после "Количество килокалорий на порцию:"
		.replace(/(Количество\s+килокалорий\s+на\s+порцию:\s*)\n+\s*/gi, '$1 ')

	const highlightedText = normalizedText
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
			match => `<span style="color: #F9881F; font-weight: 700;">${match.replace(/\s+/g, ' ').trim()}</span>`
		)
		.replace(
			/(Количество\s+килокалорий\s+на\s+порцию:)/gi,
			match => `<span style="color: #F9881F; font-weight: 700;">${match.replace(/\s+/g, ' ').trim()}</span>`
		)
		.replace(
			nutritionKeywords,
			match => `<span style="color: #F9881F; font-weight: 700;">${match.replace(/\s+/g, ' ').trim()}</span>`
		)
		.replace(
			/(белки|жиры|углеводы):/gi,
			match => `<span style="color: #F9881F; font-weight: 700;">${match}</span>`
		)
		.replace(
			/(Блюдо):/i,
			match => `<span style="color: #F9881F; font-weight: 700;">${match}</span>`
		)

	return highlightedText
}
