import type { Metadata } from 'next'
import React from 'react'

// import { MealPlans } from '@/components/screens/pagesForLanding/moreDetailsScreens/mealPlansScreen/MealPlans'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from './MealPlansPage.module.scss'

export const metadata: Metadata = {
	title: 'О планах питания',
	...NO_INDEX_PAGE
}

export default function MealPlansPage() {
	return (
		<div className={styles.container}>
			{/* <MealPlans /> */}
		</div>
	)
}
