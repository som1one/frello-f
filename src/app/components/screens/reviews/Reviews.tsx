'use client'

import Image from 'next/image'
import { FC, useState } from 'react'
import styles from './Reviews.module.scss'
import { TitleWithLine } from '@/app/components/TitleWithLine/TitleWithLine'

const reviews = [
    {
        id: 1,
        name: 'Елена',
        age: '35 лет',
        role: 'занятая мама троих детей',
        text: 'Я перепробовала десятки диет, но вес всё равно возвращался. Здесь мне составили план питания, который идеально подошёл под меня — с учётом возраста, любимых блюд и семейного бюджета. Продукты простые, без лишних трат, а блюда такие вкусные, что моя семья теперь ест по моему рациону. За 6 месяцев я сбросила 20 кг — это не просто цифра, это новая жизнь: больше энергии, нет головных болей, нормализовалось давление. Сервис сам ведёт график моего веса и калорий, я вижу прогресс каждый день. Спасибо вам огромное!',
        image: '/images/otzivi/photo_2022-12-07_23-59-54.jpg'
    },
    {
        id: 2,
        name: 'Марина',
        age: '41 год',
        role: 'преподаватель',
        text: 'Никогда не думала, что похудение может быть таким простым и приятным. Сервис составил план питания полностью под меня: вкусно, быстро, без стресса и с учётом моего ограниченного бюджета. Уже через месяц минус 6 кг, энергия прибавилась, и я наконец чувствую лёгкость и уверенность в себе. При этом готовить для себя и семьи стало намного проще и экономнее!',
        image: '/images/otzivi/photo_2022-10-30_16-27-40.jpg'
    },
    {
        id: 3,
        name: 'Анна',
        age: '53 года',
        role: 'бухгалтер',
        text: 'После 50 лет думала, что мой метаболизм на пенсию ушел. А вот и нет! Оказалось, сервис подобрал мне такое питание, что и организм взбодрился, и я сама ожила. Минус 15 кг, море энергии, готовлю за 15 минут. Для бухгалтера, чьё главное движение — от стула до кофемашины, это прорыв!',
        image: '/images/otzivi/photo_2022-05-04_13-51-41.jpg'
    },
    {
        id: 4,
        name: 'Татьяна',
        age: '38 лет',
        role: 'учитель',
        text: 'При моей учительской зарплате слово «диета» всегда ассоциировалось с дорогими продуктами и сложными рецептами. Оказалось, всё вранье! Этот сервис показал, что полезное может быть дешевле привычных полуфабрикатов. Мне подобрали план на основе простых продуктов с рынка, а рецепты такие легкие, что даже мой муж справляется. Перестали выбрасывать еду, потому что все продумано до мелочей. Результат: минус 8 кг за месяц, а бюджет на продукты сократился на 15%. Всем настоятельно советую!',
        image: '/images/otzivi/photo_2022-03-13_20-24-00.jpg'
    },
    {
        id: 5,
        name: 'Дмитрий',
        age: '21 год',
        role: 'программист',
        text: 'Я в восторге от этого сервиса! Сразу составили идеальный план питания под мою цель — набор мышечной массы, при этом учли мой бюджет: продукты доступные и без лишних затрат на дорогие добавки. Раньше тратил кучу времени на подсчёт БЖУ и искал в интернете, что есть после тренировок. Теперь просто открываю план, и всё готово: чётко расписано, сколько белка, углеводов и жиров. За 2 месяца прибавил +4 кг массы без головной боли. С этим сервисом тренировки и питание наконец работают вместе!',
        image: '/images/otzivi/image_2025-11-09_13-37-31 (3)-Photoroom.png'
    },
    {
        id: 6,
        name: 'Алексей',
        age: '39 лет',
        role: 'архитектор',
        text: 'Я всегда думал, что правильное питание для сушки — это скучная рутина и постоянный голод. FrelloAI составил мне план с вкусными блюдами и быстрыми вариантами, которые идеально подходят под мои тренировки и мою привычку готовить быстро и с пользой. За месяц похудел на 5,5 кг жира без потери силы, и теперь питание приносит результат и удовольствие одновременно.',
        image: '/images/otzivi/image_2025-11-09_13-37-31 (2)-Photoroom.jpg'
    },
    {
        id: 7,
        name: 'Ирина',
        age: '28 лет',
        role: 'психолог',
        text: 'Мне важно, чтобы рацион был именно под меня. Сервис учёл мой вес, привычки и привычку перекусывать по вечерам — теперь у меня рацион, который легко готовить и который действительно заряжает энергией. Всё продумано так, чтобы я могла готовить без стресса, даже когда времени совсем мало. Уже через 2 недели минус 5 кг — чувствую лёгкость, контроль над собой и больше энергии после работы!',
        image: '/images/otzivi/Group 1000004243.jpg'
    }
]

// Helper function to get image positioning class based on review ID
const getImageClass = (id: number) => {
    switch (id) {
        case 2: // photo_2022-10-30_16-27-40.jpg - Марина
            return `${styles.image} ${styles.imagePositionCenter}`
        case 3: // photo_2022-05-04_13-51-41.jpg - Анна
            return `${styles.image} ${styles.imagePositionLower}`
        case 4: // photo_2022-03-13_20-24-00.jpg - Татьяна
            return `${styles.image} ${styles.imageZoomOut}`
        case 5: // image_2025-11-09_13-37-31 (3)-Photoroom.png - Дмитрий
            return `${styles.image} ${styles.imagePositionTop}`
        default:
            return styles.image
    }
}

export const Reviews: FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % reviews.length)
    }

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length)
    }

    // Get reviews to display based on screen size
    const getVisibleReviews = () => {
        const visible = []
        const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768
        const count = isMobile ? 1 : 3

        for (let i = 0; i < count; i++) {
            visible.push(reviews[(currentIndex + i) % reviews.length])
        }
        return visible
    }

    return (
        <section className={styles.reviews} id="reviews">
            <div className={styles.container}>
                <div className={styles.header}>
                    <TitleWithLine title="Отзывы наших пользователей" />
                    <p className={styles.subtitle}>
                        Они были на вашем месте. Такие же люди, которые когда-то не верили,
                        что можно есть с удовольствием и прийти к телу мечты.
                        А теперь живут по-другому.
                    </p>
                </div>

                <div className={styles.carouselWrapper}>
                    <button
                        className={`${styles.arrow} ${styles.arrowLeft}`}
                        onClick={prevSlide}
                        aria-label="Previous reviews"
                    >
                        ‹
                    </button>

                    <div className={styles.carousel}>
                        {getVisibleReviews().map((review, index) => (
                            <div key={`${review.id}-${index}`} className={styles.card}>
                                <div className={styles.imageWrapper}>
                                    <Image
                                        src={review.image}
                                        alt={review.name}
                                        fill
                                        className={getImageClass(review.id)}
                                    />
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.stars}>
                                        {[...Array(5)].map((_, i) => (
                                            <span key={i} className={styles.star}>★</span>
                                        ))}
                                    </div>
                                    <p className={styles.text}>«{review.text}»</p>
                                    <div className={styles.author}>
                                        <div className={styles.name}>
                                            {review.name}, {review.age}
                                        </div>
                                        <div className={styles.role}>{review.role}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button
                        className={`${styles.arrow} ${styles.arrowRight}`}
                        onClick={nextSlide}
                        aria-label="Next reviews"
                    >
                        ›
                    </button>
                </div>
            </div>
        </section>
    )
}
