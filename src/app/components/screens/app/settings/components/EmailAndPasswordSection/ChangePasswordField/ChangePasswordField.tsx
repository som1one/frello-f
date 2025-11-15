import clsx from 'clsx'
import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'

import styles from './ChangePasswordField.module.scss'
import { ChangePasswordModal } from '@/app/components/screens/app/settings/components/ChangePasswordModal/ChangePasswordModal'
import { Label } from '@/shared/ui/Label/Label'

export const ChangePasswordField = () => {
	const {
		formState: { errors }
	} = useFormContext()

	const [isModalOpen, setIsModalOpen] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)

	const openModal = () => setIsModalOpen(true)
	const closeModal = () => setIsModalOpen(false)

	return (
		<>
			<div className={styles.container}>
				<div
					className={styles.field}
					onClick={openModal}
				>
					<Label htmlFor='password'>Пароль</Label>
					<div className={styles.inputContainer}>
						<input
							type='password'
							id='password'
							value='******'
							readOnly
							className={clsx(styles.input, errors.password && styles.error)}
						/>
						<div
							className={styles.button}
							onClick={openModal}
						>
							Изменить
						</div>
					</div>
					{errors.password?.message && (
						<span className={styles.errorMessage}>
							{errors.password.message as string}
						</span>
					)}
				</div>
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
		</>
	)
}
