import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
	deleteDishFromFavorite,
	fetchDishes
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
		mutationFn: deleteDishFromFavorite,
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dishes'] })
	})

	return {
		dishesError,
		dishes,
		isDishesLoading,
		deleteDish
	}
}
