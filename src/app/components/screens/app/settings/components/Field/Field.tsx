import clsx from 'clsx'
import { memo } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import styles from './Field.module.scss'
import { MultiSelectDropdown } from '@/app/components/ui/MultiSelectDropdown/MultiSelectDropdown'
import { Option } from '@/app/components/ui/MultiSelectDropdown/MultiSelectDropdown'
import { Label } from '@/shared/ui/Label/Label'

interface PropTypes {
	name: string
	label: string
	options: Option[]
	placeholder: string
	className?: string
	type?: 'multiSelect' | 'singleSelect'
}

export const Field = memo(
	({
		name,
		label,
		options,
		placeholder,
		className,
		type = 'multiSelect'
	}: PropTypes) => {
		const { control } = useFormContext()
		return (
			<div className={clsx(styles.field, className)}>
				<Label>{label}</Label>
				<Controller
					name={`${name}.values`}
					control={control}
					render={({ field }) => (
						<MultiSelectDropdown
							options={options}
							value={field.value || []}
							onChange={field.onChange}
							customInputsField={`${name}.customInputs`}
							placeholder={placeholder}
							isSingleSelect={type === 'singleSelect'}
						/>
					)}
				/>
			</div>
		)
	}
)

Field.displayName = 'Field'
