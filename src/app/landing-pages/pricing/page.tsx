import type { Metadata } from 'next'
import React from 'react'

// import { Pricing } from '@/components/screens/pagesForLanding/pricing/Pricing'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Тарифы',
	...NO_INDEX_PAGE
}

export default function PricingPage() {
	return (
		<div>
			{/* <Pricing /> */}
		</div>
	)
}
