import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

import ForgotPassword from '../components/screens/auth/forgot-password'

export const metadata: Metadata = {
	title: 'Восстановление пароля',
	...NO_INDEX_PAGE
}

export default function ForgotPasswordPage() {
	return (
		<div>
			<ForgotPassword />
		</div>
	)
}
