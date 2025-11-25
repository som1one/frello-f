import { useEffect, useState } from 'react'

import styles from './index.module.scss'
import { UICheckbox } from '@/shared/ui/UICheckbox'

import clsx from 'clsx'

interface PropTypes {
	ingredients?: string
}

export const DishIngredients = ({ ingredients }: PropTypes) => {
	const [checkedItems, setCheckedItems] = useState<boolean[]>([])
	const storageKey = typeof window !== 'undefined' ? 'dishIngredientsChecked-' + (window.location.pathname || '') : '';

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
		<div className={clsx(styles.container, 'dish-ingredients-container')}>
			<p className={styles.title}>Ингредиенты</p>
			<ul className={styles.ul}>
				{ingredients?.split('\n')?.map((ingredient, index) => {
					const trimmedIngredient = ingredient.trim()
					if (!trimmedIngredient) return null

					const isChecked = checkedItems[index] || false
					const formattedIngredient =
						trimmedIngredient.includes(' - ') &&
							!trimmedIngredient.includes(' г')
							? `${trimmedIngredient} г`
							: trimmedIngredient

					return (
						<li
							key={index}
							className={`${styles.listItem} ${isChecked ? styles.checked : ''}`}
						>
							<UICheckbox
								checked={isChecked}
								onChange={() => handleCheckboxChange(index)}
							>
								<span >{formattedIngredient}</span>
							</UICheckbox>
						</li>
					)
				})}
			</ul>
		</div>
	)
}
