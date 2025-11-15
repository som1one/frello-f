import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { ResetPassword } from '../components/screens/auth/reset-password'

export const metadata: Metadata = {
	title: 'Восстановление пароля',
	...NO_INDEX_PAGE
}

export default function ResetPasswordPage() {
	return (
		<div>
			<ResetPassword />
		</div>
	)
}
