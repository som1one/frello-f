'use client'

import clsx from 'clsx'
import { FormProvider } from 'react-hook-form'
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

import { useNavigationGuardWithPopstate } from '@/hooks/useNavigationGuardWithPopState'

import styles from './NewSettings.module.scss'
import { BirthdateField } from './components/BirthdateField/BirthdateField'
import { EmailAndPasswordSection } from './components/EmailAndPasswordSection/EmailAndPasswordSection'
import { ExitSettingsModal } from './components/ExitSettingsModal/ExitSettingsModal'
import { Field } from './components/Field/Field'
import { Form } from './components/Form/Form'
import { GenderTabs } from './components/GenderTabs/GenderTabs'
import { InputWithUnit } from './components/InputWithUnit/InputWithUnit'
import { FieldConfig, formFieldsConfig } from './model/formFieldsConfig'
import { flexibleDayFrequencyOptions, nutritionGoalOptions } from './model/options'
import { useSettingsForm } from './model/useSettingsForm'
import { Btn, ModalWithTransition } from '@/shared/ui'
import { ThemeToggle } from '@/app/components/ThemeToggle/ThemeToggle'
import { FlexibleDaysInfoModal } from './components/FlexibleDaysInfoModal/FlexibleDaysInfoModal'
import { SettingsSuccessModal } from './components/SettingsSuccessModal/SettingsSuccessModal'
// import { TextFieldWithModal } from './components/TextFieldWithModal/TextFieldWithModal' - не используется, поле currentProducts убрано


