import Image from 'next/image'
import Link from 'next/link'
import { ReactNode } from 'react'

import styles from './DishButton.module.scss'

interface PropTypes {
	href: string
	children: ReactNode
	src: string
}

export const DishButton = ({ href, children, src }: PropTypes) => {
	return (
		<Link href={href}>
			<button className={styles.button}>
				<Image
					src={src}
					alt=''
					width={30}
					height={30}
				/>
				<span className={styles.buttonTitle}>{children}</span>
			</button>
		</Link>
	)
}
