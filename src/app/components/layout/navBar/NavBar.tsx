'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import cn from 'clsx'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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

	const scrollToElement = (elementId: string) => {
		// Force unlock scroll immediately before scrolling
		document.body.classList.remove('no-scroll')
		document.documentElement.classList.remove('no-scroll')

		const element = document.getElementById(elementId)
		console.log(`[NavBar] Attempting to scroll to: ${elementId}`, {
			elementFound: !!element,
			currentScrollY: window.scrollY
		})

		if (element) {
			console.log(`[NavBar] Using scrollIntoView for: ${elementId}`)

			// Use scrollIntoView which is more reliable across browsers
			element.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			})

			// Adjust for fixed header after scroll starts
			setTimeout(() => {
				const headerOffset = 80
				const elementPosition = element.getBoundingClientRect().top
				const currentScroll = window.scrollY
				const targetScroll = currentScroll + elementPosition - headerOffset

				window.scrollTo({
					top: targetScroll,
					behavior: 'smooth'
				})
			}, 100)
		} else {
			console.warn(`[NavBar] Element with id '${elementId}' not found`)
		}
	}

	useEffect(() => {
		if (scrollToSection && pathname === '/') {
			console.log(`[NavBar] Delayed scroll to: ${scrollToSection}`)
			if (menuOpen) toggleMenu()

			// Wait for menu close animation to complete before scrolling
			setTimeout(() => {
				scrollToElement(scrollToSection)
			}, 500)
			setScrollToSection(null)
		}
	}, [pathname, scrollToSection, toggleMenu, menuOpen])

	const handleScrollToSection = (sectionId: string) => {
		console.log(`[NavBar] Clicked section: ${sectionId}, pathname: ${pathname}, menuOpen: ${menuOpen}`)

		if (pathname !== '/') {
			setScrollToSection(sectionId)
			router.push('/')
			if (menuOpen) toggleMenu()
		} else {
			if (menuOpen) {
				toggleMenu()
				// Wait for menu close animation to complete before scrolling
				setTimeout(() => {
					scrollToElement(sectionId)
				}, 500)
			} else {
				scrollToElement(sectionId)
			}
		}
	}

	const handleNavLinkClick = (sectionId: string) => {
		handleScrollToSection(sectionId)
	}

	const handleProfileClick = () => {
		setProfileMenuOpen(!profileMenuOpen)
	}

	// Handle logout (token logic removed)
	const queryClient = useQueryClient()
	const { mutate: logout } = useMutation({
		mutationKey: ['logout'],
		mutationFn: () => authService.logout(),
		onSuccess() {
			// Очищаем кэш React Query для настроек и других данных при выходе
			queryClient.clear()
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
						onClick={() => handleNavLinkClick('why-frello')}
					>
						Почему Frello?
					</div>
					<div
						className={styles.navLink}
						onClick={() => handleNavLinkClick('reviews')}
					>
						Отзывы
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
										buttonsStyles.navButton
									)}
								>
									Вход
								</Link>
								<Link
									href='/register'
									className={cn(
										styles.mobileNavLink,
										buttonsStyles.buttonShaded,
										buttonsStyles.navButton
									)}
								>
									Регистрация
								</Link>
							</>
						)}
						{/* Общие кнопки для всех пользователей */}
						<button
							onClick={() => {
								handleScrollToSection('why-frello')
							}}
							className={cn(
								styles.mobileNavLink,
								styles.mobileNavLinkPlain
							)}
						>
							Почему Frello?
						</button>
						<button
							onClick={() => {
								handleScrollToSection('reviews')
							}}
							className={cn(
								styles.mobileNavLink,
								styles.mobileNavLinkPlain
							)}
						>
							Отзывы
						</button>
						<button
							onClick={() => {
								handleScrollToSection('features')
							}}
							className={cn(
								styles.mobileNavLink,
								styles.mobileNavLinkPlain
							)}
						>
							Возможности
						</button>
						<button
							onClick={() => {
								handleScrollToSection('pricing')
							}}
							className={cn(
								styles.mobileNavLink,
								styles.mobileNavLinkPlain
							)}
						>
							Тариф
						</button>
					</div>
				)}
			</div>
		</div>
	)
}
