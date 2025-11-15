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
	options,
	value,
	onChange,
	customInputsField,
	placeholder = 'Выберите...',
	className = '',
	style = {},
	isSingleSelect = false
}) => {
	const { setValue, getValues } = useFormContext()
	const [isOpen, setIsOpen] = useState(false)
	const [customMode, setCustomMode] = useState(false)
	const [customValue, setCustomValue] = useState('')
	const wrapperRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (
				wrapperRef.current &&
				!wrapperRef.current.contains(event.target as Node)
			) {
				setIsOpen(false)
				setCustomMode(false)
			}
		}
		if (isOpen || customMode) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => document.removeEventListener('mousedown', handleClickOutside)
	}, [isOpen, customMode])

	useEffect(() => {
		if (hasCustomValue(value, options)) {
			setCustomMode(true)
			setIsOpen(false)
			const customVal =
				value.find(
					v =>
						!options
							.filter(o => !o.isCustom)
							.map(o => o.label)
							.includes(v)
				) || ''
			setCustomValue(customVal)
			const otherValues = value.filter(v =>
				options
					.filter(o => !o.isCustom)
					.map(o => o.label)
					.includes(v)
			)
			if (otherValues.length > 0) {
				onChange([customVal])
			}
		}
	}, [value, options, onChange])

	const handleToggle = (option: string, isCustom?: boolean) => {
		if (isCustom) {
			setCustomMode(true)
			setIsOpen(false)
			onChange([])
			setCustomValue('')
		} else {
			if (isSingleSelect) {
				// Для singleSelect заменяем значение
				onChange(value.includes(option) ? [] : [option])
			} else {
				// Для multiSelect добавляем/удаляем
				if (value.includes(option)) {
					onChange(value.filter(v => v !== option))
				} else {
					if (hasCustomValue(value, options)) {
						onChange([option])
					} else {
						onChange([...value, option])
					}
				}
			}
		}
	}

	const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value
		setCustomValue(val)
		onChange(val ? [val] : [])
	}

	const handleCustomInput = (key: string, val: string) => {
		if (customInputsField) {
			const customInputs = getValues(customInputsField) || {}
			setValue(customInputsField, { ...customInputs, [key]: val })
		}
	}

	const handleCustomBlur = () => {
		if (!customValue.trim()) {
			setCustomMode(false)
			onChange([])
		}
	}

	const handleCustomKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Escape') {
			setCustomMode(false)
			onChange([])
		}
		if (e.key === 'Enter') {
			setCustomMode(false)
			setIsOpen(false)
		}
	}

	const selectedLabels = value.map(v => {
		const opt = options.find(opt => opt.label === v)
		if (opt && opt.withInput && customInputsField) {
			const customInputs = getValues(customInputsField) || {}
			if (customInputs[v]) {
				return `${opt.label.replace(' (указать)', '')}: ${customInputs[v]}`
			}
		}
		return v
	})

	return (
		<div
			ref={wrapperRef}
			className={`${styles.customSelect} ${className}`}
			style={{ position: 'relative', minWidth: 200, ...style }}
			tabIndex={-1}
		>
			{customMode ? (
				<input
					type='text'
					value={customValue}
					onChange={handleCustomChange}
					placeholder={placeholder || 'Укажите свой вариант'}
					className={`${styles.customInput} ${styles.customInputBox}`}
					autoFocus
					onBlur={handleCustomBlur}
					onKeyDown={handleCustomKeyDown}
				/>
			) : (
				<>
					<div
						className={styles.selectDisplay}
						tabIndex={0}
						onClick={() => setIsOpen(prev => !prev)}
					>
						<div className={styles.selectValue}>
							{selectedLabels.length > 0
								? selectedLabels.join(', ')
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
						<div className={styles.selectDropdown}>
							{options.map(option => {
								if (option.isCustom) {
									return (
										<div
											key={option.label}
											className={styles.dropdownOption}
											onClick={() => handleToggle(option.label, true)}
										>
											<span className={styles.optionLabel}>{option.label}</span>
										</div>
									)
								}
								return (
									<label
										key={option.label}
										className={styles.dropdownOption}
									>
										<input
											type='checkbox'
											checked={value.includes(option.label)}
											onChange={() => handleToggle(option.label)}
											className={styles.checkbox}
											id={option.label}
										/>
										<span className={styles.optionLabel}>{option.label}</span>
										{option.withInput && value.includes(option.label) && (
											<input
												type='text'
												value={
													customInputsField
														? getValues(customInputsField)?.[option.label] || ''
														: ''
												}
												onChange={e =>
													handleCustomInput(option.label, e.target.value)
												}
												placeholder='Уточните'
												className={styles.optionInput}
											/>
										)}
									</label>
								)
							})}
						</div>
					)}
				</>
			)}
		</div>
	)
}
