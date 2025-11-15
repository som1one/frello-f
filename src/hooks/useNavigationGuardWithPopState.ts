// app/components/screens/app/settings/hooks/useNavigationGuardWithPopstate.ts
import { useNavigationGuard } from 'next-navigation-guard'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { usePrompt } from '@/hooks/usePrompt'

import { settingsDefaultValues } from '@/app/components/screens/app/settings/model/settingsDefaultValues'
import { mapUserSettingsToSettingsForm } from '@/feature/chat/model/settingsMapper'

interface NavigationGuardState {
	isModalOpen: boolean
	nextRoute: string | null
	setIsModalOpen: (open: boolean) => void
	setNextRoute: (route: string | null) => void
	handleDiscardChanges: () => void
	handleExitWithoutSaving: () => void
	handleSaveAndExit: () => Promise<void>
}

export const useNavigationGuardWithPopstate = (
	isDirty: boolean,
	reset: (values?: any) => void,
	settings: any,
	onSubmit: () => Promise<void>
): NavigationGuardState => {
	const router = useRouter()
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [nextRoute, setNextRoute] = useState<string | null>(null)
	const [resolveNavigation, setResolveNavigation] = useState<
		((allow: boolean) => void) | null
	>(null)

	// Предупреждение о несохранённых изменениях при закрытии вкладки
	usePrompt(isDirty)

	// Перехват кнопки "назад" через popstate
	useEffect(() => {
		if (!isDirty) return

		const handlePopState = () => {
			const targetUrl = window.location.pathname
			console.log(
				'useNavigationGuardWithPopstate: popstate intercepted',
				targetUrl
			)
			setNextRoute(targetUrl)
			setIsModalOpen(true)
			history.pushState(history.state, '', window.location.pathname)
			setResolveNavigation(() => (allow: boolean) => {
				if (allow && targetUrl !== window.location.pathname) {
					router.push(targetUrl)
				}
			})
		}

		window.addEventListener('popstate', handlePopState)

		return () => {
			window.removeEventListener('popstate', handlePopState)
		}
	}, [isDirty, router])

	// Перехват навигации через useNavigationGuard
	useNavigationGuard({
		enabled: isDirty,
		confirm: ({ to }) => {
			return new Promise(resolve => {
				console.log(
					'useNavigationGuardWithPopstate: navigation attempted to',
					to
				)
				setNextRoute(to)
				setIsModalOpen(true)
				setResolveNavigation(() => resolve)
			})
		}
	})

	const handleDiscardChanges = useCallback(() => {
		console.log('useNavigationGuardWithPopstate: discarding changes')
		reset(
			settings ? mapUserSettingsToSettingsForm(settings) : settingsDefaultValues
		)
		setIsModalOpen(false)
		if (nextRoute && nextRoute !== window.location.pathname) {
			console.log('useNavigationGuardWithPopstate: navigating to', nextRoute)
			router.push(nextRoute)
			resolveNavigation?.(true)
		} else {
			console.log(
				'useNavigationGuardWithPopstate: no navigation needed, staying on',
				window.location.pathname
			)
			resolveNavigation?.(false)
		}
	}, [nextRoute, reset, router, settings, resolveNavigation])

	const handleExitWithoutSaving = useCallback(() => {
		console.log('useNavigationGuardWithPopstate: exiting without saving')
		setIsModalOpen(false)
		if (nextRoute && nextRoute !== window.location.pathname) {
			console.log('useNavigationGuardWithPopstate: navigating to', nextRoute)
			router.push(nextRoute)
			resolveNavigation?.(true)
		} else {
			console.log(
				'useNavigationGuardWithPopstate: no navigation needed, staying on',
				window.location.pathname
			)
			resolveNavigation?.(false)
		}
	}, [nextRoute, router, resolveNavigation])

	const handleSaveAndExit = useCallback(async () => {
		console.log('useNavigationGuardWithPopstate: saving and exiting')
		await onSubmit()
		setIsModalOpen(false)
		if (nextRoute && nextRoute !== window.location.pathname) {
			console.log('useNavigationGuardWithPopstate: navigating to', nextRoute)
			router.push(nextRoute)
			resolveNavigation?.(true)
		} else {
			console.log(
				'useNavigationGuardWithPopstate: no navigation needed, staying on',
				window.location.pathname
			)
			resolveNavigation?.(false)
		}
	}, [nextRoute, router, onSubmit, resolveNavigation])

	return {
		isModalOpen,
		nextRoute,
		setIsModalOpen,
		setNextRoute,
		handleDiscardChanges,
		handleExitWithoutSaving,
		handleSaveAndExit
	}
}
