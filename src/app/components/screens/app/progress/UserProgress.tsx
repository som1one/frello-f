'use client'

import { AxiosError } from 'axios'
import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	LinearScale,
	Title,
	Tooltip
} from 'chart.js'
import { format } from 'date-fns'
import { Bar } from 'react-chartjs-2'

import styles from './UserProgress.module.scss'
import { useTheme } from '@/context/ThemeContext'
import {
	useCaloriesHistory,
	useWeightHistory
} from '@/feature/calories-progress'

// Для форматирования дат

ChartJS.register(BarElement, LinearScale, CategoryScale, Title, Tooltip)

// Улучшенная функция niceTicks
function niceTicks(min: number, max: number, targetTicks = 8) {
	const minRange = 1000
	if (min === max) {
		if (min === 0) {
			min = 0
			max = minRange
		} else {
			min = min - Math.abs(min) * 0.1
			max = max + Math.abs(max) * 0.1
		}
	}

	const range = Math.max(max - min, minRange)
	const rawStep = range / targetTicks
	const exp = Math.floor(Math.log10(rawStep))
	const frac = rawStep / Math.pow(10, exp)
	const mult = [1, 2, 5, 10].find(m => frac <= m) || 10
	let niceStep = mult * Math.pow(10, exp)

	if (range < 2000 && niceStep < 100) niceStep = Math.max(niceStep, 100)
	const tickMin = Math.floor(min / niceStep) * niceStep
	const tickMax = Math.ceil(max / niceStep) * niceStep

	return { min: tickMin, max: tickMax, step: niceStep }
}

export const UserProgress = () => {
	const { data: caloriesData, isLoading, error } = useCaloriesHistory()
	const { data: weightHistory } = useWeightHistory()
	const { isDarkMode } = useTheme()

	if (isLoading) return <div>Загрузка...</div>
	if (error) {
		const errorMessage =
			error instanceof AxiosError && error.response?.data?.message
				? error.response.data.message
				: error?.message || 'Неизвестная ошибка'
		return <div>Ошибка: {errorMessage}</div>
	}
	if (!caloriesData || !weightHistory) return <div>Нет данных</div>

	// Данные для графика калорий - ограничиваем до последних 14 записей
	// Если записей > 14, берем последние 14, иначе показываем все
	const limitedCaloriesData = caloriesData.length > 14
		? caloriesData.slice(-14)
		: caloriesData;
	// Используем реальные даты из API вместо генерации по индексу
	// Используем реальные даты из API
	const calorieLabels = limitedCaloriesData.map((item, index) => {
		if (item.date) {
			const dateObj = new Date(item.date)
			// Проверяем валидность даты
			if (!isNaN(dateObj.getTime())) {
				return format(dateObj, 'dd.MM.yy')
			}
		}
		// Fallback на генерацию даты, если date отсутствует или невалидна
		const today = new Date()
		const daysAgo = limitedCaloriesData.length - 1 - index
		const date = new Date(today)
		date.setDate(date.getDate() - daysAgo)
		return format(date, 'dd.MM.yy')
	})
	const calories = limitedCaloriesData.map(item => item.calories)
	const cTicks = niceTicks(Math.min(...calories), Math.max(...calories), 8)

	const calorieChartData = {
		labels: calorieLabels,
		datasets: [
			{
				data: calories,
				backgroundColor: 'orange',
				borderRadius: 8,
				borderSkipped: false,
				barThickness: 20
			}
		]
	}

	// Данные для графика веса - ограничиваем до последних 14 записей
	// Если записей > 14, берем последние 14, иначе показываем все
	const limitedWeightHistory = weightHistory.length > 14
		? weightHistory.slice(-14)
		: weightHistory;
	const weightLabels = limitedWeightHistory.map(item =>
		format(new Date(item.date), 'dd.MM.yy')
	)
	const weights = limitedWeightHistory.map(item => item.weight)
	const wTicks = niceTicks(Math.min(...weights), Math.max(...weights), 8)

	const weightChartData = {
		labels: weightLabels,
		datasets: [
			{
				data: weights,
				backgroundColor: 'orange',
				borderRadius: 8,
				borderSkipped: false,
				barThickness: 20
			}
		]
	}

	const gridColor = isDarkMode
		? 'rgba(255, 255, 255, 0.1)'
		: 'rgba(0, 0, 0, 0.15)'

	const textColor = isDarkMode ? '#ffffff' : '#1a1a1a'

	// Опции для графика калорий
	const calorieChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: 'История потребления килокалорий',
				font: { size: 18, weight: 'bold' as const },
				padding: { top: 10, bottom: 20 },
				color: textColor
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 100, // Деления через 100 калорий
					callback: (tickValue: string | number): string | number => {
						const val =
							typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue
						return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(0)
					},
					font: { size: 14 },
					color: textColor
				},
				title: {
					display: true,
					text: 'Килокалории',
					font: { size: 16, weight: 'bold' as const },
					color: textColor
				},
				grid: { color: gridColor }
			},
			x: {
				title: {
					display: true,
					text: 'Дата',
					font: { size: 16, weight: 'bold' as const },
					color: textColor
				},
				ticks: {
					font: { size: 14 },
					color: textColor
				},
				grid: { color: gridColor }
			}
		}
	}

	// Опции для графика веса
	const weightChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: { display: false },
			title: {
				display: true,
				text: 'История изменения веса',
				font: { size: 18, weight: 'bold' as const },
				padding: { top: 10, bottom: 20 },
				color: textColor
			}
		},
		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 10, // Деления через 10 кг
					font: { size: 14 },
					color: textColor
				},
				title: {
					display: true,
					text: 'Вес (кг)',
					font: { size: 16, weight: 'bold' as const },
					color: textColor
				},
				grid: { color: gridColor }
			},
			x: {
				title: {
					display: true,
					text: 'Дата',
					font: { size: 16, weight: 'bold' as const },
					color: textColor
				},
				ticks: {
					font: { size: 14 },
					color: textColor
				},
				grid: { color: gridColor }
			}
		}
	}

	return (
		<div className={styles.progressContainer}>
			{calorieChartData.labels.length === 0 &&
				weightChartData.labels.length === 0 && (
					<div className={styles.emptyDataContainer}>
						<p>Нет данных для отображения</p>
					</div>
				)}
			<div className={styles.chartContainer}>
				{calorieChartData && (
					<Bar
						data={calorieChartData}
						options={calorieChartOptions}
						height={350}
					/>
				)}
			</div>
			{weightChartData.labels.length > 0 ? (
				<div className={styles.chartContainer}>
					<Bar
						data={weightChartData}
						options={weightChartOptions}
						height={350}
					/>
				</div>
			) : (
				<div className={styles.emptyWeightContainer}>
					<p>Нет данных о весе для отображения</p>
				</div>
			)}
		</div>
	)
}
