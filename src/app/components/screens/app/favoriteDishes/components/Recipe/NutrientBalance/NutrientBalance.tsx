import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import styles from './NutrientBalance.module.scss'
import { useTheme } from '@/context/ThemeContext'

interface PropTypes {
	protein: number
	fats: number
	carbs: number
}

export const NutrientBalance = ({ protein, fats, carbs }: PropTypes) => {
	const { isDarkMode } = useTheme()
	return (
		<div className={styles.nutrientCirclesWrapper}>
			<p className={styles.calorieTitle}>Соотношение БЖУ</p>
			<div className={styles.nutrientContainer}>
				<div className={styles.nutrientText}>
					<div className='flex gap-2 items-center'>
						<span
							className={styles.miniCircle}
							style={{
								backgroundColor: 'rgba(62, 152, 199, 1)'
							}}
						/>
						<span>Белки: {`${protein}г`}</span>
					</div>
					<div className='flex gap-2 items-center'>
						<span
							className={styles.miniCircle}
							style={{
								backgroundColor: 'rgba(240, 98, 146, 1)'
							}}
						/>
						<span>Жиры: {`${fats}г`}</span>
					</div>
					<div className='flex gap-2 items-center'>
						<span
							className={styles.miniCircle}
							style={{
								backgroundColor: 'rgba(124, 252, 0, 1)'
							}}
						/>
						<span>Углеводы: {`${carbs}г`}</span>
					</div>
				</div>
				<div className='relative w-[150px] h-[150px]'>
					<div className={styles.nutrientCircles}>
						<div className={styles.nutrientCircle1}>
							<CircularProgressbar
								value={(protein / 50) * 100}
								styles={buildStyles({
									pathColor: 'rgba(62, 152, 199, 1)',
									textColor: 'white',
									trailColor: isDarkMode
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(139, 140, 145, 0.13)'
								})}
							/>
						</div>
						<div className={styles.nutrientCircle2}>
							<CircularProgressbar
								value={(fats / 50) * 100}
								styles={buildStyles({
									pathColor: 'rgba(240, 98, 146, 1)',
									textColor: 'white',
									trailColor: isDarkMode
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(139, 140, 145, 0.13)'
								})}
							/>
						</div>
						<div className={styles.nutrientCircle3}>
							<CircularProgressbar
								value={(carbs / 50) * 100}
								styles={buildStyles({
									pathColor: 'rgba(124, 252, 0, 1)',
									textColor: 'white',
									trailColor: isDarkMode
										? 'rgba(255, 255, 255, 0.1)'
										: 'rgba(139, 140, 145, 0.13)'
								})}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
