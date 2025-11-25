'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { scroller } from 'react-scroll'

import styles from './Footer.module.scss'
import { StartButton } from '@/app/components/ui/buttons/Buttons'

interface FooterProps {
	heroSectionRef?: React.RefObject<HTMLElement>
}

export function Footer({ heroSectionRef }: FooterProps) {
	const pathname = usePathname()
	const router = useRouter()

	const handleScrollToSection = (sectionId: string) => {
		if (pathname !== '/') {
			router.push('/')
		} else {
			scroller.scrollTo(sectionId, {
				duration: 500,
				smooth: true,
				offset: -80
			})
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
					offset: -80
				})
			} else {
				router.push('/')
			}
		}
	}

	return (
		<div className={styles.container}>
			<section ref={heroSectionRef} className={styles.heroSection}>
				<div className={styles.heroContent}>
					<div className={styles.textContent}>
						<h1 className={styles.title}>Frello — Получите тело, о котором мечтаете</h1>
						<p className={styles.subtitle}>
							Без срывов, без стресса и без отказа от жизни, которую любите.<br />
							Достигайте формы мечты, продолжая жить своей жизнью — чувствуя себя легче, сильнее и увереннее каждый день.
						</p>
					</div>
					<div className={styles.buttonContent}>
						<StartButton text="Попробовать бесплатно" />
					</div>
				</div>
				{/* Hero Background image removed as requested */}
			</section>
			<div className={styles.logoSection}>
				<div className={styles.logoContainer}>
					<Image
						src='/logo/newlogo.svg'
						alt=''
						width={44}
						height={44}
					/>
					<span className={styles.logoText}>Frello</span>
				</div>

				<div className={styles.linksSection}>
					<div>
						<h4>О нас</h4>
						<ul>
							<li
								className='hover:text-text transition-colors duration-200 cursor-pointer'
								onClick={() => handleNavLinkClick('features')}
							>
								Возможности
							</li>
							<li
								className='hover:text-text transition-colors duration-200 cursor-pointer'
								onClick={() => handleNavLinkClick('advantages')}
							>
								Почему Frello?
							</li>
							<li
								className='hover:text-text transition-colors duration-200 cursor-pointer'
								onClick={() => handleNavLinkClick('reviews')}
							>
								Отзывы
							</li>
							<li
								className='hover:text-text transition-colors duration-200 cursor-pointer'
								onClick={() => handleNavLinkClick('pricing')}
							>
								Тариф
							</li>
							<li
								className='hover:text-text transition-colors duration-200 cursor-pointer'
								onClick={() => handleNavLinkClick('FAQ')}
							>
								Часто задаваемые вопросы
							</li>
						</ul>
					</div>
					<div>
						<h4>Документы</h4>
						<ul>
							<li>
								<Link
									className='hover:text-text transition-colors duration-200 cursor-pointer'
									href={'/policy'}
								>
									Политика конфиденциальности
								</Link>
							</li>
							<li>
								<Link
									className='hover:text-text transition-colors duration-200 cursor-pointer'
									href={'/oferta'}
								>
									Публичная оферта
								</Link>
							</li>
						</ul>
					</div>
				</div>
			</div>
			<footer className={styles.footer}>
				<span>© 2025 Frello</span>
			</footer>
		</div>
	)
}
