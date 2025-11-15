import { NavigationGuardProvider } from 'next-navigation-guard'
import { Toaster } from 'react-hot-toast'

import styles from './Layout.module.scss'
import CirclesLayout from '@/app/(main)/CirclesLayout'
import NavigationMenu from '@/app/components/layout/appLayout/NavigationMenu'
import { SettingsProvider } from '@/context/SettingsContext'

export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<SettingsProvider>
			<NavigationGuardProvider>
				<div className={styles.container}>
					<NavigationMenu />
					<CirclesLayout />
					<div className={styles.childContainer}>{children}</div>
				</div>
				<Toaster position='top-center' />
			</NavigationGuardProvider>
		</SettingsProvider>
	)
}
