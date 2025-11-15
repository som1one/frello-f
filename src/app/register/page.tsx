import type { Metadata } from 'next'

import { Register } from '@/app/components/screens/auth/Register'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'


export const metadata: Metadata = {
	title: 'Регистрация',
	...NO_INDEX_PAGE
}

export default function RegisterPage() {
	return (
		<div>
			<Register />
		</div>
	)
}
