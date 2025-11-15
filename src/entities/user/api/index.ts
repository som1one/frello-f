import { axiosWithAuth } from '@/api/interceptors'

import { ChangePasswordDto } from '../types'

export const changeUserPassword = async ({
	currentPassword,
	newPassword
}: ChangePasswordDto) => {
	const res = await axiosWithAuth.put('/user/change-password', {
		currentPassword,
		newPassword
	})
	return res.data
}
