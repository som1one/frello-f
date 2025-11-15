import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import styles from './SettingsPage.module.scss'
import NewSettings from '@/app/components/screens/app/settings/NewSettings'

export const metadata: Metadata = {
	title: 'Настройки',
	...NO_INDEX_PAGE
}

export default function Page() {
	return (
		<div className={styles.container}>
			<NewSettings />
		</div>
	)
}
