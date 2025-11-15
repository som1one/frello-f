import cn from 'classnames'
import Image from 'next/image'

import { useTheme } from '@/context/ThemeContext'

interface PropTypes {
	direction: 'left' | 'right'
	onClick: () => void
}

export const TabArrow = ({ direction, onClick }: PropTypes) => {
	const { isDarkMode } = useTheme()
	return (
		<button
			onClick={onClick}
			type='button'
		>
			<Image
				src={cn(
					!isDarkMode
						? '/icons/arrows/light-right.png'
						: '/icons/arrows/right.png'
				)}
				alt='arrow'
				width={35}
				height={35}
				className={cn(direction === 'left' ? 'rotate-180 left-0' : 'right-0')}
			/>
		</button>
	)
}
