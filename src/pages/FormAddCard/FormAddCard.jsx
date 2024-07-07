import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

import {
	sendData,
	setEditedFalse,
	setSendedFalse,
	updateData,
} from '../../redux/dataSlice'
import { clearEditCard } from '../../redux/editCardDataSlice'
import { closeModalCard } from '../../redux/modalCardSlice'

import styles from './FormAddCard.module.scss'

const FormAddCard = () => {
	const { sending, sended, editing, edited, error } = useSelector(
		state => state.dataToDo
	)
	const editCardData = useSelector(state => state.editCardData.data)
	let [dateError, setDateError] = useState(false)
	let modalMessage
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
		setValue,
	} = useForm()

	const dispatch = useDispatch()

	const onCloseModal = () => {
		dispatch(closeModalCard())
		editCardData !== null ? dispatch(clearEditCard()) : null
	}

	useEffect(() => {
		const handleKeyDown = e => {
			if (e.key === 'Escape') {
				onCloseModal()
			}
		}

		document.addEventListener('keydown', handleKeyDown)

		return () => {
			document.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	useEffect(() => {
		if (editCardData) {
			setValue('title', editCardData.title)
			setValue('comment', editCardData.comment)
			setValue('status', editCardData.status)
			setValue('date', dayjs(editCardData.date))
		}
	}, [editCardData, setValue])

	const handleFormClick = e => {
		e.stopPropagation()
	}

	const onSubmit = (data, e) => {
		e.stopPropagation()

		if (data.date === null) {
			setDateError(true)
			return
		}

		const formattedDate = dayjs(data.date).format('MM/DD/YYYY HH:mm')
		const dataCard = {
			...data,
			date: formattedDate,
			id: `${editCardData ? editCardData.id : uuidv4()}`,
		}

		if (editCardData) {
			dispatch(updateData({ id: editCardData.id, formData: dataCard }))
				.unwrap()
				.then(() => {
					reset()
					setDateError(false)
					dispatch(setEditedFalse())
					dispatch(closeModalCard())
					dispatch(clearEditCard())
				})
				.catch(() => {
					console.log('error')
				})
		} else {
			dispatch(sendData(dataCard))
				.unwrap()
				.then(() => {
					reset()
					setDateError(false)
					dispatch(setSendedFalse())
					dispatch(closeModalCard())
				})
				.catch(() => {
					console.log('error')
				})
		}
	}

	switch (true) {
		case sending === true:
			modalMessage = 'Creating a ToDo card'
			break
		case sended === true:
			modalMessage = 'ToDo card was successfully created!'
			break
		case editing === true:
			modalMessage = 'Editing ToDo card'
			break
		case edited === true:
			modalMessage = 'ToDo card was successfully changed!'
			break
		case error !== null:
			modalMessage = `${error}`
			break
		case errors?.title?.type === 'required':
			modalMessage = 'ToDo field is required'
			break
		case errors?.title?.type === 'maxLength':
			modalMessage = 'Maximum ToDo character limit is 61'
			break
		case errors?.comment?.type === 'maxLength':
			modalMessage = 'Maximum Comment character limit is 150'
			break
		case dateError === true:
			modalMessage = 'Please choose the date'
			break
		default:
			modalMessage = null
	}

	return (
		<div onMouseDown={onCloseModal} className={styles.addCardFormWrapper}>
			<form
				onMouseDown={handleFormClick}
				className={styles.addCardForm}
				onSubmit={handleSubmit(onSubmit)}
			>
				<svg
					onClick={onCloseModal}
					className={styles.closeButton}
					xmlns='http://www.w3.org/2000/svg'
					width='25'
					height='25'
					viewBox='0 0 1216 1312'
				>
					<path d='M1202 1066q0 40-28 68l-136 136q-28 28-68 28t-68-28L608 976l-294 294q-28 28-68 28t-68-28L42 1134q-28-28-28-68t28-68l294-294L42 410q-28-28-28-68t28-68l136-136q28-28 68-28t68 28l294 294l294-294q28-28 68-28t68 28l136 136q28 28 28 68t-28 68L880 704l294 294q28 28 28 68z' />
					<svg
						viewBox='0 0 1024 1024'
						xmlns='http://www.w3.org/2000/svg'
						fill='#000000'
					>
						<g id='SVGRepo_bgCarrier'></g>
						<g id='SVGRepo_tracerCarrier'></g>
						<g id='SVGRepo_iconCarrier'>
							<path
								fill='#000000'
								d='M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z'
							></path>
						</g>
					</svg>
				</svg>
				<p className={styles.mainText}>
					{editCardData ? 'Modify Card' : 'Create a ToDo card'}
				</p>
				<input
					className={styles.inputs}
					placeholder='ToDo'
					{...register('title', { maxLength: 61, required: true })}
				/>
				<textarea
					rows={3}
					className={`${styles.inputs} ${styles.inputComment}`}
					placeholder='Comment'
					{...register('comment', { maxLength: 150 })}
				/>
				<div className={styles.statusRadioWrapper}>
					<span className={styles.radioLabelStatus}>Status:</span>
					<label className={styles.statusRadio}>
						<input
							type='radio'
							name='status'
							value='Hot'
							{...register('status')}
						/>
						<span className={styles.radioText}>Hot</span>
					</label>
					<label>
						<input
							className={styles.statusRadio}
							type='radio'
							name='status'
							value='Important'
							{...register('status')}
						/>
						<span className={styles.radioText}>Important</span>
					</label>
					<label>
						<input
							className={styles.statusRadio}
							defaultChecked
							type='radio'
							name='status'
							value='Normal'
							{...register('status')}
						/>
						<span className={styles.radioText}>Normal</span>
					</label>
				</div>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<Controller
						name='date'
						control={control}
						defaultValue={null}
						render={({ field }) => (
							<DateTimePicker
								className={`${styles.dateTimePicker}`}
								label='Choose date'
								value={field.value}
								onChange={value => {
									field.onChange(value)
									setDateError(false)
								}}
								textField={props => <input {...props} />}
								ampm={false}
							/>
						)}
					/>
				</LocalizationProvider>
				<span className={styles.errorMessage}>{modalMessage}</span>

				<button className={styles.submitButton}>
					{editCardData ? 'Save' : 'Create'}
				</button>
			</form>
		</div>
	)
}

export default FormAddCard
