import cn from 'classnames'
import Image from 'next/image'
import { useRef, useState } from 'react'

import RenameChatModal from '../../../renameChatModal/RenameChatModal'

import styles from './ChatItem.module.scss'
import { Chat } from '@/feature/chat/model/chat.types'

interface PropTypes {
	chat: Chat
	isCollapsed: boolean
	isDarkMode: boolean
	renameChat: (chatId: number, newChatTitle: string) => void
	setActiveChat: (chatId: number) => void
	setDeleteChatId: (chatId: number) => void
	setConfirmModal: (modalName: string) => void
	activeChatId: number | null
}

export const ChatItem = ({
	chat,
	isCollapsed,
	isDarkMode,
	renameChat,
	setActiveChat,
	setDeleteChatId,
	setConfirmModal,
	activeChatId
}: PropTypes) => {
	const [isRenaming, setIsRenaming] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const iconsRef = useRef<HTMLDivElement | null>(null)

	const handleRename = async (newChatTitle: string) => {
		await renameChat(chat.id, newChatTitle)
		// Задержка перед закрытием модалки, чтобы избежать закрытия из-за всплытия событий
		setTimeout(() => {
			setIsRenaming(false)
		}, 100)
	}

	const handleCancelRename = () => {
		setIsRenaming(false)
	}

	const handleChatClick = () => {
		setActiveChat(chat.id)
		setIsMenuOpen(false)
	}

	return (
		<div
			key={chat.id}
			className={cn(
				styles.chatItem,
				{ [styles.hidden]: isCollapsed },
				{ [styles.dotsOpen]: isMenuOpen },
				{ [styles.lightChatItem]: !isDarkMode },
				{ [styles.active]: chat.id === activeChatId }
			)}
			onClick={handleChatClick}
		>
			<div>
				<h1 className={styles.chatName}>{chat.title}</h1>
			</div>

			{isMenuOpen ? (
				<div
					className={styles.iconContainer}
					ref={iconsRef}
				>
					<Image
						src={
							!isDarkMode
								? `${'/icons/forChatLIst/light-rename.png'} `
								: `${'/icons/forChatLIst/rename.png'} `
						}
						alt='Rename chat'
						className={styles.chatItemIcon}
						width={40}
						height={40}
						onClick={(e) => {
							e.stopPropagation()
							setIsRenaming(true)
						}}
					/>
					<Image
						src={
							!isDarkMode
								? `${'/icons/forChatLIst/light-del.png'} `
								: `${'/icons/forChatLIst/delete.png'} `
						}
						alt='DeleteChat'
						className={styles.chatItemIcon}
						width={40}
						height={40}
						onClick={e => {
							e.stopPropagation()
							setDeleteChatId(chat.id)
							setConfirmModal('one')
						}}
					/>
				</div>
			) : (
				<Image
					src={
						!isDarkMode
							? `${'/icons/dots/light-3dots.png'} `
							: `${'/icons/dots/3dots.png'} `
					}
					alt='Chat Menu'
					className={styles.chatItemIcon}
					width={22}
					height={6}
					onClick={e => {
						e.stopPropagation()
						setIsMenuOpen(true)
					}}
				/>
			)}

			{isRenaming && (
				<RenameChatModal
					isVisible={isRenaming}
					currentChatName={chat.title}
					onRename={handleRename}
					onCancel={handleCancelRename}
				/>
			)}
		</div>
	)
}
