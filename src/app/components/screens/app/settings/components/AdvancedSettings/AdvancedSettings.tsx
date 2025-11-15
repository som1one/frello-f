import { useRef, useState } from 'react'

import { TabConfig, formFieldsConfig } from '../../model/formFieldsConfig'
import { InputWithUnit } from '../InputWithUnit/InputWithUnit'
import { TabArrow } from '../TabArrow/TabArrow'
import { TabContainer } from '../TabContainer/TabContainer'
import { TabContent } from '../TabContent/TabContent'

import styles from './AdvancedSettings.module.scss'

interface PropTypes {
	additionTabs: string[]
}

export const AdvancedSettings = ({ additionTabs }: PropTypes) => {
	const [activeTab, setActiveTab] = useState(0)
	const tabContainerRef = useRef<HTMLDivElement>(null)

	const scrollTabs = (direction: 'left' | 'right') => {
		const newIndex =
			direction === 'left'
				? Math.max(0, activeTab - 1)
				: Math.min(additionTabs.length - 1, activeTab + 1)
		setActiveTab(newIndex)
	}

	const handleTabChange = (index: number) => {
		setActiveTab(index)
	}

	// Формируем tabContent на основе formFieldsConfig
	const tabContent = additionTabs.map((tabName) => {
		const tabConfig = formFieldsConfig.find(
			config => 'fields' in config && config.name === tabName
		) as TabConfig | undefined
		const fields = tabConfig?.fields || [];

		const gridColsClass = fields.length <= 4 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';
		return (
			<div
				key={tabName}
				// className='w-full flex flex-wrap gap-4 pt-4 '
				className={`w-full grid ${gridColsClass} gap-4 pt-4 min-[1500px]:px-12`}
			>
				{fields.map(field => (
					<InputWithUnit
						key={field.name}
						label={field.label}
						id={`advancedSettings.${field.name}`}
						name={`advancedSettings.${field.name}`}
						unit={field.unit || ''}
						placeholder={field.placeholder || ''}
					/>
				))}
			</div>
		)
	})

	return (
		<div className='w-full'>
			<div className={styles.header}>
				<h2 className={styles.additionHeaderTitle}>Расширенные настройки</h2>
			</div>
			<div className={styles.smallFieldsWrapper}>
				<div className={styles.field}>
					<div className={styles.tabContainerWrapper}>
						<div className={styles.arrowsContainer}>
							<TabArrow
								direction='left'
								onClick={() => scrollTabs('left')}
							/>
							<TabContainer
								additionTabs={additionTabs}
								activeTab={activeTab}
								onTabChange={handleTabChange}
								tabContainerRef={tabContainerRef}
							/>
							<TabArrow
								direction='right'
								onClick={() => scrollTabs('right')}
							/>
						</div>
					</div>
				</div>
				<TabContent
					activeAdditionTab={activeTab}
					tabContent={tabContent}
				/>
			</div>
		</div>
	)
}
