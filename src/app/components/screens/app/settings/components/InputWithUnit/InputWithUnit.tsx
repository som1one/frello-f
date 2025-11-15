import { useFormContext } from 'react-hook-form'

import styles from './InputWithUnit.module.scss'
import { UIField } from '@/shared/ui/UIField/UIField'
import { UIInput } from '@/shared/ui/UIInput/UIInput'

interface PropTypes {
	label: string
	id: string
	name: string
	unit: string
	placeholder: string
	max?: number
}

export const InputWithUnit = ({
	label,
	id,
	name,
	unit,
	placeholder,
	max
}: PropTypes) => {
	const {
		register,
		formState: { errors }
	} = useFormContext()

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		const allowedKeys = [
			'Backspace',
			'Delete',
			'ArrowLeft',
			'ArrowRight',
			'Tab'
		]
		if (allowedKeys.includes(e.key) || /^[0-9]$/.test(e.key)) {
			return
		}
		e.preventDefault()
	}

	const isRequired = ['height', 'weight', 'mealFrequency'].includes(name)

	return (
		<UIField
			label={label}
			htmlFor={id}
			errorMessage={errors[name]?.message}
		>
			<div className={styles.inputWrapper}>
				<UIInput
					type='number'
					id={id}
					{...register(name, {
						valueAsNumber: true,
						max,
						required: isRequired ? 'Это поле обязательно' : false
					})}
					placeholder={placeholder}
					onKeyDown={handleKeyDown}
					max={max}
				/>
				<span className={styles.unitLabel}>{unit}</span>
			</div>
		</UIField>
	)
}
