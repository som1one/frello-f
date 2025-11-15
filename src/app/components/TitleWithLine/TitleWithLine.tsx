import Image from 'next/image'
import styles from './TitleWithLine.module.scss'

interface PropTypes {
	id?: string
	title: string
}

export const TitleWithLine = ({id, title}: PropTypes) => {
	return (
		<div
			className={styles.titleAndImage}
			id={id}
		>
			<h2 className={styles.mainTitle}>{title}</h2>
			<div className={styles.titleLine}>
				<Image
					src='/icons/lines/line.svg'
					width={246}
					height={31}
					alt=''
				/>
			</div>
		</div>
	)
}