import type { Metadata } from 'next'
import React from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from '..//favoriteDishes/FavoriteDishesPage.module.scss'

import { UserProgress } from '@/app/components/screens/app/progress/UserProgress'

export const metadata: Metadata = {
	title: 'Ваш прогресс',
	...NO_INDEX_PAGE
}

export default function ProgressPage() {
	return (
		<div className={styles.container}>
			<UserProgress />
		</div>
	)
}
