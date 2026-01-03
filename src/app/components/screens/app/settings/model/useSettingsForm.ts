import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useCallback, useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { addToWeightHistory } from '../components/WeightTracker/model'
import { SettingsForm } from '../model/Settings.interface'
import { settingsDefaultValues } from '../model/settingsDefaultValues'

import { updateSettingsFilled } from '@/feature/chat/model/chat.service'
import {
	getChangedFields,
	mapUserSettingsToSettingsForm
} from '@/feature/chat/model/settingsMapper'
import { useSettings } from '@/feature/chat/model/useSettings'

export const useSettingsForm = ({ onSuccess }: { onSuccess?: () => void } = {}) => {
	const { settings, saveSettings, refreshSettings } = useSettings()
	const queryClient = useQueryClient()
	const methods = useForm<SettingsForm>({
		defaultValues: settings
			? mapUserSettingsToSettingsForm(settings)
			: settingsDefaultValues,
		shouldUnregister: false
	})
	const {
		handleSubmit,
		reset,
		formState: { isDirty },
		unregister
	} = methods
	
	// Убираем поле currentProducts из формы при инициализации
	useEffect(() => {
		unregister('currentProducts')
	}, [unregister])
	const [isValidationModalOpen, setIsValidationModalOpen] = useState(false)
	const [missingFields, setMissingFields] = useState<string[]>([])

	const flexibleDayFrequency = methods.watch('flexibleDayFrequency.values')[0]

	useEffect(() => {
		if (flexibleDayFrequency === 'none') {
			methods.setValue('flexibleDayType.values', [], { shouldDirty: true })
			methods.setValue('flexibleDays.values', [], { shouldDirty: true })
		}
	}, [flexibleDayFrequency, methods.setValue])

	const updateSettingsFilledMutation = useMutation({
		mutationFn: async (filled: boolean) => {
			await updateSettingsFilled(filled)
		},
		onSuccess: () => {
			console.log('useSettingsForm: profileFilled set to true')
			queryClient.invalidateQueries({ queryKey: ['settings-fill'] })
		},
		onError: (error: any) => {
			console.error('Ошибка при обновлении profileFilled:', error)
		}
	})

	// Синхронизация defaultValues с settings
	useEffect(() => {
		if (settings && !isDirty) {
			console.log('useSettingsForm: resetting form with settings', settings)
			reset(mapUserSettingsToSettingsForm(settings))
		}
	}, [settings, reset])

	const submitHandler: SubmitHandler<SettingsForm> = useCallback(
		async data => {
			try {
				const changedFields = getChangedFields(data, settings)
				const requiredFields = {
					gender: data.gender !== null ? null : 'Пол',
					height: data.height != null ? null : 'Рост',
					weight: data.weight != null ? null : 'Вес',
					birthdate: data.birthdate ? null : 'Дата рождения',
					mealFrequency:
						data.mealFrequency != null ? null : 'Частота приёмов пищи',
					nutritionGoal: data.nutritionGoal !== null ? null : 'Цель по питанию',
					activityLevel: data.activityLevel?.values?.[0] ? null : 'Уровень активности'
				}
				if (data.weight && 'weight' in changedFields) {
					await addToWeightHistory(data.weight as number)
					queryClient.invalidateQueries({ queryKey: ['weight-history'] })
				}
				const missing = Object.values(requiredFields).filter(
					Boolean
				) as string[]
				if (missing.length > 0) {
					setMissingFields(missing)
					setIsValidationModalOpen(true)
					return
				}
				if (Object.keys(changedFields).length > 0) {
					await saveSettings(changedFields)
					const areRequiredFieldsFilled =
						data.gender !== null &&
						data.height != null &&
						data.weight != null &&
						data.birthdate &&
						data.mealFrequency != null &&
						data.nutritionGoal !== null &&
						data.activityLevel?.values?.[0]
					if (areRequiredFieldsFilled) {
						await updateSettingsFilledMutation.mutateAsync(true)
					}
					refreshSettings()
					reset(data, { keepValues: true })
					toast.success('Настройки успешно сохранены', { duration: 3000 })
					if (onSuccess) onSuccess()
					console.log('Отправлены изменённые поля:', changedFields)
				} else {
					toast.success('Настройки успешно сохранены', { duration: 3000 })
					if (onSuccess) onSuccess()
					console.log('Нет изменений для сохранения')
				}
			} catch (error) {
				console.error('Ошибка при сохранении настроек:', error)
			}
		},
		[settings, saveSettings, refreshSettings, reset, onSuccess]
	)

	return {
		methods,
		isDirty,
		onSubmit: handleSubmit(submitHandler),
		submitHandler,
		reset,
		settings,
		isValidationModalOpen,
		setIsValidationModalOpen,
		missingFields,
		flexibleDayFrequency
	}
}
