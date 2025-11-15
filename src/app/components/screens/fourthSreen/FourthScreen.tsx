import Image from 'next/image'
import React from 'react'

import { StartButton } from '../../ui/buttons/Buttons'

import styles from './FourthScreen.module.scss'

export function FourthScreen() {
	return (
		<div className={styles.container}>
			<div className={styles.personalizationBlock}>
				<div className={styles.imageContainer}>
					<Image
						src='/images/fourthScreenImage/fourthscreen.svg'
						alt=''
						width={100}
						height={100}
						className={styles.image}
					/>
				</div>

				<div className={styles.description}>
					<h3>Тот самый момент, когда наконец-то получится.</h3>
					<p>
						Раньше вы начинали, срывались и чувствовали вину.
Сейчас у вас есть план, который вписывается в вашу жизнь, и поддержка — даже когда хочется всё бросить.
Это не очередная попытка. Это начало новой привычки — быть собой и при этом достигать цели.
					</p>

					<div className={styles.button}>
						<StartButton />
					</div>
				</div>
			</div>
		</div>
	)
}
