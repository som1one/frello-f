import clsx from 'clsx'
import Link from 'next/link'
import { ReactNode } from 'react'

import styles from './index.module.scss'

interface PropTypes {
	href: string
	children: ReactNode
	className?: string
}

export const UILink = ({ href, children, className }: PropTypes) => {
	return (
		<Link
			href={href}
			className={clsx(styles.spanText, className)}
			// onClick={() => push('/login')}
		>
			{children}
		</Link>
	)
}
