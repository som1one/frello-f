import Image from 'next/image'
import React from 'react'

import styles from './ThemeToggle.module.scss'
import { useTheme } from '@/context/ThemeContext'

export const ThemeToggle = () => {
	const { isDarkMode, toggleTheme } = useTheme()

	return (
		<div onClick={toggleTheme}>
			<label className={styles.switch}>
				<input
					type='checkbox'
					checked={isDarkMode}
					onChange={toggleTheme}
				/>
				<span className={styles.slider}>
					<span className={styles.iconTheme}>
						<Image
							src='/icons/forMenu/default2/light.png'
							alt=''
							width={20}
							height={20}
							className={styles.lightIcon}
						/>
						<Image
							src='/icons/forMenu/default2/dark.png'
							alt=''
							width={20}
							height={20}
							className={styles.darkIcon}
						/>
					</span>
				</span>
			</label>
		</div>
	)
}
