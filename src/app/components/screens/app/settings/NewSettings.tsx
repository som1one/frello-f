'use client'

import clsx from 'clsx'
import { FormProvider } from 'react-hook-form'

import { useNavigationGuardWithPopstate } from '@/hooks/useNavigationGuardWithPopState'

import styles from './NewSettings.module.scss'
import { AdvancedSettings } from './components/AdvancedSettings/AdvancedSettings'
import { BirthdateField } from './components/BirthdateField/BirthdateField'
import { EmailAndPasswordSection } from './components/EmailAndPasswordSection/EmailAndPasswordSection'
import { ExitSettingsModal } from './components/ExitSettingsModal/ExitSettingsModal'
import { Field } from './components/Field/Field'
import { Form } from './components/Form/Form'
import { GenderTabs } from './components/GenderTabs/GenderTabs'
import { InputWithUnit } from './components/InputWithUnit/InputWithUnit'
import { FieldConfig, formFieldsConfig } from './model/formFieldsConfig'
import { flexibleDayFrequencyOptions } from './model/options'
import { useSettingsForm } from './model/useSettingsForm'
import { Btn, ModalWithTransition } from '@/shared/ui'

export default function NewSettings() {
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
	} = useSettingsForm()
	const {
		isModalOpen,
		handleDiscardChanges,
		handleExitWithoutSaving,
		handleSaveAndExit
	} = useNavigationGuardWithPopstate(isDirty, reset, settings, onSubmit)

	const additionTabs = [
		'Витамины',
		'Минералы',
		'Холестерин и липиды',
		'Сахар и углеводный обмен',
		'Гормоны',
		'Белок и аминокислоты',
		'Воспаление и маркеры здоровья',
		'Антиоксиданты и стресс'
	]

	const multiSelectFields = formFieldsConfig.filter(
		(field): field is FieldConfig =>
			'type' in field &&
			field.type === 'multiSelect' &&
			field.name !== 'flexibleDayType' &&
			field.name !== 'flexibleDays'
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
						</div>
					</div>

					<div className='flex flex-col md:flex-row gap-2 w-full'>
						<div className={styles.section}>
							<EmailAndPasswordSection />
							<div className={styles.section_wrapper}>
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
							<div className='flex flex-col justify-between max-[1400px]:w-full gap-4'>
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
											/>
										)
									}
									return null
								})}
							</div>
						</div>
					</div>

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
									max={6}
								/>
							)}
					</div>

					<div
						className={clsx(
							'grid gap-6 shadow-sm w-full',
							flexibleDayFrequency === 'Без гибких дней'
								? 'grid-cols-1'
								: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
						)}
					>
						<Field
							name='flexibleDayFrequency'
							label='Частота гибких дней'
							options={flexibleDayFrequencyOptions}
							placeholder='Выберите частоту гибких дней'
							type='singleSelect'
						/>
						{flexibleDayFrequency !== 'Без гибких дней' &&
							['flexibleDayType', 'flexibleDays'].map(fieldName => {
								const field = formFieldsConfig.find(
									f => 'name' in f && f.name === fieldName
								) as FieldConfig
								return field ? (
									<Field
										key={field.name}
										name={field.name}
										label={field.label}
										options={field.options || []}
										placeholder={field.placeholder || ''}
										type={field.type as 'singleSelect' | 'multiSelect'}
									/>
								) : null
							})}
					</div>

					<div className='grid max-[900px]:w-full max-[900px]:grid-cols-1 max-[1450px]:grid-cols-2 min-[1450px]:grid-cols-3 gap-4'>
						{multiSelectFields.map(field => (
							<Field
								key={field.name}
								name={field.name}
								label={field.label}
								options={field.options || []}
								placeholder={field.placeholder || ''}
							/>
						))}
					</div>

					<AdvancedSettings additionTabs={additionTabs} />
				</Form>
			</FormProvider>
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
		</>
	)
}