export default function NewSettings() {
	const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

	const {
		methods,
		isDirty,
		onSubmit,
		reset,
		submitHandler,
		settings,
		isValidationModalOpen,
		setIsValidationModalOpen,
		missingFields,
		flexibleDayFrequency
	} = useSettingsForm({ onSuccess: () => setIsSuccessModalOpen(true) })
	const {
		isModalOpen,
		handleDiscardChanges,
		handleExitWithoutSaving,
		handleSaveAndExit
	} = useNavigationGuardWithPopstate(isDirty, reset, settings, onSubmit)

	const [isFlexibleDaysModalOpen, setIsFlexibleDaysModalOpen] = useState(false)



	const multiSelectFields = formFieldsConfig.filter(
		(field): field is FieldConfig =>
			'type' in field &&
			field.type === 'multiSelect' &&
			field.name !== 'flexibleDayType' &&
			field.name !== 'flexibleDayType' &&
			field.name !== 'flexibleDays' &&
			field.name !== 'nutritionGoal' && // Exclude nutritionGoal - it's rendered separately
			field.name !== 'hasOven' // Exclude hasOven - it's rendered next to mealFrequency
	)
	const numberFields = formFieldsConfig.filter(
		(field): field is FieldConfig =>
			'type' in field &&
			field.type === 'number' &&
			field.name !== 'mealFrequency'
	)
	const mealFrequencyField = formFieldsConfig.find(
		(field): field is FieldConfig =>
			'type' in field &&
			field.type === 'number' &&
			field.name === 'mealFrequency'
	)
	const hasOvenField = formFieldsConfig.find(
		(field): field is FieldConfig =>
			'type' in field &&
			field.name === 'hasOven'
	)
	const activityLevelField = formFieldsConfig.find(
		(field): field is FieldConfig =>
			'type' in field &&
			field.name === 'activityLevel'
	)

	return (
		<>
			<FormProvider {...methods}>
				<Form onSubmit={methods.handleSubmit(submitHandler)}>
					<div className={styles.header}>
						<h2 className={styles.title}>Настройки</h2>
						<div className={styles.topButtonWrapper}>
							<button
								className={styles.startButton}
								type='submit'
							>
								Сохранить
							</button>
							<div className="md:hidden mt-3 flex justify-center">
								<ThemeToggle />
							</div>
						</div>
					</div>

					<div className='flex flex-col md:flex-row gap-2 w-full'>
						<div className={styles.section}>
							<div className={styles.personalInfoGrid}>
								{/* Left Column - Personal Data */}
								<div className={styles.leftColumn}>
									<EmailAndPasswordSection />
									<GenderTabs
										name='gender'
										label='Пол'
									/>
									<BirthdateField
										name='birthdate'
										label='Дата рождения'
										placeholder='ДД.ММ.ГГГГ'
									/>
								</div>
								{/* Right Column - Physical Parameters */}
								<div className={styles.rightColumn}>
									{numberFields.map(field => {
										if (
											field.type === 'number' &&
											field.placeholder &&
											field.unit
										) {
											return (
												<InputWithUnit
													key={field.name}
													label={field.label}
													id={field.name}
													name={field.name}
													unit={field.unit}
													placeholder={field.placeholder}
													min={field.min}
													max={field.max}
													maxLength={field.maxLength}
												/>
											)
										}
										return null
									})}
									<Field
										name='nutritionGoal'
										label='Цель в питании'
										options={nutritionGoalOptions}
										placeholder='Выберите цель в питании'
										type='multiSelect'
									/>
								</div>
							</div>
						</div>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-2 w-full'>
						<div className='w-full'>
							{mealFrequencyField &&
								mealFrequencyField.unit &&
								mealFrequencyField.placeholder && (
									<InputWithUnit
										label={mealFrequencyField.label}
										id={mealFrequencyField.name}
										name={mealFrequencyField.name}
										unit={mealFrequencyField.unit}
										placeholder={mealFrequencyField.placeholder}
										min={mealFrequencyField.min}
										max={mealFrequencyField.max}
										maxLength={mealFrequencyField.maxLength}
									/>
								)}
						</div>
						<div className='w-full'>
							{hasOvenField && (
								<Field
									name='hasOven'
									label={hasOvenField.label}
									options={hasOvenField.options || []}
									placeholder={hasOvenField.placeholder || ''}
									type='singleSelect'
								/>
							)}
						</div>
					</div>

					<div
						className={clsx(
							'grid gap-6 shadow-sm w-full',
							flexibleDayFrequency === 'Без гибких дней'
								? 'grid-cols-1 md:grid-cols-2'
								: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
						)}
					>
						<Field
							name='flexibleDayFrequency'
							label='Частота гибких дней'
							options={flexibleDayFrequencyOptions}
							placeholder='Выберите частоту гибких дней'
							type='singleSelect'
							onInfoClick={() => setIsFlexibleDaysModalOpen(true)}
						/>
						{activityLevelField && (
							<Field
								name='activityLevel'
								label={activityLevelField.label}
								options={activityLevelField.options || []}
								placeholder={activityLevelField.placeholder || ''}
								type='singleSelect'
							/>
						)}
					</div>

					<div className={styles.multiSelectGrid}>
						{multiSelectFields.map(field => {
							// Поле currentProducts убрано - не используется
							// if (field.name === 'favoriteFoods') {
							// 	return (
							// 		<>
							// 			<Field
							// 				key={field.name}
							// 				name={field.name}
							// 				label={field.label}
							// 				options={field.options || []}
							// 				placeholder={field.placeholder || ''}
							// 				type={field.type as 'singleSelect' | 'multiSelect'}
							// 			/>
							// 			<TextFieldWithModal
							// 				key="currentProducts"
							// 				name="currentProducts"
							// 				label="Какие продукты у вас сейчас есть"
							// 				placeholder="Введите, какие продукты у вас сейчас есть"
							// 				modalTitle="Введите, какие продукты у вас сейчас есть"
							// 				modalPlaceholder="Например: курица, рис, помидоры, оливковое масло..."
							// 			/>
							// 		</>
							// 	)
							// }

							let label = field.label
							if (field.name === 'nutritionPreferences') {
								label = (
									<>
										<span className='hidden sm:inline'>
											Предпочтения по калорийности и макронутриентам
										</span>
										<span className='sm:hidden'>Предпочтения по КБЖУ</span>
									</>
								) as any
							} else if (field.name === 'seasonalPreferences') {
								label = (
									<>
										<span className='hidden sm:inline'>
											Сезонные и экологические предпочтения
										</span>
										<span className='sm:hidden'>Сезонные предпочтения</span>
									</>
								) as any
							}

							return (
								<Field
									key={field.name}
									name={field.name}
									label={label}
									options={field.options || []}
									placeholder={field.placeholder || ''}
									type={field.type as 'singleSelect' | 'multiSelect'}
								/>
							)
						})}
					</div>
				</Form>
			</FormProvider >
			<ExitSettingsModal
				isOpen={isModalOpen}
				onClose={handleExitWithoutSaving}
				onSave={handleSaveAndExit}
				onDiscard={handleDiscardChanges}
			>
				<p>У вас есть несохранённые изменения. Что вы хотите сделать?</p>
			</ExitSettingsModal>
			<ModalWithTransition
				isOpen={isValidationModalOpen}
				isNeedWrapper
			>
				<div className='flex flex-col gap-4 p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1001] bg-bg rounded-xl shadow-lg min-w-[300px] max-w-[500px]'>
					<p>Пожалуйста, заполните следующие поля:</p>
					<ul className='list-disc pl-5 text-text'>
						{missingFields.map((field, index) => (
							<li
								key={index}
								className='py-1'
							>
								{field}
							</li>
						))}
					</ul>
					<Btn onClick={() => setIsValidationModalOpen(false)}>Закрыть</Btn>
				</div>
			</ModalWithTransition>
			<FlexibleDaysInfoModal
				isOpen={isFlexibleDaysModalOpen}
				onClose={() => setIsFlexibleDaysModalOpen(false)}
			/>
			{isSuccessModalOpen && (
				<SettingsSuccessModal
					closeModal={() => setIsSuccessModalOpen(false)}
				/>
			)}
		</>
	)
}
