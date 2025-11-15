// hooks/useSettings.ts
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { SettingsContextType } from './settings.types'
import {
	UserSettings,
	getUserSettings,
	updateUserSettings
} from '@/entities/settings'

export const useSettings = (): SettingsContextType => {
	const queryClient = useQueryClient()

	// Загрузка настроек
	const { data, error } = useQuery<UserSettings, Error>({
		queryKey: ['settings'],
		queryFn: async () => {
			console.log('useQuery: Fetching settings...')
			const response = await getUserSettings()
			console.log(
				'useQuery: Settings fetched',
				JSON.stringify(response, null, 2)
			)
			return response
		},
		staleTime: 5 * 60 * 1000,
		gcTime: 10 * 60 * 1000,
		refetchOnWindowFocus: false
	})

	// Сохранение настроек
	const { mutateAsync: saveSettings } = useMutation({
		mutationFn: updateUserSettings,
		onSuccess: () => {
			console.log('useSettings: Settings updated, invalidating cache')
			queryClient.invalidateQueries({ queryKey: ['settings'] })
		}
	})

	// Обновление настроек
	const refreshSettings = () => {
		console.log('useSettings: Refreshing settings...')
		queryClient.invalidateQueries({ queryKey: ['settings'] })
	}

	if (error) {
		console.error('Failed to load settings:', error?.message)
	}

	const settings = data ?? null

	return { settings, refreshSettings, saveSettings }
}
