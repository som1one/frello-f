interface PropTypes {
	activeAdditionTab: number
	tabContent: React.JSX.Element[]
}

export const TabContent = ({ activeAdditionTab, tabContent }: PropTypes) => {
	return (
		<div className='w-full'>
			{tabContent[activeAdditionTab]}
		</div>
	)
}
