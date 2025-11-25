import {
	MutableRefObject,
	useCallback,
	useEffect,
	useRef,
	useState
} from 'react'

export const useTabsScroll = (
	tabs: string[],
	activeTab: number,
	setActiveTab: (i: number) => void
) => {
	const containerRef = useRef<HTMLDivElement>(
		null
	) as MutableRefObject<HTMLDivElement | null>
	const tabRefs = useRef<(HTMLButtonElement | null)[]>([]) as MutableRefObject<
		(HTMLButtonElement | null)[]
	>
	const [bg, setBg] = useState({ width: 0, height: 0, offsetLeft: 0 })

	const updateBg = useCallback(() => {
		const el = tabRefs.current[activeTab]
		const container = containerRef.current
		if (!el || !container) return

		setBg({
			width: el.offsetWidth,
			height: el.offsetHeight,
			offsetLeft: el.offsetLeft - container.scrollLeft // всегда актуально
		})
	}, [activeTab])

	useEffect(() => {
		const el = tabRefs.current[activeTab]
		if (!el) return

		setBg({
			width: el.offsetWidth,
			height: el.offsetHeight,
			offsetLeft: el.offsetLeft // Не вычитаем scrollLeft, так как фон внутри скролл-контейнера
		})
	}, [activeTab])

	const scrollToTab = useCallback(
		(index: number) => {
			const container = containerRef.current
			if (!container || index === activeTab) return

			const targetEl = tabRefs.current[index]
			if (!targetEl) return

			setActiveTab(index)
			// Устанавливаем фон сразу на новую вкладку
			setBg({
				width: targetEl.offsetWidth,
				height: targetEl.offsetHeight,
				offsetLeft: targetEl.offsetLeft
			})

			// Скроллим контейнер, чтобы вкладка была по центру
			const rect = targetEl.getBoundingClientRect()
			const cRect = container.getBoundingClientRect()
			const targetScroll =
				rect.left -
				cRect.left +
				container.scrollLeft -
				container.clientWidth / 2 +
				rect.width / 2

			container.scrollTo({ left: targetScroll, behavior: 'smooth' })
		},
		[activeTab, setActiveTab]
	)

	// Стрелки
	const scrollPrev = () => scrollToTab(Math.max(0, activeTab - 1))
	const scrollNext = () => scrollToTab(Math.min(tabs.length - 1, activeTab + 1))

	const setContainerRef = useCallback((node: HTMLDivElement | null) => {
		containerRef.current = node
	}, [])

	const setTabRef = useCallback(
		(index: number) => (el: HTMLButtonElement | null) => {
			tabRefs.current[index] = el
		},
		[]
	)

	return {
		bg,
		scrollToTab,
		scrollPrev,
		scrollNext,
		setTabRef,
		setContainerRef
	}
}
