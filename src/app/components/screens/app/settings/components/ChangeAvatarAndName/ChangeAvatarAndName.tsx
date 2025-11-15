import cn from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { CSSTransition } from 'react-transition-group'

import { ChangeNameModal } from '../ChangeNameModal/ChangeNameModal'

import styles from './ChangeAvatarAndName.module.scss'
import { useTheme } from '@/context/ThemeContext'

interface PropTypes {
	name?: string
	avatarName: string
	label: string
}

export const ChangeAvatarAndName = ({ avatarName }: PropTypes) => {
	const { isDarkMode } = useTheme()
	const {
		control,
		formState: { errors },
		watch
	} = useFormContext()
	const [avatarHover, setAvatarHover] = useState(false)
	const [isNameModalOpen, setIsNameModalOpen] = useState(false)
	const modalRef = useRef<HTMLDivElement>(null)

	const avatar = watch(avatarName)
	const currentName = 'User'

	const openNameModal = () => setIsNameModalOpen(true)
	const closeNameModal = () => setIsNameModalOpen(false)

	// const errorName = errors[name]?.message as string
	const errorAvatar = errors[avatarName]?.message as string

	return (
		<div className={cn(styles.container, !isDarkMode && styles.light)}>
			<label
				htmlFor={avatarName}
				className={styles.avatar_label}
				onMouseEnter={() => setAvatarHover(true)}
				onMouseLeave={() => setAvatarHover(false)}
			>
				{avatar ? (
					<Image
						src={URL.createObjectURL(avatar)}
						alt='Avatar'
						width={90}
						height={90}
						className={styles.avatar}
					/>
				) : (
					<div className={styles.default_wrapper}>
						<Image
							src={
								avatarHover
									? isDarkMode
										? '/icons/forSettings/hoverDefaultAvatar.png'
										: '/icons/forSettings/lightHoverDefaultAvatar.png'
									: '/icons/forSettings/defaultAvatar.png'
							}
							alt='Default avatar'
							width={90}
							height={90}
							className={styles.default_icon}
						/>
					</div>
				)}
				<Controller
					name={avatarName}
					control={control}
					render={({ field }) => (
						<input
							type='file'
							id={avatarName}
							accept='image/*'
							className={styles.avatarInput}
							onChange={e => {
								const file = e.target.files?.[0] || null
								field.onChange(file)
							}}
						/>
					)}
				/>
				{errorAvatar && <span className={styles.error}>{errorAvatar}</span>}
			</label>

			<div className={styles.nameField}>
				<div className={styles.nameContainer}>
					<h1 className={styles.profileName}>{currentName}</h1>
					<button onClick={openNameModal}>
						<Image
							src={
								!isDarkMode
									? '/icons/forChatLIst/light-rename.png'
									: '/icons/forChatLIst/rename.png'
							}
							alt='Edit name'
							width={40}
							height={40}
						/>
					</button>
				</div>
			</div>
			<CSSTransition
				in={isNameModalOpen}
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
				<ChangeNameModal
					modalRef={modalRef}
					closeModal={closeNameModal}
					isNameModalClosing={false}
				/>
			</CSSTransition>
		</div>
	)
}
