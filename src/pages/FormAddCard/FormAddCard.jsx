import { useForm } from 'react-hook-form'
import styles from './FormAddCard.module.scss'

const FormAddCard = () => {
	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm()

	const onSubmit = data => console.log('Data from card form==>', data)

	// console.log(watch('example'))

	return (
		<div className={styles.addCardFormWrapper}>
			<form className={styles.addCardForm} onSubmit={handleSubmit(onSubmit)}>
				<p className={styles.mainText}>Create a ToDo card</p>
				<input
					className={styles.inputs}
					placeholder='ToDo'
					{...register('example')}
				/>
				<input
					className={styles.inputs}
					placeholder='Comment'
					{...register('exampleRequired', { required: true })}
				/>
				{errors.exampleRequired && <span>This field is required</span>}

				<button className={styles.submitButton}>Create</button>
			</form>
		</div>
	)
}

export default FormAddCard
