import { UserSettings } from '@/entities/settings'

export interface SettingsContextType {
	settings: UserSettings | null
	refreshSettings: () => void
	saveSettings: (newSettings: Partial<UserSettings>) => Promise<void>
}
