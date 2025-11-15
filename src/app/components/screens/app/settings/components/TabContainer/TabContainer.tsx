import cn from 'classnames'
import React, { useLayoutEffect, useRef } from 'react'

import styles from './TabContainer.module.scss'
import { useTheme } from '@/context/ThemeContext'

interface PropTypes {
	additionTabs: string[]
	activeTab: number
	onTabChange: (index: number) => void
	tabContainerRef: React.RefObject<HTMLDivElement>
}

export const TabContainer = ({
	additionTabs,
	activeTab,
	onTabChange,
	tabContainerRef
}: PropTypes) => {
	const { isDarkMode } = useTheme()
	const tabRefs = useRef<(HTMLDivElement | null)[]>([])
	const bgRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const updateBgPosition = () => {
			const container = tabContainerRef.current
			const tab = tabRefs.current[activeTab]
			if (container && tab && bgRef.current) {
				const containerRect = container.getBoundingClientRect()
				const tabRect = tab.getBoundingClientRect()
				const scrollLeft = container.scrollLeft

				// Позиция фона относительно контейнера с учетом скролла
				const left = tab.offsetLeft - scrollLeft
				const width = tab.offsetWidth

				bgRef.current.style.left = `${left}px`
				bgRef.current.style.width = `${width}px`

				// Прокрутка до активного таба, если он вне видимой области
				const isTabVisible =
					tabRect.left >= containerRect.left &&
					tabRect.right <= containerRect.right
				if (!isTabVisible) {
					container.scrollTo({
						left:
							tab.offsetLeft - container.offsetWidth / 2 + tab.offsetWidth / 2,
						behavior: 'smooth'
					})
				}
			}
		}

		updateBgPosition()

		// Обновляем позицию при скролле
		const container = tabContainerRef.current
		container?.addEventListener('scroll', updateBgPosition)
		window.addEventListener('resize', updateBgPosition)

		return () => {
			container?.removeEventListener('scroll', updateBgPosition)
			window.removeEventListener('resize', updateBgPosition)
		}
	}, [activeTab])

	const handleTabClick = (index: number) => {
		onTabChange(index)
	}

	return (
		<div
			className={cn(
				styles.tabContainer,
				!isDarkMode && styles.lightTabContainer
			)}
			ref={tabContainerRef}
		>
			<div
				ref={bgRef}
				className={styles.movingBg}
			/>
			{additionTabs.map((tab, index) => (
				<div
					key={index}
					ref={el => {
						tabRefs.current[index] = el
					}}
					className={cn(
						styles.tab,
						!isDarkMode && styles.lightTab,
						activeTab === index && styles.activeTab
					)}
					onClick={() => handleTabClick(index)}
				>
					{tab}
				</div>
			))}
		</div>
	)
}
