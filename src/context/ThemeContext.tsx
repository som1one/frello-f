'use client'

import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface ThemeContextType {
	isDarkMode: boolean
	toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
	children
}) => {
	const pathname = usePathname()
	const allowedRoutes = ['/chat', '/mealPlans', '/favoriteDishes', '/settings', '/progress', '/shoppingList']
	const isAllowedRoute = allowedRoutes.includes(pathname)
	const isHomePage = pathname === '/'

	// Состояние для темы
	const [isDarkMode, setIsDarkMode] = useState<boolean>(true)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			if (isAllowedRoute) {
				// На разрешённых маршрутах (внутри app) используем сохранённую тему
				// По умолчанию - тёмная тема (до выбора пользователя)
				const savedTheme = localStorage.getItem('theme')
				if (savedTheme) {
					setIsDarkMode(savedTheme === 'dark')
				} else {
					// По умолчанию тёмная тема для app
					setIsDarkMode(true)
				}
			} else {
				// На всех остальных страницах (лендинг, публичные) принудительно тёмная тема
				setIsDarkMode(true)
			}
		}
	}, [isAllowedRoute, pathname])

	const toggleTheme = () => {
		// Переключение темы работает только на разрешённых маршрутах
		if (isAllowedRoute) {
			setIsDarkMode(prevMode => {
				const newMode = !prevMode
				if (typeof window !== 'undefined') {
					localStorage.setItem('theme', newMode ? 'dark' : 'light')
				}
				return newMode
			})
		}
	}

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const html = document.documentElement
			const body = document.body

			if (isDarkMode) {
				html.classList.add('dark')
				body.classList.add('dark-theme')
				html.classList.remove('light')
				body.classList.remove('light-theme')
			} else {
				html.classList.add('light')
				body.classList.add('light-theme')
				html.classList.remove('dark')
				body.classList.remove('dark-theme')
			}
		}
	}, [isDarkMode])

	return (
		<ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (context === undefined) {
		throw new Error('useTheme must be used within a ThemeProvider')
	}
	return context
}
