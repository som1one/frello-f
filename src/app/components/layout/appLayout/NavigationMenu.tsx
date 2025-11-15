'use client'

import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import { Logo } from '../../Logo/Logo'

import styles from './NavigationMenu.module.scss'
import { ThemeToggle } from '@/app/components/ThemeToggle/ThemeToggle'
import { useTheme } from '@/context/ThemeContext'

interface INavItem {
	link: string
	icon: string
	darkIcon: string
	text: string
}

const navList: INavItem[] = [
	{
		link: '/chat',
		icon: '/icons/forMenu/default2/chat.png',
		darkIcon: '/icons/forMenu/default2/activeChat.png',
		text: 'Чат'
	},
	{
		link: '/favoriteDishes',
		icon: '/icons/forMenu/default2/favoriteDishes.png',
		darkIcon: '/icons/forMenu/default2/activeFavoriteDishes.png',
		text: 'Избранные блюда'
	},
	{
		link: '/mealPlans',
		icon: '/icons/forMenu/default2/mealPlans.png',
		darkIcon: '/icons/forMenu/default2/activeMealPlans.png',
		text: 'План питания'
	},
	{
		link: '/settings',
		icon: '/icons/forMenu/default2/settings.png',
		darkIcon: '/icons/forMenu/default2/activeSettings.png',
		text: 'Настройки'
	},
	{
		link: '/progress',
		icon: '/icons/forMenu/default2/progress.png',
		darkIcon: '/icons/forMenu/default2/activeProgress.png',
		text: 'Ваш прогресс'
	},
	{
		link: '/shopping-list',
		icon: '/icons/forMenu/default2/shopping.png',
		darkIcon: '/icons/forMenu/default2/activeShopping.png',
		text: 'Списки покупок'
	}
]

const NavigationMenu = () => {
	const pathname = usePathname()
	const [isDesktop, setIsDesktop] = useState<boolean>(true)

	const { isDarkMode } = useTheme()

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth > 1200)
		}

		window.addEventListener('resize', handleResize)
		handleResize()

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.menuContainer}>
					<div className='flex sm:flex-col gap-4'>
						{isDesktop && <Logo />}
						<nav className={styles.nav}>
							<ul className={styles.navList}>
								{navList.map((nav, index) => (
									<Link
										href={nav.link}
										key={index}
									>
										<li
											className={cn(
												styles.navItem,
												pathname === nav.link ? styles.active : styles.inactive
											)}
										>
											<div className={styles.backgroundAnimation} />
											<div className={styles.linkWrapper}>
												<div className={styles.iconChat}>
													<Image
														src={!isDarkMode ? nav.darkIcon : nav.icon}
														width={26}
														height={26}
														alt=''
														className='flex-shrink-0'
													/>
												</div>
												<span className={styles.title}>{nav.text}</span>
											</div>
										</li>
									</Link>
								))}
							</ul>
						</nav>
					</div>
					<div className={styles.themeToggle}>
						<ThemeToggle />
					</div>
				</div>
			</div>
		</div>
	)
}

export default NavigationMenu
