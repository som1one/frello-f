export enum EnumTokens {
    ACCESS_TOKEN = 'accessToken',
    REFRESH_TOKEN = 'refreshToken'
}

export const getAccessToken = () => {
    const accessToken =
        typeof window !== 'undefined'
            ? localStorage.getItem(EnumTokens.ACCESS_TOKEN)
            : null

    return accessToken || null
}

export const getRefreshToken = () => {
    const refreshToken =
        typeof window !== 'undefined'
            ? localStorage.getItem(EnumTokens.REFRESH_TOKEN)
            : null

    return refreshToken || null
}

export const saveTokenStorage = (accessToken: string) => {
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
