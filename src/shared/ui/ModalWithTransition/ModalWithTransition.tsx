import clsx from 'clsx'
import { ReactNode, useEffect, useRef } from 'react'
import { CSSTransition } from 'react-transition-group'

import styles from './ModalWithTransition.module.scss'

interface PropTypes {
	isOpen: boolean
	children: ReactNode
	isNeedWrapper?: boolean
	className?: string
}

export const ModalWithTransition = ({
	isOpen,
	children,
	className,
	isNeedWrapper = false
}: PropTypes) => {
	const modalRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden'
		} else {
			document.body.style.overflow = ''
		}
		return () => {
			document.body.style.overflow = ''
		}
	}, [isOpen])

	return (
		<CSSTransition
			in={isOpen}
			timeout={300}
			classNames={{
				enter: styles.modalEnter,
				enterActive: styles.modalEnterActive,
				exit: styles.modalExit,
				exitActive: styles.modalExitActive
			}}
			unmountOnExit
			nodeRef={modalRef}
		>
			<div
				role='dialog'
				aria-modal='true'
				ref={modalRef}
				className={clsx(className, isNeedWrapper && styles.modalWrapper)}
			>
				{children}
			</div>
		</CSSTransition>
	)
}
