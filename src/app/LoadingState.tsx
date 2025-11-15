'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import Loading from './Loading'

const LoadingState = ({ children }: { children: React.ReactNode }) => {
	// Состояние для отслеживания загрузки
	const [isLoading, setIsLoading] = useState(true)
	const pathname = usePathname()

	// Глобальный кэш для загруженных маршрутов
	const loadedRoutes = React.useRef<Set<string>>(new Set())

	useEffect(() => {
		// Если текущий маршрут уже загружен, пропускаем лоадер
		if (loadedRoutes.current.has(pathname)) {
			setIsLoading(false)
			return
		}

		// Если маршрут новый, показываем лоадер
		setIsLoading(true)

		// Загружаем данные для маршрута (имитация ожидания загрузки контента)
		const loadContent = async () => {
			try {
				// Здесь вы можете добавить реальную загрузку данных, если требуется
				await new Promise(resolve => setTimeout(resolve, 0)) // Мгновенное разрешение промиса
				loadedRoutes.current.add(pathname) // Добавляем маршрут в кэш
				setIsLoading(false) // Останавливаем лоадер
			} catch (error) {
				console.error('Ошибка при загрузке контента:', error)
				setIsLoading(false) // Останавливаем лоадер даже в случае ошибки
			}
		}

		loadContent()
	}, [pathname])

	return isLoading ? <Loading /> : <>{children}</>
}

export default LoadingState
