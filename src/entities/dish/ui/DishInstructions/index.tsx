import { useState } from 'react'

import styles from './index.module.scss'
import { UICheckbox } from '@/shared/ui'
import clsx from 'clsx'

interface PropTypes {
	instruction?: string
}

export const DishInstructions = ({ instruction }: PropTypes) => {
	const [checkedItems, setCheckedItems] = useState<boolean[]>([])

	const handleCheckboxChange = (index: number) => {
		setCheckedItems(prev => {
			const newChecked = [...prev]
			newChecked[index] = !newChecked[index]
			return newChecked
		})
	}

	return (
		<ol className='h-full w-full'>
			{typeof instruction === 'string' ? (
				instruction
					.split('\n')
					.filter(line => line.trim() !== '')
					.map((line, index) => {
						const isChecked = checkedItems[index] || false

						return (
							<li
								key={index}
								className={clsx(
									styles.listItem,
									'flex items-start gap-3 w-full',
									isChecked && styles.checked
								)}
							>
								<UICheckbox
									className='flex-shrink-0'
									checked={isChecked}
									onChange={() => handleCheckboxChange(index)}
								>
									<span className='break-words whitespace-normal flex-1 min-w-0 w-full'>
										{line}
									</span>
								</UICheckbox>
							</li>
						)
					})
			) : (
				<li>
					{instruction ? 'Инструкция не найдена' : 'Загрузка инструкций...'}
				</li>
			)}
		</ol>
	)
}
