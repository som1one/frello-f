import { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import styles from './BirthdateField.module.scss'
import { UIField } from '@/shared/ui/UIField/UIField'

interface PropTypes {
	name: string
	label: string
	placeholder: string
}

export const BirthdateField = memo(
	({ name, label, placeholder }: PropTypes) => {
		const {
			control,
			formState: { errors }
		} = useFormContext()
		const error = errors[name]?.message as string

		const formatBirthdate = (value: string): string => {
			const cleaned = value.replace(/\D/g, '')
			let formatted = ''
			if (cleaned.length > 0) formatted = cleaned.slice(0, 2)
			if (cleaned.length > 2) formatted += '.' + cleaned.slice(2, 4)
			if (cleaned.length > 4) formatted += '.' + cleaned.slice(4, 8)
			return formatted.slice(0, 10)
		}

		return (
			<UIField
				errorMessage={error}
				label={label}
				htmlFor={name}
			>
				<Controller
					name={name}
					control={control}
					render={({ field }) => (
						<input
							type='text'
							id={name}
							value={field.value || ''}
							placeholder={placeholder}
							maxLength={10}
							onChange={e => field.onChange(formatBirthdate(e.target.value))}
							className={styles.birthdateField}
						/>
					)}
				/>
			</UIField>
		)
	}
)

BirthdateField.displayName = 'BirthdateField'
