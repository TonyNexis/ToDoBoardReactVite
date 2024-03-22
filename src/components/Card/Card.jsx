import styles from './Card.module.scss'

const Card = (props) => {
	const { id, title, comment } = props;

	return (
		<div className={styles.card} id={id}>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>ToDo:</p>
				<p className={styles.text}>{title}</p>
			</div>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>Comment:</p>
				<p className={styles.text}>{comment}</p>
			</div>
		</div>
	)
}

export default Card
