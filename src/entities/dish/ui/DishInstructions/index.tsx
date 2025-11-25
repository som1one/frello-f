import { useEffect, useState } from 'react'

import styles from './index.module.scss'
import { UICheckbox } from '@/shared/ui'
import clsx from 'clsx'

interface PropTypes {
	instruction?: string
}

export const DishInstructions = ({ instruction }: PropTypes) => {
	const [checkedItems, setCheckedItems] = useState<boolean[]>([])
	const storageKey = typeof window !== 'undefined' ? 'dishInstructionsChecked-' + (window.location.pathname || '') : '';

	useEffect(() => {
		if (!storageKey) return;
		const saved = localStorage.getItem(storageKey)
		if (saved) {
			try {
				const arr = JSON.parse(saved)
				if (Array.isArray(arr)) setCheckedItems(arr)
			} catch { }
		}
		// eslint-disable-next-line
	}, [])

	useEffect(() => {
		if (storageKey) {
			localStorage.setItem(storageKey, JSON.stringify(checkedItems))
		}
	}, [checkedItems, storageKey])

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
