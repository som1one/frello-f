import clsx from 'clsx'
import React, { forwardRef } from 'react'

import styles from './UIInput.module.scss'

interface PropTypes extends React.HTMLProps<HTMLInputElement> {
	isError?: boolean
}

export const UIInput = forwardRef<HTMLInputElement, PropTypes>(
	({ isError, ...props }, ref) => {
		return (
			<input
				ref={ref}
				className={clsx(styles.input, isError && styles.error)}
				{...props}
			/>
		)
	}
)

UIInput.displayName = 'UIInput'
