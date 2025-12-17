import React, { useEffect, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'

import styles from './MultiSelectDropdown.module.scss'

export interface Option {
	label: string
	withInput?: boolean
	isCustom?: boolean
}

interface MultiSelectDropdownProps {
	options: Option[]
	value: string[]
	onChange: (value: string[]) => void
	customInputsField?: string
	placeholder?: string
	className?: string
	style?: React.CSSProperties
	isSingleSelect?: boolean // Новый пропс
}

const hasCustomValue = (value: string[], options: Option[]) => {
	const standardLabels = options.filter(o => !o.isCustom).map(o => o.label)
	return value.some(v => !standardLabels.includes(v))
}

export const MultiSelectDropdown: React.FC<MultiSelectDropdownProps> = ({
	options: initialOptions,
	value,
	onChange,
	customInputsField,
	placeholder = 'Выберите...',
	className = '',
	style = {},
	isSingleSelect = false
}) => {
	const { setValue, getValues, watch } = useFormContext()
	const [isOpen, setIsOpen] = useState(false)
	const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top'>('bottom')
	const [options, setOptions] = useState<Option[]>(initialOptions)
	const [customInputs, setCustomInputs] = useState<Record<string, string>>({})
	const wrapperRef = useRef<HTMLDivElement>(null)

	// Инициализация customInputs из формы при монтировании
	useEffect(() => {
		if (customInputsField) {
			const formCustomInputs = getValues(customInputsField) || {}
			setCustomInputs(formCustomInputs)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []) // Только при монтировании

	// Синхронизация при изменении формы через watch
	const watchedCustomInputs = customInputsField ? watch(customInputsField) : null
	useEffect(() => {
		if (watchedCustomInputs && typeof watchedCustomInputs === 'object') {
			setCustomInputs(watchedCustomInputs as Record<string, string>)
		}
	}, [watchedCustomInputs])

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
			}
		}
		if (isOpen) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen])

	// Auto-positioning logic
	useEffect(() => {
		if (isOpen && wrapperRef.current) {
			const rect = wrapperRef.current.getBoundingClientRect()
			const spaceBelow = window.innerHeight - rect.bottom
			const spaceAbove = rect.top

			// If space below is less than 320px (safe margin) and space above is larger
			if (spaceBelow < 320 && spaceAbove > spaceBelow) {
				setDropdownPosition('top')
			} else {
				setDropdownPosition('bottom')
			}
		}
	}, [isOpen])

	const handleToggle = (option: string, isCustom?: boolean) => {
		// Filter out "ghost" values (values that are not in the current options list)
		// This ensures that clicking an option cleans up any invalid data
		const validValues = value.filter(v => options.some(o => o.label === v))

		if (option === 'Нет') {
			if (validValues.includes('Нет')) {
				onChange([])
			} else {
				onChange(['Нет'])
				// Clear all custom inputs when selecting 'Нет'
				if (customInputsField) {
					setValue(customInputsField, {}, { shouldDirty: true })
				}
			}
			return
		}

		// If selecting any other option, remove 'Нет'
		let currentValue = [...validValues]
		if (currentValue.includes('Нет')) {
			currentValue = currentValue.filter(v => v !== 'Нет')
		}

		if (isCustom) {
			// If already selected, deselect
			if (currentValue.includes(option)) {
				onChange(currentValue.filter(v => v !== option))
				// Clear custom input for this option
				if (customInputsField) {
					const newCustomInputs = { ...customInputs }
					delete newCustomInputs[option]
					setValue(customInputsField, newCustomInputs, { shouldDirty: true })
				}
			} else {
				// Select and prepare for custom input
				onChange([...currentValue, option])
			}
		} else {
			if (isSingleSelect) {
				// Для singleSelect заменяем значение
				onChange(currentValue.includes(option) ? [] : [option])
			} else {
				// Для multiSelect добавляем/удаляем
				if (currentValue.includes(option)) {
					onChange(currentValue.filter(v => v !== option))
				} else {
					onChange([...currentValue, option])
				}
			}
		}
	}

	const handleCustomInput = (key: string, val: string) => {
		// Обновляем локальное состояние немедленно для отображения
		setCustomInputs(prev => {
			const newCustomInputs = { ...prev, [key]: val }

			// Синхронизируем с формой используя новое состояние
			if (customInputsField) {
				setValue(customInputsField, newCustomInputs, { shouldDirty: true })
			}

			return newCustomInputs
		})
	}

	// Calculate valid values for display to avoid showing count of hidden/ghost items
	const displayValues = value.filter(v => options.some(o => o.label === v))

	return (
		<div
			ref={wrapperRef}
			className={`${styles.customSelect} ${className}`}
			style={{ position: 'relative', ...style }}
			tabIndex={-1}
		>
			<div
				className={styles.selectDisplay}
				tabIndex={0}
				onClick={() => setIsOpen(prev => !prev)}
			>
				<div className={styles.selectValue}>
					{displayValues.length > 0
						? (displayValues.length === 1 && displayValues[0] === 'Нет' ? 'Нет' : `Выбрано: ${displayValues.length}`)
						: placeholder}
				</div>
				<span className={styles.selectIcon}>
					<svg
						width='22'
						height='22'
						viewBox='0 0 22 22'
						fill='none'
						xmlns='http://www.w3.org/2000/svg'
					>
						<path
							d='M6 9L11 14L16 9'
							stroke='#888'
							strokeWidth='2.2'
							strokeLinecap='round'
							strokeLinejoin='round'
						/>
					</svg>
				</span>
			</div>
			{isOpen && (
				<div className={`${styles.selectDropdown} ${dropdownPosition === 'top' ? styles.selectDropdownTop : ''}`}>
					{options.map(option => {
						// Treat isCustom same as withInput
						const showInput = (option.withInput || option.isCustom) && value.includes(option.label)

						return (
							<label
								key={option.label}
								className={styles.dropdownOption}
							>
								<div className={styles.optionHeader}>
									<input
										type='checkbox'
										checked={value.includes(option.label)}
										onChange={() => handleToggle(option.label, option.isCustom)}
										className={styles.checkbox}
										id={option.label}
									/>
									<span className={styles.optionLabel}>{option.label}</span>
								</div>
								{showInput && (
									<input
										type='text'
										value={customInputs[option.label] || ''}
										onChange={e => {
											e.stopPropagation() // Предотвращаем закрытие dropdown при клике на input
											handleCustomInput(option.label, e.target.value)
										}}
										onClick={e => e.stopPropagation()} // Предотвращаем закрытие dropdown при клике на input
										onKeyDown={e => {
											e.stopPropagation() // Предотвращаем закрытие dropdown при нажатии Enter
											// Значение уже сохранено через handleCustomInput в onChange
											// Enter просто предотвращает закрытие dropdown
										}}
										placeholder={option.isCustom ? 'Введите ваш вариант' : 'Уточните'}
										className={styles.optionInput}
										autoFocus
									/>
								)}
							</label>
						)
					})}
				</div>
			)}
		</div>
	)
}
