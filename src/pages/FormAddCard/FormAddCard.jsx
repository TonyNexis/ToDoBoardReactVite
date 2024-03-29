import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { closeModalCardAdd } from '../../redux/modalCardAddSlice'
import { sendData } from '../../redux/dataSlice'
import { v4 as uuidv4 } from 'uuid'
import { setSendedFalse } from './../../redux/dataSlice'
import styles from './FormAddCard.module.scss'

const FormAddCard = () => {
	const { sending, sended, error } = useSelector(state => state.dataToDo);
	let [dateError, setdateError] = useState(false);
	let errorMessage;
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
		control,
	} = useForm()

	const dispatch = useDispatch()

	const onCloseModal = () => {
		dispatch(closeModalCardAdd())
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

	const handleFormClick = e => {
		e.stopPropagation()
	}

	const onSubmit = (data, e) => {
		e.stopPropagation()

		const formattedDate = dayjs(data.date).format('MM/DD/YYYY HH:mm')

		const dataCard = { ...data, date: formattedDate, id: uuidv4() }

		if (data.date === null) {
			setdateError(true);
		} else {
			dispatch(sendData(dataCard))
			.then(() => {
				if (error === null) {
					reset();
					setdateError(false);
					setTimeout(() => {
						dispatch(setSendedFalse());
					}, 3000);
				}
			})

		}	
	}

	switch (true) {
		case sending === true:
			errorMessage = 'Creating a ToDo card'
			break
		case sended === true:
			errorMessage = 'ToDo card was successfully created!'
			break
		case error !== null:
			errorMessage = `${error}`
			break
		case errors?.title?.type === 'required':
			errorMessage = 'ToDo field is required'
			break
		case errors?.title?.type === 'maxLength':
			errorMessage = 'Maximum ToDo character limit is 61'
			break
		case errors?.comment?.type === 'maxLength':
			errorMessage = 'Maximum Comment character limit is 150'
			break
		case dateError === true:
			errorMessage = 'Please choose the date'
			break
		default:
			errorMessage = null
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
				<p className={styles.mainText}>Create a ToDo card</p>
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
								onChange={(value) => {
									field.onChange(value);
									setdateError(false);
								}}
								textField={props => <input {...props} />}
								ampm={false}
							/>
						)}
					/>
				</LocalizationProvider>
				<span className={styles.errorMessage}>{errorMessage}</span>

				<button className={styles.submitButton}>Create</button>
			</form>
		</div>
	)
}

export default FormAddCard
