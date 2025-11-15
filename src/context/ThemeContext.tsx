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
	const allowedRoutes = ['/chat', '/mealPlans', '/favoriteDishes', '/settings', '/progress', '/shopping-list']
	const isHomePage = pathname === '/'

	// Состояние для темы
	const [isDarkMode, setIsDarkMode] = useState<boolean>(false)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const savedTheme = !isHomePage && allowedRoutes.includes(pathname)
				? localStorage.getItem('theme')
				: window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
			setIsDarkMode(savedTheme === 'dark');
		}
	}, [isHomePage, pathname]);

	const toggleTheme = () => {
		if (!isHomePage) {
			setIsDarkMode(prevMode => {
				const newMode = !prevMode
				if (allowedRoutes.includes(pathname) && typeof window !== 'undefined') {
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

			if (isHomePage || isDarkMode) {
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
	}, [isDarkMode, isHomePage])

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
