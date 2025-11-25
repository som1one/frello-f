import type { Metadata } from 'next'
import React from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from '..//favoriteDishes/FavoriteDishesPage.module.scss'

export const metadata: Metadata = {
	title: 'Список покупок',
	...NO_INDEX_PAGE
}

export default function ProgressPage() {
	return <div className={styles.container}><h1 className={styles.shoppingTitle}>Функция "Списки покупок" скоро будет доступна, следите за обновлениями!</h1></div>
}
