import cn from 'classnames'

import styles from './SmallBurgerMenu.module.scss'

interface PropTypes {
	toggleChat: () => void
	isChatListOpen: boolean
	isDarkMode: boolean
}

export const SmallBurgerMenu = ({
	toggleChat,
	isChatListOpen,
	isDarkMode
}: PropTypes) => {
	return (
		<div
			className={cn(styles.burgerMenu, isChatListOpen && styles.menuOpen)}
			onClick={toggleChat}
		>
			<span
				className={cn(styles.burgerIcon, !isDarkMode && styles.lightBurgerIcon)}
			>
			</span>
			<span
				className={cn(styles.burgerIcon, !isDarkMode && styles.lightBurgerIcon)}
			></span>
			<span
				className={cn(styles.burgerIcon, !isDarkMode && styles.lightBurgerIcon)}
			></span>
		</div>
	)
}
