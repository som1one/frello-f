// components/ErrorBoundary.tsx
'use client'

import Link from 'next/link'
import React, { Component, ErrorInfo, ReactNode } from 'react'

// components/ErrorBoundary.tsx

// components/ErrorBoundary.tsx
// Импортируй стили

interface Props {
	children: ReactNode
	fallback?: ReactNode // Опциональный кастомный fallback
}

interface State {
	hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
	state: State = {
		hasError: false
	}

	static getDerivedStateFromError(_: Error): State {
		// Обновляем состояние, чтобы показать fallback UI
		return { hasError: true }
	}

	componentDidCatch(error: Error, errorInfo: ErrorInfo) {
		// Логируем ошибку (можно отправить в сервис мониторинга, например, Sentry)
		console.error('ErrorBoundary caught an error:', error, errorInfo)
	}

	render() {
		if (this.state.hasError) {
			// Кастомный fallback UI
			return (
				this.props.fallback || (
					<div className='bg-orange-500 p-4 rounded-xl shadow-sm error-container'>
						<h1>Что-то пошло не так</h1>
						<p>Произошла ошибка. Попробуйте перезагрузить страницу.</p>
						<Link href='/'>Вернуться на главную</Link>
					</div>
				)
			)
		}

		return this.props.children
	}
}
