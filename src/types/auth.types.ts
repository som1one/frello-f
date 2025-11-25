export interface AuthState {
	showPassword: boolean
	isSignIn: boolean
}

export interface IAuthForm {
	email: string
	password: string
}

export interface IUser {
	id: number
	name?: string
	email: string

	isActivated: boolean

	workInterval?: number
	breakInterval?: number
	intervalsCount?: number
}


export interface IAuthResponse {
	accessToken: string
	refreshToken?: string
	user: IUser
}

export type TypeUserForm = Omit<IUser, 'id'> & { password?: string }
