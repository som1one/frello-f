'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

import styles from './Buttons.module.scss'
import { getAccessToken } from '@/services/auth-token.service'

export function ButtonShaded() {
	return (
		<Link
			href='/login'
			className={styles.buttonShaded}
		>
			Не закрашенная кнопка
		</Link>
	)
}

export function ButtonUnpainted() {
	return (
		<Link
			href='/register'
			className={styles.buttonUnpainted}
		>
			Закрашенная кнопка
		</Link>
	)
}

export function StartButton({ text = 'Начать' }: { text?: string }) {
	const [token, setToken] = useState<string | null>(null)
	useEffect(() => {
		setToken(getAccessToken() || null)
	}, [])

	return (
		<>
			{token ? (
				<Link
					href='/chat'
					className={styles.startButton}
				>
					{text}
				</Link>
			) : (
				<Link
					href='/login'
					className={styles.startButton}
				>
					{text}
				</Link>
			)}
		</>
	)
}
