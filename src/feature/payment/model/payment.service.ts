import { axiosWithAuth } from '@/api/interceptors'

export interface CreatePaymentResponse {
	redirectUrl: string
}

export const createPayment = async (
	planId: number
): Promise<CreatePaymentResponse> => {
	const response = await axiosWithAuth.post<CreatePaymentResponse>(
		'/payments/create',
		{ planId }
	)
	return response.data
}

