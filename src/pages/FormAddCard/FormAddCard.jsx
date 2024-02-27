import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { closeModalCardAdd } from '../../redux/modalCardAddSlice'
import styles from './FormAddCard.module.scss'

const FormAddCard = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const dispatch = useDispatch()

	const onCloseModal = () => {
		dispatch(closeModalCardAdd())
	}

	const handleFormClick = e => {
		e.stopPropagation()
	}

	const onSubmit = (data, e) => {
		e.stopPropagation()
		console.log('Data from card form==>', data)
	}

	// console.log(watch('example'))

	let errorMessage

	switch (true) {
		case errors?.todo?.type === 'required':
			errorMessage = 'ToDo field is required'
			break
		case errors?.todo?.type === 'maxLength':
			errorMessage = 'Maximum ToDo character limit is 61'
			break
		case errors?.comment?.type === 'maxLength':
			errorMessage = 'Maximum Comment character limit is 150'
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
					{...register('todo', { maxLength: 61, required: true })}
				/>
				<textarea
					rows={3}
					className={`${styles.inputs} ${styles.inputComment}`}
					placeholder='Comment'
					{...register('comment', { maxLength: 150 })}
				/>
				<div className={styles.dateWrapper}>
					<label>Date:</label>
					{/* <ReactDatePicker
				dateFormat="dd/MM/yyyy"
				/> */}
				</div>
				<div className={styles.statusRadioWrapper}>
					<label className={styles.radioLabelStatus}>Status:</label>
					<label>
						<input
							className={styles.statusRadio}
							type='radio'
							name='status'
							value='Hot'
							{...register('status')}
						/>
						Hot
					</label>
					<label>
						<input
							className={styles.statusRadio}
							type='radio'
							name='status'
							value='Important'
							{...register('status')}
						/>
						Important
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
						Normal
					</label>
				</div>
				<span className={styles.errorMessage}>{errorMessage}</span>

				<button className={styles.submitButton}>Create</button>
			</form>
		</div>
	)
}

export default FormAddCard
