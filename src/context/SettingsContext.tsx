'use client'

import { getUserSettings, updateUserSettings } from '@/entities/settings'
import React, { createContext, useContext, useEffect, useState } from 'react'

const SettingsContext = createContext({
	settings: null,
	setSettings: (s: any) => {},
	refreshSettings: async () => {},
	saveSettings: async (s: any) => {}
})

export const SettingsProvider = ({
	children
}: {
	children: React.ReactNode
}) => {
	const [settings, setSettings] = useState<any>(null)

	const refreshSettings = async () => {
		const data = await getUserSettings()
		setSettings(data)
	}

	const saveSettings = async (newSettings: any) => {
		await updateUserSettings(newSettings)
		console.log('newSettings', newSettings)
		await refreshSettings()
	}

	useEffect(() => {
		refreshSettings()
	}, [])

	return (
		<SettingsContext.Provider
			value={{ settings, setSettings, refreshSettings, saveSettings }}
		>
			{children}
		</SettingsContext.Provider>
	)
}
export const useSettings = () => useContext(SettingsContext)
