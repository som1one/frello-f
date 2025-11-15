import cn from 'classnames'

import styles from './Form.module.scss'
import { useTheme } from '@/context/ThemeContext'

interface PropTypes {
	children: React.ReactNode
	onSubmit: () => void
}

export const Form = ({ children, onSubmit }: PropTypes) => {
	const { isDarkMode } = useTheme()

	return (
		<form
			onSubmit={onSubmit}
			className={styles.form}
		>
			<div className={styles.container}>
				<div className={styles.mainFields}>
					<div className={styles.wideFields}>
						<div
							className={cn(
								styles.compactFields,
								!isDarkMode && styles.lightCompactFields
							)}
						>
							{children}
						</div>
					</div>
				</div>
			</div>
		</form>
	)
}
