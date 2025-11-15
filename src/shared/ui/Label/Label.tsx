import clsx from 'clsx'
import { ReactNode } from 'react'

import styles from './Label.module.scss'

interface PropTypes {
	htmlFor?: string
	className?: string
	children: ReactNode
}

export const Label = ({ htmlFor, className, children }: PropTypes) => {
	return (
		<label
			htmlFor={htmlFor}
			className={clsx(styles.label, className)}
		>
			{children}
		</label>
	)
}
