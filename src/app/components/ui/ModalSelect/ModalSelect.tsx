'use client'

import { FC, useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useFormContext } from 'react-hook-form'
import styles from './ModalSelect.module.scss'
import { Option } from '@/app/components/ui/MultiSelectDropdown/MultiSelectDropdown'

interface ModalSelectProps {
    isOpen: boolean
    onClose: () => void
    options: Option[]
    value: string[]
    onChange: (value: string[]) => void
    title: string
    isSingleSelect?: boolean
    customInputsField?: string
    maxSelections?: number
}

export const ModalSelect: FC<ModalSelectProps> = ({
    isOpen,
    onClose,
    options,
    value,
    onChange,
    title,
    isSingleSelect = false,
    customInputsField,
    maxSelections
}) => {
    const [selectedValues, setSelectedValues] = useState<string[]>(value)
    const [customInputs, setCustomInputs] = useState<Record<string, string>>({})
    const [mounted, setMounted] = useState(false)
    const { setValue, getValues } = useFormContext()

    useEffect(() => {
        setMounted(true)
        return () => setMounted(false)
    }, [])

    // Initialize custom inputs from form
    useEffect(() => {
        if (customInputsField && isOpen) {
            const formCustomInputs = getValues(customInputsField) || {}
            setCustomInputs(formCustomInputs)
        }
    }, [customInputsField, getValues, isOpen])

    // Sync selected values when modal opens
    useEffect(() => {
        if (isOpen) {
            setSelectedValues(value)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isOpen, value])

    const handleOptionClick = (optionLabel: string, withInput?: boolean) => {
        if (isSingleSelect) {
            // Toggle selection: if already selected, deselect it
            if (selectedValues.includes(optionLabel)) {
                setSelectedValues([])
            } else {
                setSelectedValues([optionLabel])
            }
        } else {
            if (selectedValues.includes(optionLabel)) {
                // Deselect
                setSelectedValues(prev => prev.filter(v => v !== optionLabel))
                // Remove custom input if exists
                if (withInput && customInputsField) {
                    const newCustomInputs = { ...customInputs }
                    delete newCustomInputs[optionLabel]
                    setCustomInputs(newCustomInputs)
                    setValue(customInputsField, newCustomInputs, { shouldDirty: true })
                }
            } else {
                // Select - check maxSelections limit
                if (maxSelections && selectedValues.length >= maxSelections) {
                    // Already at limit, don't allow more selections
                    return
                }
                setSelectedValues(prev => [...prev, optionLabel])
            }
        }
    }

    const handleCustomInput = (key: string, val: string) => {
        const newCustomInputs = { ...customInputs, [key]: val }
        setCustomInputs(newCustomInputs)
        if (customInputsField) {
            setValue(customInputsField, newCustomInputs, { shouldDirty: true })
        }
    }

    const handleApply = () => {
        onChange(selectedValues)
        onClose()
    }

    const handleCancel = () => {
        setSelectedValues(value) // Reset to original value
        // Reset custom inputs
        if (customInputsField) {
            const formCustomInputs = getValues(customInputsField) || {}
            setCustomInputs(formCustomInputs)
        }
        onClose()
    }

    if (!isOpen || !mounted) return null

    return createPortal(
        <div className={styles.overlay} onClick={handleCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={handleCancel}>
                    ×
                </button>

                <h3 className={styles.title}>{title}</h3>

                <div className={styles.optionsGrid}>
                    {options.map((option) => {
                        const isSelected = selectedValues.includes(option.label)
                        const showInput = (option.withInput || option.isCustom) && isSelected

                        return (
                            <div key={option.label} className={styles.optionWrapper}>
                                <button
                                    className={`${styles.option} ${isSelected ? styles.selected : ''}`}
                                    onClick={() => handleOptionClick(option.label, option.withInput || option.isCustom)}
                                    type="button"
                                >
                                    {option.label}
                                    {isSelected && !showInput && <span className={styles.checkmark}>✓</span>}
                                </button>
                                {showInput && (
                                    <input
                                        type="text"
                                        className={styles.customInput}
                                        placeholder={option.isCustom ? "Введите ваш вариант" : "Уточните"}
                                        value={customInputs[option.label] || ''}
                                        onChange={(e) => handleCustomInput(option.label, e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                e.preventDefault()
                                                handleApply()
                                            }
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        autoFocus
                                    />
                                )}
                            </div>
                        )
                    })}
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                        type="button"
                    >
                        Отмена
                    </button>
                    <button
                        className={styles.applyButton}
                        onClick={handleApply}
                        type="button"
                    >
                        Применить
                    </button>
                </div>
            </div>
        </div>,
        document.body
    )
}
