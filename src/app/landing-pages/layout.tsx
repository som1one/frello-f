import { PropsWithChildren } from 'react'

// import { NavBar } from '@/components/layout/navBar/NavBar'

import styles from './LandingPagesLayout.module.scss'

export default function Layout({ children }: PropsWithChildren) {
	return (
		<div className={styles.container}>
			{/* <NavBar /> */}
			{children}
		</div>
	)
}
