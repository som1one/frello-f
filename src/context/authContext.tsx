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
		'/register'
	]

	useEffect(() => {
		const token = getAccessToken()
		const pathname = window.location.pathname

		setIsAuthenticated(!!token)

		if (!token && !publicRoutes.includes(pathname)) {
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
