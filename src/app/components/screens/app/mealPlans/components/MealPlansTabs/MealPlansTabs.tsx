import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import { useSwipeable } from 'react-swipeable'

import styles from './MealPlansTabs.module.scss'
import { MealPlan } from '@/feature/meal-plans/model/types'

interface PropTypes {
	plans: MealPlan[]
	activeDay: number
	onDayChange: (day: number) => void
}

export const MealPlansTabs = ({ activeDay, onDayChange, plans }: PropTypes) => {
	const tabContainerRef = useRef<HTMLDivElement | null>(null)
	const movingBgRef = useRef<HTMLButtonElement | null>(null)
	const [bgPosition, setBgPosition] = useState({
		width: 0,
		height: 0,
		offsetLeft: 0
	})

	useEffect(() => {
		if (movingBgRef.current) {
			const rect = movingBgRef.current.getBoundingClientRect()
			setBgPosition({
				width: rect.width,
				height: rect.height,
				offsetLeft: movingBgRef.current.offsetLeft
			})
		}
	}, [activeDay])

	const combinedRef = useCombinedRefs(tabContainerRef)

	const scrollTabs = (direction: 'left' | 'right') => {
		if (tabContainerRef.current) {
			const scrollAmount = 300
			if (direction === 'left') {
				tabContainerRef.current.scrollBy({
					left: -scrollAmount,
					behavior: 'smooth'
				})
			} else {
				tabContainerRef.current.scrollBy({
					left: scrollAmount,
					behavior: 'smooth'
				})
			}
		}
	}

	const handlers = useSwipeable({
		onSwipedLeft: () => scrollTabs('right'),
		onSwipedRight: () => scrollTabs('left'),
		trackMouse: true
	})

	const { ref: _ref, ...restHandlers } = handlers

	return (
		<div>
			<div className={styles.tabContainerWrapper}>
				<div
					className={styles.tabContainer}
					ref={combinedRef}
					{...restHandlers}
				>
					<div
						className={styles.movingBg}
						style={{
							transform: `translateX(${bgPosition.offsetLeft}px)`,
							width: `${bgPosition.width}px`,
							height: `${bgPosition.height}px`
						}}
					/>
					{plans.map((_day, index) => (
						<button
							key={index}
							ref={activeDay === index ? movingBgRef : null}
							className={clsx(
								styles.tab,
								activeDay === index && styles.activeTab
							)}
							onClick={() => onDayChange(index)}
						>
							{`День ${index + 1}`}
						</button>
					))}
				</div>
			</div>
		</div>
	)
}

function useCombinedRefs<T>(...refs: (React.Ref<T> | undefined)[]) {
	return (node: T | null) => {
		refs.forEach(ref => {
			if (typeof ref === 'function') {
				ref(node)
			} else if (ref) {
				;(ref as React.MutableRefObject<T | null>).current = node
			}
		})
	}
}
