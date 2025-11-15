export const NO_INDEX_PAGE = {
	robots: 'noindex, nofollow', // Запрещаем индексацию страницы
	meta: [
		{
			name: 'robots',
			content: 'noindex, nofollow' // Еще один способ указать правила для роботов
		},
		{
			name: 'googlebot',
			content: 'noindex, nofollow' // Специальные правила для Googlebot
		}
	]
}
