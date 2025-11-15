import cn from 'classnames'
import { useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'

import { ChangePasswordModal } from '../ChangePasswordModal/ChangePasswordModal'

import styles from './EmailAndPasswordSection.module.scss'
import { ChangePasswordField } from '@/app/components/screens/app/settings/components/EmailAndPasswordSection/ChangePasswordField/ChangePasswordField'

export const EmailAndPasswordSection = () => {

	const [isModalOpen, setIsModalOpen] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)

	const closeModal = () => setIsModalOpen(false)

	return (
		<div className={cn(styles.smallFieldsWrapper)}>
			<div className={styles.emailAndPasswordContainer}>
				<ChangePasswordField />
			</div>
			<CSSTransition
				in={isModalOpen}
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
				<ChangePasswordModal
					modalRef={modalRef}
					closeModal={closeModal}
				/>
			</CSSTransition>
		</div>
	)
}
