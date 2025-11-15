import { Option } from '@/app/components/ui/MultiSelectDropdown/MultiSelectDropdown'

export const favoriteFoodsOptions: Option[] = [
	{ label: 'Фрукты (яблоки, бананы, ягоды и т. д.)' },
	{ label: 'Овощи (брокколи, морковь, томаты и т. д.)' },
	{ label: 'Мясо (курица, говядина, свинина и т. д.)' },
	{ label: 'Рыба и морепродукты' },
	{ label: 'Молочные продукты (сыр, молоко, йогурт)' },
	{ label: 'Злаки и крупы (овсянка, киноа, гречка)' },
	{ label: 'Выпечка и десерты' },
	{ label: 'Кофе / Чай / Смузи / Соки' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const medicalRestrictionsOptions = [
	{ label: 'Диабет' },
	{ label: 'Гипертония' },
	{ label: 'Болезни ЖКТ (гастрит, язва)' },
	{ label: 'Заболевания почек' },
	{ label: 'Проблемы с печенью' },
	{ label: 'Болезни сердца', isCustom: true },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const cookingOptions = [
	{ label: 'Новичок – Готовлю редко или почти не умею' },
	{ label: 'Готовлю по необходимости – Могу приготовить простые блюда' },
	{ label: 'Уверенный любитель – Люблю готовить, экспериментирую с рецептами' },
	{
		label:
			'Опытный кулинар – Готовлю сложные блюда, умею работать с разными техниками'
	},
	{
		label:
			'Профессионал – Имею кулинарное образование или работаю в сфере питания'
	},
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const allergiesOptions = [
	{ label: 'Лактоза' },
	{ label: 'Глютен' },
	{ label: 'Орехи' },
	{ label: 'Морепродукты (указать)', withInput: true },
	{ label: 'Яйца' },
	{ label: 'Фрукты (указать)', withInput: true },
	{ label: 'Овощи (указать)', withInput: true },
	{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const dietTypeOptions = [
	{ label: 'Всеядный' },
	{ label: 'Вегетарианец' },
	{ label: 'Веган' },
	{ label: 'Пескетарианец' },
	{ label: 'Кето' },
	{ label: 'Палео' },
	{ label: 'Средиземноморская' },
	{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const cookingPreferencesOptions = [
	{ label: 'Минимальная термообработка (больше сырых продуктов)' },
	{ label: 'Простые рецепты (до 15 мин)' },
	{ label: 'Сложные рецепты (готов к готовке 1+ часа)' },
	{ label: 'Использование специй и приправ' },
	{ label: 'Без жарки / Только варка и тушение' },
	{ label: 'Только домашняя еда' },
	{ label: 'Готовые продукты и полуфабрикаты' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const personalRestrictionsOptions = [
	{ label: 'Не люблю острую еду' },
	{ label: 'Не ем жареное' },
	{ label: 'Не люблю горький / кислый вкус' },
	{ label: 'Избегаю сладкого' },
	{ label: 'Не люблю супы' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const mealTimePreferencesOptions = [
	{ label: 'Любимый Завтрак' },
	{ label: 'Любимый Второй завтрак / Утренний перекус' },
	{ label: 'Любимый Обед' },
	{ label: 'Любимый Полдник / Дневной перекус' },
	{ label: 'Любимый Ужин' },
	{ label: 'Любимый Поздний ужин / Ночной перекус' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const religiousRestrictionsOptions = [
	{ label: 'Халяль' },
	{ label: 'Кошерное питание' },
	{ label: 'Постные блюда (в определенные дни)' },
	{ label: 'Без свинины' },
	{ label: 'Без алкоголя' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const nutritionPreferencesOptions = [
	{ label: 'Высокобелковая диета' },
	{ label: 'Низкоуглеводное питание' },
	{ label: 'Высокожировое питание' },
	{ label: 'Баланс БЖУ' },
	{ label: 'Низкокалорийное питание' },
	{ label: 'Высококалорийное питание' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const seasonalPreferencesOptions = [
	{ label: 'Только сезонные продукты' },
	{ label: 'Локальные продукты' },
	{ label: 'Органические продукты' },
	{ label: 'Минимум пластиковой упаковки' },
	{ label: 'Только фермерские продукты' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const budgetPreferencesOptions = [
	{ label: 'Эконом-вариант (минимальные траты)' },
	{ label: 'Средний бюджет (сбалансированное соотношение цены и качества)' },
	{ label: 'Премиум-продукты (высококачественные ингредиенты)' },
	{ label: 'Без ограничений' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const nutritionGoalOptions = [
	{ label: 'Поддержание веса' },
	{ label: 'Похудение' },
	{ label: 'Набор мышечной массы' },
	{ label: 'Улучшение самочувствия и здоровья' },
	{ label: 'Повышение энергии и работоспособности' },
	{ label: 'Спортивные достижения' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const activityLevelOptions = [
	{ label: 'Минимальный – сидячий образ жизни.' },
	{ label: 'Низкий – редкие легкие нагрузки.' },
	{ label: 'Средний – регулярная умеренная активность.' },
	{ label: 'Высокий – интенсивные нагрузки большую часть недели.' },
	{ label: 'Очень высокий – ежедневные тренировки.' },
		{ label: 'Нет' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const cookingTimeConstraintsOptions: Option[] = [
	{ label: 'У меня почти нет времени — готовлю максимум 10–15 минут в день.' },
	{ label: 'Готовлю только быстрые блюда (до 30 минут).' },
	{
		label:
			'Могу готовить полноценно, но только 1 раз в день (например, вечером, а потом разогреваю).'
	},
	{ label: 'Готовлю заранее на несколько дней (batch cooking, заготовки).' },
	{
		label:
			'Готовлю много, но в основном для семьи, а для себя отдельно времени почти нет.'
	},
	{ label: 'Чаще беру готовую еду/доставку, чем готовлю дома.' },
	{
		label:
			'Предпочитаю простые блюда без долгих рецептов и большого количества ингредиентов.'
	},
	{
		label:
			'Могу уделять время готовке только в выходные, в будни готовлю минимально.'
	},
	{
		label:
			'Люблю готовить, но времени ограниченно, поэтому ищу баланс между скоростью и вкусом.'
	},
		{ label: 'Нет Опыта' },
	{ label: 'Другое (Введите)', isCustom: true }
]

export const flexibleDayFrequencyOptions: Option[] = [
	{ label: 'Еженедельно (1–2 дня)' },
	{ label: 'Раз в 10–14 дней' },
	{ label: 'Раз в месяц' },
	{ label: 'Без гибких дней' }
]

export const flexibleDayTypeOptions: Option[] = [
	{ label: 'Лёгкий (+10–20% калорий)' },
	{ label: 'Средний (+30–50% калорий)' },
	{ label: 'Полный (без строгого лимита)' }
]

export const flexibleDaysOptions: Option[] = [
	{ label: 'Понедельник' },
	{ label: 'Вторник' },
	{ label: 'Среда' },
	{ label: 'Четверг' },
	{ label: 'Пятница' },
	{ label: 'Суббота' },
	{ label: 'Воскресенье' },
	{ label: 'Не важно' }
]
