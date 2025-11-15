export enum EnumTokens {
	'ACCESS_TOKEN' = 'accessToken',
	'REFRESH_TOKEN' = 'refreshToken'
}

export const getAccessToken = () => {
	const cookies = document.cookie.split('; ').reduce(
		(acc, cookie) => {
			const [name, value] = cookie.split('=')
			acc[name] = value
			return acc
		},
		{} as Record<string, string>
	)
	const accessToken =
		typeof window !== 'undefined'
			? localStorage.getItem(EnumTokens.ACCESS_TOKEN)
			: null
	return accessToken || cookies['accessToken'] || null
}

export const getRefreshToken = () => {
	const refreshToken =
		typeof window !== 'undefined'
			? localStorage.getItem(EnumTokens.REFRESH_TOKEN)
			: null
	return refreshToken || null
}

export const saveTokenStorage = (accessToken: string) => {
	try {
		const payload = JSON.parse(atob(accessToken.split('.')[1]))
		if (payload && payload.exp && payload.iat && typeof payload === 'object') {
			const expiresIn = payload.exp - payload.iat
			if (expiresIn > 86400) {
				return
			}
		}
	} catch (e) {
		console.error(e)
	}
	if (typeof window !== 'undefined') {
		localStorage.setItem(EnumTokens.ACCESS_TOKEN, accessToken)
	}
}

export const saveRefreshTokenStorage = (refreshToken: string) => {
	if (typeof window !== 'undefined') {
		localStorage.setItem(EnumTokens.REFRESH_TOKEN, refreshToken)
	}
}

export const removeFromStorage = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(EnumTokens.ACCESS_TOKEN)
	}
}

export const removeRefreshTokenFromStorage = () => {
	if (typeof window !== 'undefined') {
		localStorage.removeItem(EnumTokens.REFRESH_TOKEN)
	}
}
