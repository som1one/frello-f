import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import { NewMealPlans } from '@/app/components/screens/app/mealPlans/NewMealPlans'

export const metadata: Metadata = {
	title: 'План питания',
	...NO_INDEX_PAGE
}

export default function Page() {
	return <NewMealPlans />
}
