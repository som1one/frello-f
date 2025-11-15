import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import React from 'react'
import { Toaster } from 'react-hot-toast'

import LoadingState from './LoadingState'
import { ErrorBoundary } from './components/ErrorBoundary'
import './globals.scss'
import NotFound from './not-found'
import { Providers } from './providers'
import { ThemeProvider } from '@/context/ThemeContext'
import { AuthProvider } from '@/context/authContext'

export const metadata: Metadata = {
	icons: [{ rel: 'icon', url: '/favicon.ico' }]
}

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap' })

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='ru'>
			<body className={montserrat.className}>
				<ThemeProvider>
					<Providers>
						<AuthProvider>
							<ErrorBoundary fallback={<NotFound />}>
								<LoadingState>{children}</LoadingState>
								<Toaster />
							</ErrorBoundary>
						</AuthProvider>
					</Providers>
				</ThemeProvider>
			</body>
		</html>
	)
}
