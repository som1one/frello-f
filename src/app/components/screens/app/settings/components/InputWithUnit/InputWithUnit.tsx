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
	min?: number
	max?: number
	maxLength?: number
}

export const InputWithUnit = ({
	label,
	id,
	name,
	unit,
	placeholder,
	min,
	max,
	maxLength
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

		// Allow decimal point for weight field
		if (name === 'weight' && (e.key === '.' || e.key === ',')) {
			const currentValue = e.currentTarget.value
			// Only allow one decimal point
			if (currentValue.includes('.') || currentValue.includes(',')) {
				e.preventDefault()
			}
			return
		}

		if (allowedKeys.includes(e.key) || /^[0-9]$/.test(e.key)) {
			return
		}
		e.preventDefault()
	}

	const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
		let value = e.currentTarget.value

		if (name === 'weight') {
			// Allow decimal point for weight
			// Replace comma with dot
			value = value.replace(',', '.')

			// Remove all non-digit and non-dot characters
			value = value.replace(/[^\d.]/g, '')

			// Ensure only one decimal point
			const parts = value.split('.')
			if (parts.length > 2) {
				value = parts[0] + '.' + parts.slice(1).join('')
			}

			// Limit to 2 decimal places
			if (parts.length === 2 && parts[1].length > 2) {
				value = parts[0] + '.' + parts[1].slice(0, 2)
			}

			// Limit integer part to maxLength
			if (maxLength && parts[0].length > maxLength) {
				value = parts[0].slice(0, maxLength) + (parts[1] ? '.' + parts[1] : '')
			}

			e.currentTarget.value = value
		} else if (maxLength) {
			value = value.replace(/\D/g, '').slice(0, maxLength)
			e.currentTarget.value = value
		}
	}

	const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()
		let text = e.clipboardData.getData('text')

		if (name === 'weight') {
			// Replace comma with dot
			text = text.replace(',', '.')
			// Remove all non-digit and non-dot characters
			text = text.replace(/[^\d.]/g, '')

			// Ensure only one decimal point
			const parts = text.split('.')
			if (parts.length > 2) {
				text = parts[0] + '.' + parts.slice(1).join('')
			}

			// Limit to 2 decimal places
			if (parts.length === 2 && parts[1].length > 2) {
				text = parts[0] + '.' + parts[1].slice(0, 2)
			}

			// Limit integer part to maxLength
			if (maxLength && parts[0].length > maxLength) {
				text = parts[0].slice(0, maxLength) + (parts[1] ? '.' + parts[1] : '')
			}
		} else if (maxLength) {
			text = text.replace(/\D/g, '').slice(0, maxLength)
		}

		e.currentTarget.value = text
		// Trigger change event to update form state
		const event = new Event('input', { bubbles: true })
		e.currentTarget.dispatchEvent(event)
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
					type={name === 'weight' ? 'text' : 'number'}
					id={id}
					{...register(name, {
						valueAsNumber: true,
						required: isRequired ? 'Это поле обязательно' : false,
						validate: value => {
							if (typeof min === 'number' && value < min) return `Минимум ${min}`
							if (typeof max === 'number' && value > max) return `Максимум ${max}`
							return true
						}
					})}
					placeholder={placeholder}
					onKeyDown={handleKeyDown}
					onInput={handleInput}
					onPaste={handlePaste}
					min={min}
					inputMode={name === 'weight' ? 'decimal' : 'numeric'}
				/>
				<span className={styles.unitLabel}>{unit}</span>
			</div>
		</UIField>
	)
}
