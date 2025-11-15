import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { scroller } from 'react-scroll'

import useIsMobile from '@/hooks/useIsMobile'
import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

import styles from './LimitModal.module.scss'

interface LimitModalProps {
	closeModal: () => void
	isNameModalClosing: boolean
	limitType?: 'daily' | 'trial'
}

export const LimitModal = ({
	closeModal,
	isNameModalClosing,
	limitType = 'trial'
}: LimitModalProps) => {
	const router = useRouter()
	useLockBodyScroll(!isNameModalClosing)
	const isMobile = useIsMobile(769)
	const isSmallMobile = useIsMobile(400)
	const isDaily = limitType === 'daily'

	const handleScrollToSection = (sectionId: string) => {
		router.push('/')
		setTimeout(() => {
			scroller.scrollTo(sectionId, {
				duration: 500,
				smooth: true,
				offset: isSmallMobile ? 200 : isMobile ? 1100 : 500
			})
		}, 500)
	}

	const handleNavLinkClick = (sectionId: string) => {
		handleScrollToSection(sectionId)
	}

	const modalContent = (
		<div
			className={styles.modalBackdrop}
			onClick={closeModal}
		>
			<div
				className={cn(
					styles.modalContent,
					!isNameModalClosing && styles.closing
				)}
				onClick={e => e.stopPropagation()}
			>
				<h2 className={styles.changePasswordTitle}>
					{isDaily
						? 'Лимит на сегодня исчерпан'
						: 'К сожалению, ваш пробный период подошел к концу'}
				</h2>
				<div className='text-center flex flex-col gap-2 font-medium'>
					<p>
						{isDaily
							? 'Вы использовали все 5 запросов на сегодня.'
							: 'Чтобы продолжить пользоваться всеми возможностями сервиса, оформите подписку.'}
					</p>
					<p>
						{isDaily
							? 'Новые запросы будут доступны завтра в 00:00.'
							: 'Откройте доступ к удобному использованию без ограничений'}
					</p>
				</div>
				<div className={styles.modalActions}>
					<button
						type='button'
						className={styles.buttonShaded}
						onClick={() => handleNavLinkClick('pricing')}
					>
						Разблокировать все возможности
					</button>
				</div>
			</div>
		</div>
	)
	return createPortal(modalContent, document.body)
}
