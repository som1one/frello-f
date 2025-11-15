import { logger } from './logger'

export const handleError = (
	error: any,
	setError: (msg: string | null) => void,
	setIsLimitModalOpen: (value: boolean) => void,
	setLimitType?: (type: 'daily' | 'trial') => void
): string | null => {
	const isRateLimitError =
		error?.response?.status === 429 ||
		error?.status === 429 ||
		error?.message?.includes('Лимит запросов к AI превышен') ||
		error?.message?.includes('Too Many Requests')

	if (isRateLimitError) {
		setError('Слишком много запросов. Подожди минуту и попробуй снова.')
		logger.error('Rate limit 429', error)
		return 'retry'
	}

	const errorData = error?.response?.data
	if (errorData?.type === 'daily' || errorData?.type === 'trial') {
		setIsLimitModalOpen(true)
		if (setLimitType) {
			setLimitType(errorData.type)
		}
		return null
	}

	if (!error?.message) {
		setError('Произошла неизвестная ошибка. Попробуйте снова.')
		logger.error('Unknown error occurred', error)
		return 'retry'
	}

	if (error.message.includes('Request limit exceeded')) {
		setIsLimitModalOpen(true)
		return null
	}

	if (error.message.includes('Сервер временно недоступен')) {
		setError('Сервер временно недоступен. Попробуйте позже.')
		logger.error('Server unavailable', error.message)
		return 'later'
	}

	setError('Произошла ошибка. Попробуйте снова.')
	logger.error('General error', error.message)
	return 'retry'
}
