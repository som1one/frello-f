'use client'

import clsx from 'clsx'
import { useState } from 'react'

import styles from './NewFavoriteDishes.module.scss'
import { DishesTabs } from './components/DishesTabs/DishesTabs'
import { NoDishesState } from './components/NoDishesState/NoDIshesState'
import { Recipe } from './components/Recipe/Recipe'
import { useFavoriteDishes } from '@/feature/dishes/model/useFavoriteDishes'

export const NewFavoriteDishes = () => {
	const [activeTab, setActiveTab] = useState(0)

	const { dishes, deleteDish } = useFavoriteDishes()

	const tabs = dishes.map(dish => dish.name)

	const title = tabs[activeTab]
	const currentDish = dishes[activeTab] || {}

	const handleDelete = (dishId: number) => {
		const index = dishes.findIndex(d => d.id === dishId)
		deleteDish(dishId, {
			onSuccess: () => {
				if (dishes.length <= 1) return
				const newIndex = index === dishes.length - 1 ? index - 1 : index
				setActiveTab(newIndex)
			}
		})
	}

	return (
		<div
			className={clsx(
				styles.container,
				dishes.length === 0 && styles.noDishesContainer
			)}
		>
			{dishes.length === 0 ? (
				<NoDishesState />
			) : (
				<div>
					<DishesTabs
						tabs={tabs}
						activeTab={activeTab}
						setActiveTab={setActiveTab}
					/>
					<Recipe
						title={title}
						currentDish={currentDish}
						onDelete={handleDelete}
					/>
				</div>
			)}
		</div>
	)
}
