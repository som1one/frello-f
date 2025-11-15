'use client'

import { useTheme } from '@/context/ThemeContext'
import styles from './Layout.module.scss'

export default function CirclesLayout() {
	const { isDarkMode } = useTheme()
	
	return (
		<div>
			<div
				className={`${styles.circle1}
        ${!isDarkMode ? styles.lightCircle : ''}`}
			/>
			<div
				className={`${styles.circle2}
        ${!isDarkMode ? styles.lightCircle : ''}`}
			/>
			<div
				className={`${styles.circle3}
        ${!isDarkMode ? styles.lightCircle : ''}`}
			/>
		</div>
	)
}
