'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

import '../globals.scss'

import styles from '@/app/(landing)/LandingPage.module.scss'
import { Footer } from '@/app/components/layout/footer/Footer'
import { NavBar } from '@/app/components/layout/navBar/NavBar'
import { FifthScreen } from '@/app/components/screens/fifthScreen/FifthScreen'
import { FirstScreen } from '@/app/components/screens/firstScreen/FirstScreen'
import { FourthScreen } from '@/app/components/screens/fourthSreen/FourthScreen'
import { SecondScreen } from '@/app/components/screens/secondScreen/SecondScreen'
import { SixthScreen } from '@/app/components/screens/sixthScreen/SixthScreen'
import { ThirdScreen } from '@/app/components/screens/thirdScreen/ThirdScreen'

export function Landing() {
	const screens = [
		{ Component: FirstScreen, ref: useRef(null) },
		{ Component: SecondScreen, ref: useRef(null) },
		{ Component: ThirdScreen, ref: useRef(null) },
		{ Component: FourthScreen, ref: useRef(null) },
		{ Component: FifthScreen, ref: useRef(null) },
		{ Component: SixthScreen, ref: useRef(null) }
	]

	const variants = {
		hidden: { opacity: 0, y: 50 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.5, ease: 'easeOut' }
		}
	}

	return (
		<div className={styles.container}>
			<NavBar />
			{screens.map(({ Component, ref }, index) => {
				const isInView = useInView(ref, { once: true, amount: 0.3 })
				return (
					<motion.div
						key={index}
						ref={ref}
						initial='hidden'
						animate={isInView ? 'visible' : 'hidden'}
						variants={variants}
					>
						<Component />
					</motion.div>
				)
			})}
			<Footer />
		</div>
	)
}
