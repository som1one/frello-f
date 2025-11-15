import cn from 'classnames'
import Image from 'next/image'
import { useState } from 'react'

import ConfirmationDialog from '../../confirmationDialog/ConfirmationDialog'
import OneChatToDeleteDialog from '../../oneChatToDeleteDialog/OneChatToDeleteDialog'

import { ChatItem } from './ChatItem/ChatItem'
import styles from './ChatsControl.module.scss'
import { Chat } from '@/feature/chat/model/chat.types'

interface PropTypes {
	isCollapsed: boolean
	addNewChat: () => void
	isDarkMode: boolean
	chatList: Chat[]
	toggleChatList: () => void
	deleteChat: (chatId: number) => void
	deleteAllChats: () => void
	setActiveChat: (chatId: number) => void
	renameChat: (chatId: number, newChatTitle: string) => void
	activeChatId: number | null
}

export const ChatsControl = ({
	isCollapsed,
	addNewChat,
	isDarkMode,
	chatList,
	toggleChatList,
	deleteChat,
	deleteAllChats,
	setActiveChat,
	renameChat,
	activeChatId
}: PropTypes) => {
	const [deleteChatId, setDeleteChatId] = useState<number | null>(null)
	const [confirmModal, setConfirmModal] = useState<string | null>(null)

	const handleConfirmDelete = () => {
		if (deleteChatId !== null) {
			deleteChat(deleteChatId)
			setDeleteChatId(null)
			setConfirmModal(null)
		}
	}

	return (
		<div className={cn(styles.chatList, isCollapsed && styles.collapsed)}>
			<div
				className={cn(
					styles.chatListTitleContainer,
					isCollapsed ? styles.hidden : styles.showChatListTitleContainer
				)}
			>
				<h1 className={cn(isCollapsed ? styles.hidden : styles.chatListTitle)}>
					Чаты
				</h1>
				<button
					className={cn(isCollapsed ? styles.hidden : styles.plusButton)}
					onClick={addNewChat}
				>
					<Image
						src={
							!isDarkMode
								? `${'/icons/plus/light-plus.png'} `
								: `${'/icons/plus/plus.png'} `
						}
						alt='Add'
						width={35}
						height={35}
					/>
				</button>
			</div>
			<div className={styles.chatListItemsContainer}>
				{chatList.length === 0 && !isCollapsed ? (
					<div className={styles.noChatsMessage}>
						<p>Еще нет чатов</p>
					</div>
				) : (
					chatList
						.slice()
						.sort((a, b) => a.id - b.id)
						.map(chat => (
							<ChatItem
								isCollapsed={isCollapsed}
								setActiveChat={setActiveChat}
								renameChat={renameChat}
								chat={chat}
								isDarkMode={isDarkMode}
								setDeleteChatId={setDeleteChatId}
								setConfirmModal={setConfirmModal}
								key={chat.id}
								activeChatId={activeChatId}
							/>
						))
				)}
			</div>

			{chatList.length > 0 && (
				<button
					className={`${styles.deleteAllButton} ${!isDarkMode ? styles.lightDeleteAllButton : ''} ${
						!isCollapsed ? styles.showDeleteAllButton : ''
					}`}
					onClick={() => setConfirmModal('all')}
				>
					Удалить все чаты
				</button>
			)}

			<button
				className={isCollapsed ? styles.collapsedArrowIcon : styles.arrowIcon}
				onClick={toggleChatList}
			>
				<Image
					src={`${
						isCollapsed
							? !isDarkMode
								? '/icons/arrows/light-right.png'
								: '/icons/arrows/right.png'
							: !isDarkMode
								? '/icons/arrows/light-left.png'
								: '/icons/arrows/left.png'
					}`}
					alt='Toggle'
					width={20}
					height={20}
				/>
			</button>
			<ConfirmationDialog
				isVisible={confirmModal === 'all'}
				onConfirm={deleteAllChats}
				onCancel={() => setConfirmModal(null)}
			/>
			<OneChatToDeleteDialog
				isVisible={confirmModal === 'one'}
				onConfirm={handleConfirmDelete}
				onCancel={() => setConfirmModal(null)}
			/>
		</div>
	)
}
