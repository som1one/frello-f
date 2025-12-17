import cn from 'classnames'
import { memo, useLayoutEffect, useRef, useState, useEffect } from 'react'
import { Controller, useFormContext } from 'react-hook-form'

import styles from './GenderTabs.module.scss'
import { Label } from '@/shared/ui/Label/Label'

interface PropTypes {
	name: string
	label: string
	defaultValue?: string
}

export const GenderTabs = memo(
	({ name, label, defaultValue = 'female' }: PropTypes) => {
		const { control } = useFormContext()
		const tabs = ['Мужской', 'Женский', 'Другой']
		const [activeTab, setActiveTab] = useState(
			defaultValue === 'male' ? 0 : defaultValue === 'female' ? 1 : 2
		)
		const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
		const [bgStyle, setBgStyle] = useState({ left: 0, width: 0 })

		useLayoutEffect(() => {
			const updateBgStyle = () => {
				const el = tabRefs.current[activeTab]
				if (el) {
					setBgStyle({ left: el.offsetLeft, width: el.offsetWidth })
				}
			}

			updateBgStyle()
			window.addEventListener('resize', updateBgStyle)

			return () => window.removeEventListener('resize', updateBgStyle)
		}, [activeTab])

		const handleTabClick = (
			index: number,
			onChange: (value: string) => void
		) => {
			setActiveTab(index)
			onChange(index === 0 ? 'male' : index === 1 ? 'female' : 'other')
		}

		return (
			<div className={styles.field}>
				<Label className={styles.label}>
					{label}
				</Label>
				<div className={styles.tabContainerWrapper}>
					<div className={styles.tabContainer}>
						<div
							className={styles.movingBg}
							style={{
								left: bgStyle.left,
								width: bgStyle.width
							}}
						/>
						<Controller
							name={name}
							control={control}
							defaultValue={defaultValue}
							render={({ field }) => {
								// Sync activeTab with field.value
								useEffect(() => {
									const valueToIndex = field.value === 'male' ? 0 : field.value === 'female' ? 1 : 2
									if (valueToIndex !== activeTab) {
										setActiveTab(valueToIndex)
									}
								}, [field.value])

								return (
									<>
										{tabs.map((tab, index) => (
											<button
												type='button'
												key={index}
												ref={el => {
													tabRefs.current[index] = el
												}}
												className={cn(
													styles.tab,
													activeTab === index && styles.activeTab
												)}
												onClick={() => handleTabClick(index, field.onChange)}
											>
												{tab}
											</button>
										))}
									</>
								)
							}}
						/>
					</div>
				</div>
			</div>
		)
	}
)

GenderTabs.displayName = 'GenderTabs'
