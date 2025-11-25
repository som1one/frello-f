import Image from 'next/image'
import React from 'react'

import styles from './HelpUsImprove.module.scss'
import { TitleWithLine } from '@/app/components/TitleWithLine/TitleWithLine'

export function HelpUsImprove() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <TitleWithLine title="Помогите нам стать лучше" />

                <p className={styles.description}>
                    Расскажите, что вам понравилось, а что не понравилось — и что, по-вашему, можно улучшить.
                    <br />
                    Ваши отзывы помогают нам исправлять баги, добавлять полезные функции.
                </p>

                <p className={styles.description}>
                    Вы можете написать нам во ВКонтакте или в Telegram — выберите удобный&nbsp;мессенджер.
                    <br />
                    А также задать любой вопрос или предложить сотрудничество.
                </p>

                <div className={styles.emailBlock}>
                    Почта: <a href="mailto:info@frello.ru">info@frello.ru</a>
                </div>

                <div className={styles.buttons}>
                    <a href="https://t.me/frelloaimanager" target="_blank" rel="noopener noreferrer" className={styles.telegramButton}>
                        <div className={styles.iconWrapper}>
                            <Image
                                src="/logo/Telegram_Messenger.png"
                                alt="Telegram"
                                width={24}
                                height={24}
                                className={styles.icon}
                            />
                        </div>
                        <span>Написать в Telegram</span>
                    </a>

                    <a href="https://vk.com/frelloaimanager" target="_blank" rel="noopener noreferrer" className={styles.vkButton}>
                        <div className={styles.vkIconWrapper}>
                            <Image
                                src="/logo/pngimg.com - vkontakte_PNG3.png"
                                alt="VK"
                                width={50}
                                height={50}
                                className={styles.icon}
                            />
                        </div>
                        <span>Написать во ВКонтакте</span>
                    </a>
                </div>
            </div>
        </div>
    )
}
