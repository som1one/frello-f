import clsx from 'clsx'
import { memo, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import styles from './Field.module.scss'
import { ModalSelect } from '@/app/components/ui/ModalSelect/ModalSelect'
import { Option } from '@/app/components/ui/MultiSelectDropdown/MultiSelectDropdown'
import { Label } from '@/shared/ui/Label/Label'

interface PropTypes {
	name: string
	label: string
	options: Option[]
	placeholder: string
	className?: string
	type?: 'multiSelect' | 'singleSelect'
	onInfoClick?: () => void
	maxSelections?: number
}

export const Field = memo(
	({
		name,
		label,
		options,
		placeholder,
		className,
		type = 'multiSelect',
		onInfoClick,
		maxSelections
	}: PropTypes) => {
		const { control, formState: { errors } } = useFormContext();
		const isRequired = name === 'nutritionGoal';
		const [isModalOpen, setIsModalOpen] = useState(false);

		return (
			<div className={clsx(styles.field, className)}>
				<div className={styles.labelWrapper}>
					<Label>{label}</Label>
					{onInfoClick && (
						<button
							type="button"
							className={styles.infoButton}
							onClick={onInfoClick}
							aria-label="Информация"
						>
							<span className={styles.questionMark}>?</span>
						</button>
					)}
				</div>
				<Controller
					name={`${name}.values`}
					control={control}
					rules={isRequired ? { validate: value => (value && value.length > 0) || 'Это поле обязательное' } : {}}
					render={({ field }) => (
						<div className={styles.dropdownWrapper}>
							<button
								type="button"
								className={styles.selectButton}
								onClick={() => setIsModalOpen(true)}
							>
								{field.value && field.value.length > 0
									? `Выбрано: ${field.value.length}`
									: placeholder}
							</button>

							<ModalSelect
								isOpen={isModalOpen}
								onClose={() => setIsModalOpen(false)}
								options={options}
								value={field.value || []}
								onChange={field.onChange}
								title={placeholder}
								isSingleSelect={type === 'singleSelect'}
								customInputsField={`${name}.customInputs`}
								maxSelections={maxSelections}
							/>

							{/* Error message */}
							{isRequired && errors?.[name] && (
								<span className={styles.errorMsg}>
									{(errors[name] as any)?.values?.message || 'Это поле обязательное'}
								</span>
							)}

						</div>
					)}
				/>
			</div>
		)
	}
)

Field.displayName = 'Field'
