import cn from 'classnames'
import { useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'

import { useLockBodyScroll } from '@/hooks/useLockBodyScroll'

import styles from './SettingsSuccessModal.module.scss'

interface SettingsSuccessModalProps {
    closeModal: () => void
}

export const SettingsSuccessModal = ({
    closeModal
}: SettingsSuccessModalProps) => {
    const router = useRouter()
    useLockBodyScroll(true)

    const handleGoToChat = () => {
        router.push('/chat')
    }

    const modalContent = (
        <div
            className={styles.modalBackdrop}
        >
            <div
                className={styles.modalContent}
                onClick={e => e.stopPropagation()}
            >
                <button
                    className={styles.closeButton}
                    onClick={closeModal}
                    aria-label='Закрыть'
                    type='button'
                >
                    ×
                </button>
                <div className='flex flex-col items-center gap-4 text-center'>
                    <div className={styles.iconWrapper}>
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="12" cy="12" r="10" fill="#4CAF50" />
                            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                    <h2 className={styles.title}>
                        Настройки успешно сохранены
                    </h2>
                    <p className={styles.text}>
                        Теперь вы можете перейти в чат и продолжить пользоваться
                    </p>
                </div>
                <div className={styles.modalActions}>
                    <button
                        type='button'
                        className={styles.buttonShaded}
                        onClick={handleGoToChat}
                    >
                        Перейти в чат
                    </button>
                </div>
            </div>
        </div>
    )

    // Check if document is available (client-side)
    if (typeof document === 'undefined') return null

    return createPortal(modalContent, document.body)
}
