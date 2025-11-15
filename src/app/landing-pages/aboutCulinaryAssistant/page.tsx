import type { Metadata } from 'next'
import React from 'react'

// import { CulinaryAssistant } from '@/components/screens/pagesForLanding/moreDetailsScreens/culinaryAssistantScreen/CulinaryAssistant'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from './CulinaryAssistantPage.module.scss'

export const metadata: Metadata = {
	title: 'О Кулинарном помощнике',
	...NO_INDEX_PAGE
}

export default function CulinaryAssistantPage() {
	return (
		<div className={styles.container}>
			{/* <CulinaryAssistant /> */}
		</div>
	)
}
