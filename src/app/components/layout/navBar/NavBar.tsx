'use client'

import { useMutation } from '@tanstack/react-query'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { scroller } from 'react-scroll'
import { toast } from 'sonner'

import useMenuToggleNavBar from '@/hooks/useMenuToggle'
import useNoScrollNavBar from '@/hooks/useNoScroll'

import styles from './NavBar.module.scss'
import { Logo } from '@/app/components/Logo/Logo'
import buttonsStyles from '@/app/components/ui/buttons/Buttons.module.scss'
import '@/app/globals.scss'
import { getAccessToken } from '@/services/auth-token.service'
import { authService } from '@/services/auth.service'

export function NavBar() {
	const pathname = usePathname()
	const router = useRouter()
	const { menuOpen, toggleMenu } = useMenuToggleNavBar()
	const [scrollToSection, setScrollToSection] = useState<string | null>(null)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const [profileMenuOpen, setProfileMenuOpen] = useState(false)

	useNoScrollNavBar(menuOpen)

	useEffect(() => {
		const token = getAccessToken()
		setIsAuthenticated(!!token)
	}, [])

	useEffect(() => {
		if (scrollToSection && pathname === '/') {
			scroller.scrollTo(scrollToSection, {
				duration: 500,
				smooth: true,
				offset: -80
			})
			toggleMenu()
			setScrollToSection(null)
		}
	}, [pathname, scrollToSection, toggleMenu])

	const handleScrollToSection = (sectionId: string) => {
		if (pathname !== '/') {
			setScrollToSection(sectionId)
			router.push('/')
		} else {
			scroller.scrollTo(sectionId, {
				duration: 500,
				smooth: true,
				offset: -80 // Adjust offset as needed based on your layout
			})
			toggleMenu()
		}
	}

	const handleNavLinkClick = (sectionId: string) => {
		if (window.innerWidth <= 1024) {
			handleScrollToSection(sectionId)
		} else {
			if (pathname === '/') {
				scroller.scrollTo(sectionId, {
					duration: 500,
					smooth: true,
					offset: -80 // Adjust offset as needed based on your layout
				})
			} else {
				setScrollToSection(sectionId)
				router.push('/')
			}
		}
	}

	const handleProfileClick = () => {
		setProfileMenuOpen(!profileMenuOpen)
	}

	// Handle logout (token logic removed)
	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			toast.success('Вы успешно вышли из системы!')
			setIsAuthenticated(false)
		}
	})

	const handleLogout = () => {
		logout() // Call the logout mutation
	}

	return (
		<div className='container'>
			<div className={cn(styles.navbar, menuOpen && styles.menuOpen)}>
				<Logo />
				<div
					className={cn(styles.burgerMenu, menuOpen && styles.fixedBurger)}
					onClick={toggleMenu}
				>
					<span className={styles.burgerIcon}></span>
					<span className={styles.burgerIcon}></span>
					<span className={styles.burgerIcon}></span>
				</div>
				<nav className={cn(styles.nav, menuOpen && styles.showNav)}>
					<Link
						className={styles.navLink}
						href={'/'}
					>
						Главная
					</Link>
					<div
						className={styles.navLink}
						onClick={() => handleNavLinkClick('features')}
					>
						Возможности
					</div>
					<div
						className={styles.navLink}
						onClick={() => handleNavLinkClick('advantages')}
					>
						Почему Frello?
					</div>
					<div
						className={styles.navLink}
						onClick={() => handleNavLinkClick('pricing')}
					>
						Тариф
					</div>
				</nav>
				<div
					className={cn(
						styles.authButtons,
						isAuthenticated && styles.authenticated
					)}
				>
					{isAuthenticated ? (
						<>
							<div
								className={styles.profile}
								onClick={handleProfileClick}
							>
								<Image
									src='/icons/profile/profile.png'
									alt=''
									width={30}
									height={30}
								/>
								<span className={cn(styles.nav, styles.profileText)}>
									Профиль
								</span>
								<Image
									src={'/icons/arrows/whitedown.png'}
									alt=''
									width={30}
									height={30}
									className={cn(
										styles.arrow,
										profileMenuOpen && styles.arrowOpen
									)}
								/>
							</div>
							{profileMenuOpen && (
								<div className={styles.profileMenu}>
									<Link
										href='/chat'
										className={cn(
											styles.nav,
											buttonsStyles.buttonShaded,
											styles.customButton,
											'p-4'
										)}
									>
										Перейти в Frello
										<Image
											src='/icons/arrows/forNavBar/gotochat.png'
											className={styles.icon}
											alt=''
											width={30}
											height={30}
										/>
									</Link>
									<div
										onClick={handleLogout}
										className={cn(
											styles.nav,
											buttonsStyles.buttonShaded,
											styles.customButton,
											buttonsStyles.logoutButton
										)}
									>
										Выйти
										<Image
											src='/icons/arrows/forNavBar/exit.png'
											className={styles.icon}
											alt=''
											width={25}
											height={25}
										/>
									</div>
								</div>
							)}
						</>
					) : (
						<>
							<Link
								href='/login'
								className={buttonsStyles.buttonUnpainted}
							>
								Вход
							</Link>
							<Link
								href='/register'
								className={buttonsStyles.buttonShaded}
							>
								Регистрация
							</Link>
						</>
					)}
				</div>
				{menuOpen && (
					<div className={styles.mobileMenu}>
						{isAuthenticated ? (
							<>
								<Link
									href='/chat'
									className={cn(
										styles.mobileNavLink,
										buttonsStyles.buttonShaded,
										buttonsStyles.navButton
									)}
								>
									Перейти в Frello
								</Link>
								<button
									onClick={handleLogout}
									className={cn(
										styles.mobileNavLink,
										buttonsStyles.buttonShaded,
										buttonsStyles.navButton,
										buttonsStyles.logoutButton
									)}
								>
									Выйти
								</button>
							</>
						) : (
							<>
								<Link
									href='/login'
									className={cn(
										styles.mobileNavLink,
										buttonsStyles.buttonShaded,
										buttonsStyles.navButton,
										'p-4'
									)}
								>
									Вход
								</Link>
								<Link
									href='/register'
									className={cn(
										styles.mobileNavLink,
										buttonsStyles.buttonShaded,
										buttonsStyles.navButton,
										'p-4'
									)}
								>
									Регистрация
								</Link>
							</>
						)}
					</div>
				)}
			</div>
		</div>
	)
}
