import { axiosWithAuth } from '@/api/interceptors'

import { UserSettings } from '../types'

export const getUserSettings = async () => {
	console.log('getUserSettings: Sending request to /user/settings')
	const res = await axiosWithAuth.get('/user/settings')
	console.log(
		'getUserSettings: Response received',
		JSON.stringify(res.data, null, 2)
	)
	return res.data
}

export const updateUserSettings = async (settings: Partial<UserSettings>) => {
	console.log('settings to update', settings)
	const res = await axiosWithAuth.put('/user/settings', { settings })
	console.log('updateUserSettings res', res.data)
	return res.data
}

