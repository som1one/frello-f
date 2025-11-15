import { axiosWithAuth } from '@/api/interceptors'

interface WeightHistoryItem {
	date: string
	weight: number
}

export const getWeightHistory = async () => {
	const response =
		await axiosWithAuth.get<WeightHistoryItem[]>('/weight-history')
	return response.data
}

export const addToWeightHistory = async (weight: number) => {
	const response = await axiosWithAuth.post<WeightHistoryItem>(
		'/weight-history/weight',
		{ weight }
	)
	return response.data
}
