import type { Metadata } from 'next'
import React from 'react'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from './FavoriteDishesPage.module.scss'
import { NewFavoriteDishes } from '@/app/components/screens/app/favoriteDishes/NewFavoriteDishes'

export const metadata: Metadata = {
	title: 'Избранные блюда',
	...NO_INDEX_PAGE
}

export default function favoriteDishesPage() {

	return (
		<div className={styles.container}>
			<NewFavoriteDishes />
		</div>
	)
}
