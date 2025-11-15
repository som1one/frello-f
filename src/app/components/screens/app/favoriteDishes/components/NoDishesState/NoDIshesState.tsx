import { DishButton } from '../DishButton/DishButton'

import styles from './NoDishesState.module.scss'

export const NoDishesState = () => {
	return (
		<div className='flex w-full min-h-screen justify-center flex-col'>
			<p className={styles.title}>У вас еще нет сохраненных избранных блюд</p>
			<div className='flex justify-center'>
				<DishButton
					href='/chat'
					src='/icons/forMealPlans/add.png'
				>
					Добавить блюдо
				</DishButton>
			</div>
		</div>
	)
}
