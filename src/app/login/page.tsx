import type { Metadata } from 'next'

import { Login } from '@/app/components/screens/auth/Login'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'


export const metadata: Metadata = {
	title: 'Вход',
	...NO_INDEX_PAGE
}

export default function LoginPage() {
	return (
		<div>
			<Login />
		</div>
	)
}
