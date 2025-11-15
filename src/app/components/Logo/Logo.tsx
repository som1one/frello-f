import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import styles from './Logo.module.scss'

export const Logo = () => {
	return (
		<Link
			className={styles.logo}
			href='/'
		>
			<Image
				className={styles.logoImg}
				src='/logo/newlogo.svg'
				alt='logo'
				width={44}
				height={44}
			/>
			<h1 className={styles.logoText}>Frello</h1>
		</Link>
	)
}