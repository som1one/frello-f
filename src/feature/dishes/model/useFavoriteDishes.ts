import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	fetchDishes,
	toggleFavoriteDish
} from '@/feature/dishes/model/dishes-api'

export const useFavoriteDishes = () => {
	const queryClient = useQueryClient()
	const {
		data: dishes = [],
		error: dishesError,
		isLoading: isDishesLoading
	} = useQuery<any[], Error>({
		queryKey: ['dishes'],
		queryFn: fetchDishes
	})

	const { mutate: deleteDish } = useMutation({
		mutationFn: toggleFavoriteDish, // Use toggle instead of delete to preserve dish
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['dishes'] })
			queryClient.invalidateQueries({ queryKey: ['plans'] }) // Update meal plans
		}
	})

	return {
		dishesError,
		dishes,
		isDishesLoading,
		deleteDish
	}
}
