// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
	const accessToken = request.cookies.get('accessToken')?.value

	// Защищённые маршруты
	const protectedPaths = ['/settings', '/chat', '/favoriteDishes', '/mealPlans']

	if (protectedPaths.some(path => request.nextUrl.pathname.startsWith(path))) {
		if (!accessToken) {
			// Если токена нет, перенаправляем на страницу логина
			return NextResponse.redirect(new URL('/login', request.url))
		}

		// Дополнительно можно проверить валидность токена через API
		// Например, запрос к /api/auth/verify
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/dashboard/:path*', '/profile/:path*'] // Укажи пути для проверки
}
