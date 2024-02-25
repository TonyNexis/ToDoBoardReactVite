import styles from './Card.module.scss'

const Card = () => {
	return (
		<div className={styles.card}>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>ToDo:</p>
				<p className={styles.text}>Call the Doctor and eat some aple aple aple aple some apless </p>
			</div>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>Comment:</p>
				<p className={styles.text}> Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sunt dolor eaque Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>
			</div>
		</div>
	)
}

export default Card
