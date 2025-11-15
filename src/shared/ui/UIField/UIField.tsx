import React, { ReactNode, forwardRef } from 'react'
import { FieldError, FieldErrorsImpl, Merge } from 'react-hook-form'

import styles from './UIField.module.scss'
import { Label } from '@/shared/ui/Label/Label'
import { UIInput } from '@/shared/ui/UIInput/UIInput'

interface PropTypes extends React.HTMLProps<HTMLInputElement> {
	label?: string
	htmlFor?: string
	errorMessage?:
		| string
		| FieldError
		| Merge<FieldError, FieldErrorsImpl<any>>
		| undefined
	children?: ReactNode
}

export const UIField = forwardRef<HTMLDivElement, PropTypes>(
	({ label, htmlFor, errorMessage, children, ...props }, ref) => {
		return (
			<div
				className={styles.field}
				ref={ref}
			>
				{label && <Label htmlFor={htmlFor}>{label}</Label>}
				{children ? (
					children
				) : (
					<UIInput
						{...props}
						isError={!!errorMessage}
					/>
				)}
				{errorMessage && (
					<span className={styles.errorMessage}>{errorMessage as string}</span>
				)}
			</div>
		)
	}
)

UIField.displayName = 'UIField'
