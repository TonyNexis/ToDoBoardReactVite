import styles from './Card.module.scss'

const Card = () => {
	return (
		<div className={styles.card}>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>ToDo:</p>
				<p className={styles.text}> Call the Doctor adasdasd adadsasda asdasd </p>
			</div>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>Comment:</p>
				<p className={styles.text}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolor eaque est eius autem soluta</p>
			</div>
		</div>
	)
}

export default Card
