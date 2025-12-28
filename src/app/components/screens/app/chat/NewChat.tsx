'use client'

import clsx from 'clsx'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

import useIsMobile from '@/hooks/useIsMobile'

import styles from './NewChat.module.scss'
import { ChatMessages } from './components/ChatMessages/ChatMessages'
import { ChatsControl } from './components/ChatsControl/ChatsControl'
import { LimitModal } from './components/LimitModal/LimitModal'
import Loading from '@/app/Loading'
import { FilledSettingsModal } from '@/app/components/screens/app/chat/components/FilledSettingsModal/FilledSettingsModal'
import { SmallBurgerMenu } from '@/app/components/screens/app/chat/components/SmallBurgerMenu/SmallBurgerMenu'
import { useTheme } from '@/context/ThemeContext'
import { useChat } from '@/feature/chat/model/useChat'
import { ModalWithTransition } from '@/shared/ui/ModalWithTransition/ModalWithTransition'

export const NewChat = () => {
	const searchParams = useSearchParams()
	const {
		chats: chatList,
		deleteChat,
		deleteAllChats,
		renameChat,
		addNewChat,
		isChatListLoading,
		activeChatId,
		messages,
		sendMessage,
		setActiveChatId,
		handleRegenerateMessage,
		isSendMessageLoading,
		isRegenerating,
		toggleFavorite,
		savePlanOrRecipe,
		isLimitModalOpen,
		setIsLimitModalOpen,
		isSettingsFilled,
		retryLastMessage,
		error,
		limitType
	} = useChat()
	const isMobile = useIsMobile(1045)
	const { isDarkMode } = useTheme()
	const [isSettingsModalOpen, setIsSettingsModalOpen] =
		useState(!isSettingsFilled)
	const [isCollapsed, setIsCollapsed] = useState(false)
	const [isChatsControlOpen, setIsChatsControlOpen] = useState(false)

	const closeNameModal = () => setIsLimitModalOpen(false)
	const closeSettingsModal = () => setIsSettingsModalOpen(false)
	const toggleChatsControl = () => setIsChatsControlOpen(!isChatsControlOpen)

	const toggleChatList = () => {
		setIsCollapsed(!isCollapsed)
	}

	const handleOpenChat = (id: number | null) => {
		setActiveChatId(id)
		if (isMobile) {
			toggleChatsControl()
		}
	}

	const handleAddNewChat = async () => {
		await addNewChat()
		if (isMobile) {
			setIsChatsControlOpen(false)
		}
	}

	useEffect(() => {
		setIsSettingsModalOpen(!isSettingsFilled)
	}, [isSettingsFilled])

	// Auto-send message from query parameter
	useEffect(() => {
		const message = searchParams.get('message')
		if (message && activeChatId && !isSendMessageLoading) {
			sendMessage(message)
			// Clear query parameter after sending
			window.history.replaceState({}, '', '/chat')
		}
	}, [searchParams, activeChatId, sendMessage, isSendMessageLoading])

	if (isChatListLoading) {
		return <Loading />
	}

	return (
		<div className={styles.chatContainer}>
			{isMobile && (
				<SmallBurgerMenu
					isChatListOpen={isChatsControlOpen}
					toggleChat={toggleChatsControl}
					isDarkMode={isDarkMode}
				/>
			)}
			{isMobile ? (
				<ModalWithTransition isOpen={isChatsControlOpen}>
					<ChatsControl
						isDarkMode={isDarkMode}
						chatList={chatList}
						addNewChat={handleAddNewChat}
						isCollapsed={false}
						toggleChatList={toggleChatList}
						deleteChat={deleteChat}
						deleteAllChats={deleteAllChats}
						setActiveChat={handleOpenChat}
						renameChat={renameChat}
						activeChatId={activeChatId}
					/>
				</ModalWithTransition>
			) : (
				<ChatsControl
					isDarkMode={isDarkMode}
					chatList={chatList}
					addNewChat={handleAddNewChat}
					isCollapsed={isCollapsed}
					toggleChatList={toggleChatList}
					deleteChat={deleteChat}
					deleteAllChats={deleteAllChats}
					setActiveChat={setActiveChatId}
					renameChat={renameChat}
					activeChatId={activeChatId}
				/>
			)}
			{activeChatId === null && chatList.length > 0 && (
				<p className='font-bold text-xl text-center mx-auto my-auto w-full'>
					Выберите чат для общения
				</p>
			)}
			{activeChatId === null && chatList.length === 0 && (
				<div className='font-bold text-xl text-center mx-auto my-auto w-full'>
					<p>Начните общение с ассистентом</p>
					<button
						className={clsx(isCollapsed ? styles.hidden : styles.plusButton)}
						onClick={handleAddNewChat}
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
			)}
			<ChatMessages
				isDarkMode={isDarkMode}
				isCollapsed={isCollapsed}
				activeChatId={activeChatId}
				chatMessages={messages}
				sendMessage={sendMessage}
				handleRegenerateMessage={handleRegenerateMessage}
				isSendMessageLoading={isSendMessageLoading}
				isRegenerating={isRegenerating}
				toggleFavorite={toggleFavorite}
				savePlanOrRecipe={savePlanOrRecipe}
				retryLastMessage={retryLastMessage}
				error={error}
			/>

			<ModalWithTransition isOpen={isLimitModalOpen}>
				<LimitModal
					closeModal={closeNameModal}
					isNameModalClosing={isLimitModalOpen}
					limitType={limitType}
				/>
			</ModalWithTransition>

			<ModalWithTransition isOpen={isSettingsModalOpen}>
				<FilledSettingsModal
					closeModal={closeSettingsModal}
					isNameModalClosing={isSettingsModalOpen}
				/>
			</ModalWithTransition>
		</div>
	)
}
