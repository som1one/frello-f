import clsx from 'clsx'
import { useEffect, useState } from 'react'

import styles from './index.module.scss'

interface PropTypes extends React.InputHTMLAttributes<HTMLInputElement> {
	isLoading?: boolean
	labelFor?: string
	children?: React.ReactNode
	className?: string
}

export const UICheckbox = ({
	isLoading,
	labelFor,
	children,
	className,
	...props
}: PropTypes) => {
	const [id] = useState(
		labelFor || `checkbox-${Math.random().toString(36).slice(2)}`
	)
	const [isShowLoader, setIsShowLoader] = useState(false)

	useEffect(() => {
		if (isLoading) {
			const timer = setTimeout(() => setIsShowLoader(true), 300)
			return () => clearTimeout(timer)
		} else {
			setIsShowLoader(false)
		}
	}, [isLoading])

	return (
		<div className={clsx(styles.checkboxContainer, className)}>
			<input
				id={id}
				type='checkbox'
				className={styles.checkbox}
				disabled={isShowLoader}
				{...props}
			/>
			<label
				htmlFor={id}
				className={isShowLoader ? styles.loadingLabel : styles.label}
			>
				{isShowLoader && <span className={styles.loader}></span>}
			</label>
			<div className={styles.textWrapper}>{children}</div>
		</div>
	)
}
