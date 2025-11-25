import { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import Script from 'next/script'
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
				{/* Yandex.Metrika counter */}
				<Script
					id="yandex-metrika"
					strategy="afterInteractive"
					dangerouslySetInnerHTML={{
						__html: `
							(function(m,e,t,r,i,k,a){
								m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
								m[i].l=1*new Date();
								for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
								k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
							})(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=105503812', 'ym');
							ym(105503812, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", accurateTrackBounce:true, trackLinks:true});
						`
					}}
				/>
				<noscript>
					<div>
						<img
							src="https://mc.yandex.ru/watch/105503812"
							style={{ position: 'absolute', left: '-9999px' }}
							alt=""
						/>
					</div>
				</noscript>
				{/* /Yandex.Metrika counter */}

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
