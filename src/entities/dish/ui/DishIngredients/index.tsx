import { useState } from 'react'

import styles from './index.module.scss'
import { UICheckbox } from '@/shared/ui/UICheckbox'

interface PropTypes {
	ingredients?: string
}

export const DishIngredients = ({ ingredients }: PropTypes) => {
	const [checkedItems, setCheckedItems] = useState<boolean[]>([])

	const handleCheckboxChange = (index: number) => {
		setCheckedItems(prev => {
			const newChecked = [...prev]
			newChecked[index] = !newChecked[index]
			return newChecked
		})
	}

	return (
		<div className={styles.container}>
			<p className={styles.title}>Ингредиенты:</p>
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
