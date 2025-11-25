import axios, { type CreateAxiosDefaults } from 'axios';

import { getAccessToken } from '@/services/auth-token.service';
import { authService } from '@/services/auth.service';

const options: CreateAxiosDefaults = {
	baseURL: 'https://frello.ru/api',
	headers: {
		'Content-Type': 'application/json',
	},
};

const axiosClassic = axios.create(options);

const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use(config => {
	const accessToken = getAccessToken();
	console.log('Request URL:', config.url);
	console.log('Request body:', JSON.stringify(config.data, null, 2));

	if (config.headers && accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`;
	}

	return config;
});

axiosWithAuth.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			originalRequest &&
			!originalRequest._isRetry
		) {
			// Проверяем, является ли ошибка "Email не подтверждён"
			if (error.response.data.message === 'Email не подтверждён') {
				console.log('Email not verified, redirecting to /verify-email');
				// Перенаправляем на страницу верификации
				if (typeof window !== 'undefined') {
					// Извлекаем email из тела запроса и сохраняем в localStorage
					try {
						const requestData = originalRequest.data ? JSON.parse(originalRequest.data) : null;
						if (requestData?.email) {
							localStorage.setItem('email', requestData.email);
							console.log('Saved email to localStorage:', requestData.email);
						}
					} catch (e) {
						console.error('Failed to parse request data:', e);
					}

					window.location.href = '/verify-email';
				}
				throw new Error('Email не подтверждён');
			}

			// Обрабатываем случай с истёкшим токеном
			originalRequest._isRetry = true;
			try {
				const response = await authService.getNewTokens();
				localStorage.setItem('accessToken', response.accessToken);
				localStorage.setItem('refreshToken', response.refreshToken);
				return axiosWithAuth.request(originalRequest);
			} catch (e) {
				console.error('Не удалось обновить токен', e);
				// Очищаем токены и перенаправляем на логин
				if (typeof window !== 'undefined') {
					localStorage.removeItem('accessToken');
					localStorage.removeItem('refreshToken');
					window.location.href = '/login';
				}
				throw new Error('Не удалось обновить токен');
			}
		}

		throw error;
	}
);

export { axiosClassic, axiosWithAuth };