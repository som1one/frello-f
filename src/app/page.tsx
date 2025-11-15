import type { Metadata } from 'next'

import './globals.scss'
import { Landing } from '@/app/(landing)/Landing'

export const metadata: Metadata = {
	title: 'Frello | AI помощник в сфере питания',
	description:
		'Наслаждайтесь вкусными и полезными блюдами, легко достигая желаемого результата.'
}

export default function LandingPage() {
	return (
		<div className='landingBackground'>
			<Landing />
		</div>
	)
}
