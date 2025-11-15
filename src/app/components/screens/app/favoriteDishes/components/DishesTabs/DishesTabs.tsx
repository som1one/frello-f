import clsx from 'clsx'
import Image from 'next/image'
import { memo, useCallback } from 'react'
import { useSwipeable } from 'react-swipeable'

import { DishButton } from '../DishButton/DishButton'

import styles from './DishesTabs.module.scss'
import { useTabsScroll } from './model/useTabsScroll'
import { useTheme } from '@/context/ThemeContext'

interface PropTypes {
	tabs: string[]
	activeTab: number
	setActiveTab: (index: number) => void
}

export const DishesTabs = memo(
	({ tabs, activeTab, setActiveTab }: PropTypes) => {
		const { isDarkMode } = useTheme()
		const {
			setContainerRef,
			setTabRef,
			bg,
			scrollToTab,
			scrollPrev,
			scrollNext
		} = useTabsScroll(tabs, activeTab, setActiveTab)

		const { ref: swipeRef, ...swipe } = useSwipeable({
			onSwipedLeft: scrollNext,
			onSwipedRight: scrollPrev,
			trackMouse: true
		})

		const mergedRef = useCallback(
			(node: HTMLDivElement | null) => {
				setContainerRef(node)
				if (typeof swipeRef === 'function') swipeRef(node)
			},
			[setContainerRef, swipeRef]
		)

		return (
			<div className={styles.tabContainerWrapper}>
				<div className={styles.tabsAndButtonContainer}>
					<div className={styles.arrowsContainer}>
						<button
							className={styles.arrowLeft}
							onClick={scrollPrev}
							aria-label='Прокрутить влево'
						>
							<Image
								src={
									isDarkMode
										? '/icons/arrows/left.png'
										: '/icons/arrows/light-left.png'
								}
								alt='Влево'
								width={35}
								height={35}
							/>
						</button>

						<div
							className={styles.tabContainer}
							ref={mergedRef}
							{...swipe}
						>
							<div
								className={styles.movingBg}
								style={{
									transform: `translateX(${bg.offsetLeft}px)`,
									width: bg.width,
									height: bg.height
								}}
							/>
							{tabs.map((tab, i) => (
								<button
									key={i}
									ref={setTabRef(i)}
									className={clsx(
										styles.tab,
										activeTab === i && styles.activeTab
									)}
									onClick={() => scrollToTab(i)}
									aria-selected={activeTab === i}
									role='tab'
								>
									{tab}
								</button>
							))}
						</div>

						<button
							className={styles.arrowRight}
							onClick={scrollNext}
							aria-label='Прокрутить вправо'
						>
							<Image
								src={
									isDarkMode
										? '/icons/arrows/right.png'
										: '/icons/arrows/light-right.png'
								}
								alt='Вправо'
								width={35}
								height={35}
							/>
						</button>
					</div>
				</div>

				<div className={styles.regenerateDishContainer}>
					<DishButton
						href='/chat'
						src='/icons/forMealPlans/regenerate.png'
					>
						Сгенерировать новое блюдо
					</DishButton>
				</div>
			</div>
		)
	}
)
