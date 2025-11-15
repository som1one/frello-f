import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import { axiosWithAuth } from '@/api/interceptors'

import { CaloriesHistoryItem } from '../types'

import { getWeightHistory } from '@/app/components/screens/app/settings/components/WeightTracker/model'

// Интерфейс для ошибки
interface ServerError {
	message: string
	code?: number
}

interface WeightHistoryItem {
	date: string
	weight: number
}

// Функция для получения истории калорий
export const getCaloriesHistory = async (): Promise<CaloriesHistoryItem[]> => {
	const response = await axiosWithAuth.get<CaloriesHistoryItem[]>(
		'/consumed-meal/calories-history'
	)
	return response.data
}

// Хук для использования useQuery
export const useCaloriesHistory = () => {
	return useQuery<CaloriesHistoryItem[], AxiosError<ServerError>>({
		queryKey: ['calories-history'],
		queryFn: getCaloriesHistory,
		staleTime: 5 * 60 * 1000,
		retry: 1
	})
}

export const useWeightHistory = () => {
	return useQuery<WeightHistoryItem[], AxiosError<ServerError>>({
		queryKey: ['weight-history'],
		queryFn: getWeightHistory,
		staleTime: 5 * 60 * 1000,
		retry: 1
	})
}
