import { axiosWithAuth } from '@/api/interceptors'

export const fetchDishes = async (): Promise<any[]> => {
	const response = await axiosWithAuth.get('/dish/favorite/getAll')
	return response.data
}

export const toggleFavoriteDish = async (dishId?: number): Promise<void> => {
	if (!dishId) {
		return
	}
	const response = await axiosWithAuth.post(`/dish/favorite/toggle/${dishId}`)
	return response.data
}

export const deleteDishFromFavorite = async (dishId?: number) => {
	if (!dishId) {
		return
	}
	const response = await axiosWithAuth.delete(`/dish/${dishId}`)
	return response.data
}
