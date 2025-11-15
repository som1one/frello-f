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

	// Данные для графика калорий
	const calorieLabels = caloriesData.map((item, index) => `День ${index + 1}`)
	const calories = caloriesData.map(item => item.calories)
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

	// Данные для графика веса
	const weightLabels = weightHistory.map(item =>
		format(new Date(item.date), 'dd.MM.yy')
	)
	const weights = weightHistory.map(item => item.weight)
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
		: 'rgba(0, 0, 0, 0.1)'

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
				padding: { top: 10, bottom: 20 }
			}
		},
		scales: {
			y: {
				min: cTicks.min,
				max: cTicks.max,
				ticks: {
					stepSize: cTicks.step,
					callback: (tickValue: string | number): string | number => {
						const val =
							typeof tickValue === 'string' ? parseFloat(tickValue) : tickValue
						return val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val.toFixed(0)
					},
					font: { size: 14 }
				},
				title: {
					display: true,
					text: 'Килокалории',
					font: { size: 16, weight: 'bold' as const }
				},
				grid: { color: gridColor }
			},
			x: {
				title: {
					display: true,
					text: 'Дни',
					font: { size: 16, weight: 'bold' as const }
				},
				ticks: { font: { size: 14 } },
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
				padding: { top: 10, bottom: 20 }
			}
		},
		scales: {
			y: {
				min: wTicks.min,
				max: wTicks.max,
				ticks: {
					stepSize: wTicks.step,
					font: { size: 14 }
				},
				title: {
					display: true,
					text: 'Вес (кг)',
					font: { size: 16, weight: 'bold' as const }
				},
				grid: { color: gridColor }
			},
			x: {
				title: {
					display: true,
					text: 'Дата',
					font: { size: 16, weight: 'bold' as const }
				},
				ticks: { font: { size: 14 } },
				grid: { color: gridColor }
			}
		}
	}

	return (
		<div style={{ display: 'flex', gap: '40px', padding: '40px' }}>
			{calorieChartData.labels.length === 0 &&
				weightChartData.labels.length === 0 && (
					<div style={{ width: '500px', height: '350px' }}>
						<p>Нет данных для отображения</p>
					</div>
				)}
			<div style={{ width: '500px', height: '350px' }}>
				{calorieChartData && (
					<Bar
						data={calorieChartData}
						options={calorieChartOptions}
						height={350}
					/>
				)}
			</div>
			{weightChartData.labels.length > 0 ? (
				<div style={{ width: '500px', height: '350px' }}>
					<Bar
						data={weightChartData}
						options={weightChartOptions}
						height={350}
					/>
				</div>
			) : (
				<div>
					<p className='text-center font-bold'>Нет данных о весе для отображения</p>
				</div>
			)}
		</div>
	)
}
