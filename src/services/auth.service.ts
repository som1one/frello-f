import { IAuthForm, IAuthResponse } from '@/types/auth.types'

import { axiosClassic } from '@/api/interceptors'

import {
	removeFromStorage,
	removeRefreshTokenFromStorage,
	saveRefreshTokenStorage,
	saveTokenStorage
} from './auth-token.service'

export const authService = {
	async main(type: 'login' | 'register', data: IAuthForm) {
		const response = await axiosClassic.post<IAuthResponse>(
			`/auth/${type}`,
			data
		)

		if (response.data.accessToken) {
			saveTokenStorage(response.data.accessToken)
		}
		if (response.data.refreshToken) {
			saveRefreshTokenStorage(response.data.refreshToken)
		}

		return response
	},

	async getNewTokens() {
		const refreshToken = localStorage.getItem('refreshToken')
		if (!refreshToken) throw new Error('No refresh token available')
		const response = await axiosClassic.post('/auth/login/access-token', {
			refreshToken
		})
		const { accessToken, refreshToken: newRefreshToken } = response.data
		localStorage.setItem('accessToken', accessToken)
		localStorage.setItem('refreshToken', newRefreshToken)
		return response.data
	},

	async logout() {
		try {
			const response = await axiosClassic.post<boolean>('/auth/logout')

			if (response.data) {
				removeFromStorage()
				removeRefreshTokenFromStorage()
			}

			return response
		} catch {
			throw new Error('Failed to log out. Please try again.')
		}
	},

	async verifyEmail(code: string, email: string | null) {
		try {
			if (!email) {
				throw Error('Email not provided')
			}
			const response = await axiosClassic.post<{
				accessToken: string
				message: string
			}>('/auth/verify-email', {
				email,
				code
			})
			localStorage.setItem('accessToken', response.data.accessToken)
			return response.data
		} catch {
			throw new Error('Failed to verify email. Please try again.')
		}
	},

	async resetPassword(email: string) {
		return axiosClassic.post('/auth/reset-password', { email })
	},

	async confirmResetPassword(token: string, password: string) {
		return axiosClassic.post('/auth/reset-password/confirm', {
			token,
			password
		})
	}
}
