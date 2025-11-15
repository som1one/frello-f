import clsx from 'clsx'
import { ButtonHTMLAttributes, ReactNode } from 'react'

import styles from './index.module.scss'

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: ReactNode
	isLoading?: boolean
	className?: string
	size?: 's' | 'm' | 'l'
	variant?: 'filled' | 'outlined'
}

export const Btn = ({ children, isLoading, className, ...props }: BtnProps) => {
	return (
		<button
			className={clsx(
				className,
				styles.startButton,
				isLoading && styles.loading
			)}
			{...props}
		>
			{children}
			{isLoading && <span className={clsx(styles.loader)}></span>}
		</button>
	)
}
