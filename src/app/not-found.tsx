import Image from 'next/image'
import React from 'react'

import authStyles from '@/app/components/screens/auth/Auth.module.scss'

import styles from './NotFound.module.scss'
import Link from 'next/link'

export default function NotFound() {
	return (
		<div className={`${authStyles.authContainer} ${styles.container}`}>
			<div className={styles.content}>
				<Image
					src='/icons/notFoundIcon/404.png'
					alt=''
					width={500}
					height={500}
					className={styles.image}
				/>
				<h1 className={styles.title}>Страница не найдена</h1>
				<p className={styles.message}>
					Мы не смогли найти запрашиваемую вами страницу.
				</p>
				<div className={styles.links}>
					<Link
						href='/'
						className={styles.link}
					>
						Вернуться на главную страницу
					</Link>{' '}
				</div>
			</div>
		</div>
	)
}
