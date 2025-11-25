// context/authContext.tsx
'use client'

import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'

import { getAccessToken } from '@/services/auth-token.service'

// context/authContext.tsx

// context/authContext.tsx

// context/authContext.tsx

// context/authContext.tsx

// context/authContext.tsx

interface AuthContextType {
	isAuthenticated: boolean
	login: (token: string) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const router = useRouter()

	const publicRoutes = [
		'/login',
		'/reset-password',
		'/forgot-password',
		'/register',
		'/' // добавить лендинг
	]

	const protectedRoutes = [
		'/chat',
		'/mealPlans',
		'/favoriteDishes',
		'/settings',
		'/progress',
		'/shoppingList'
	]

	useEffect(() => {
		const token = getAccessToken()
		const pathname = window.location.pathname

		setIsAuthenticated(!!token)

		// Редирект только если путь защищён
		if (!token && protectedRoutes.some((route: string) => pathname.startsWith(route))) {
			router.push('/login')
		}
	}, [router])

	const login = (token: string) => {
		localStorage.setItem('accessToken', token)
		document.cookie = `accessToken=${token}; path=/; max-age=3600`
		setIsAuthenticated(true)
	}

	const logout = () => {
		localStorage.removeItem('accessToken')
		localStorage.removeItem('refreshToken')
		document.cookie = 'accessToken=; path=/; max-age=0'
		setIsAuthenticated(false)
		router.push('/login')
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}
