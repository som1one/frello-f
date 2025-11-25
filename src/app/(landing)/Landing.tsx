'use client'

import { useEffect, useRef, useState } from 'react'

import '../globals.scss'

import styles from '@/app/(landing)/LandingPage.module.scss'
import { Footer } from '@/app/components/layout/footer/Footer'
import { NavBar } from '@/app/components/layout/navBar/NavBar'
import { FifthScreen } from '@/app/components/screens/fifthScreen/FifthScreen'
import { FirstScreen } from '@/app/components/screens/firstScreen/FirstScreen'
import { FourthScreen } from '@/app/components/screens/fourthSreen/FourthScreen'
import { Reviews } from '@/app/components/screens/reviews/Reviews'
import { SecondScreen } from '@/app/components/screens/secondScreen/SecondScreen'
import { SixthScreen } from '@/app/components/screens/sixthScreen/SixthScreen'
import { ThirdScreen } from '@/app/components/screens/thirdScreen/ThirdScreen'
import { HelpUsImprove } from '@/app/components/screens/helpUsImprove/HelpUsImprove'

export function Landing() {
	const footerRef = useRef<HTMLDivElement>(null)
	const firstScreenRef = useRef<HTMLDivElement>(null)
	const heroSectionRef = useRef<HTMLElement>(null)
	const [isNearFooter, setIsNearFooter] = useState(false)
	const [isAfterHero, setIsAfterHero] = useState(false)

	useEffect(() => {
		const handleScroll = () => {
			const windowHeight = window.innerHeight
			const scrollY = window.scrollY || document.documentElement.scrollTop
			let isInFooterArea = false

			// Проверяем, прошли ли мы Hero секцию
			if (heroSectionRef.current) {
				const heroRect = heroSectionRef.current.getBoundingClientRect()
				// Начинаем переход раньше - когда Hero секция начинает уходить за верх экрана
				// Добавляем буфер в 200px для более плавного и незаметного перехода
				setIsAfterHero(heroRect.bottom < windowHeight * 0.3)
			}

			// Проверяем первый экран (FirstScreen) - круги должны показываться когда он виден
			if (firstScreenRef.current) {
				const firstScreenRect = firstScreenRef.current.getBoundingClientRect()

				// Проверяем, виден ли первый экран на экране (даже частично)
				// Элемент виден, если:
				// - его верх находится выше низа окна (даже с запасом)
				// - его низ находится ниже верха окна (даже с запасом)
				// Добавляем большой запас (800px) для высоких экранов и плавного появления
				const isFirstScreenVisible =
					firstScreenRect.top < windowHeight + 800 &&
					firstScreenRect.bottom > -800

				if (isFirstScreenVisible) {
					isInFooterArea = true
				}
			}

			// Проверяем верхнюю секцию футера (heroSection) если первый экран не виден
			if (heroSectionRef.current && !isInFooterArea) {
				const heroRect = heroSectionRef.current.getBoundingClientRect()

				// Проверяем, видна ли верхняя секция на экране
				// Круги показываются когда верхняя секция видна на экране (даже частично)
				// Добавляем запас для плавного появления кругов
				const isHeroVisible = heroRect.top < windowHeight + 400 && heroRect.bottom > -400

				if (isHeroVisible) {
					isInFooterArea = true
				}
			}

			// Проверяем весь футер (нижняя часть) если верхняя секция не видна
			if (footerRef.current && !isInFooterArea) {
				const footerRect = footerRef.current.getBoundingClientRect()
				const footerTop = footerRect.top + scrollY
				const footerHeight = footerRect.height
				const footerBottom = footerTop + footerHeight

				// Проверяем, находится ли пользователь в области футера
				const thresholdTop = footerTop - windowHeight - 200
				const thresholdBottom = footerBottom

				isInFooterArea = scrollY >= thresholdTop && scrollY <= thresholdBottom
			}

			setIsNearFooter(isInFooterArea)
		}

		// Небольшая задержка для инициализации refs
		const timeoutId = setTimeout(() => {
			handleScroll()
		}, 200)

		// Проверяем при монтировании
		handleScroll()

		// Добавляем обработчик скролла
		window.addEventListener('scroll', handleScroll, { passive: true })
		window.addEventListener('resize', handleScroll, { passive: true })

		return () => {
			clearTimeout(timeoutId)
			window.removeEventListener('scroll', handleScroll)
			window.removeEventListener('resize', handleScroll)
		}
	}, [])

	const screens = [
		{ Component: FirstScreen, props: { firstScreenRef } },
		{ Component: SecondScreen },
		{ Component: ThirdScreen },
		{ Component: Reviews },
		{ Component: FourthScreen },
		{ Component: FifthScreen },
		{ Component: HelpUsImprove },
		{ Component: SixthScreen }
	]

	return (
		<div className={styles.container}>
			<NavBar />
			{screens.map(({ Component, props }, index) => (
				<div key={index}>
					<Component {...props} />
				</div>
			))}
			<div ref={footerRef}>
				<Footer heroSectionRef={heroSectionRef} />
			</div>
			{/* Background circles - moved to end of DOM to prevent overlapping content */}
			<div
				className={`${styles.circle1} ${isNearFooter ? styles.circleVisible : ''} ${isAfterHero ? styles.circleBehind : ''}`}
			/>
			<div
				className={`${styles.circle2} ${isNearFooter ? styles.circleVisible : ''} ${isAfterHero ? styles.circleBehind : ''}`}
			/>
		</div>
	)
}
