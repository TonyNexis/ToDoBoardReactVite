import styles from './ButtonAddCard.module.scss'

const ButtonAddCard = () => {
	const onButtonCard = () => {
		console.log('click')
	}

	return (
		<div onClick={onButtonCard} className={styles.cardButton}>
			<div className={styles.buttonAddCard}>
				<s className={styles.verticalLine}></s>
				<s className={styles.horizontalLine}></s>
			</div>
		</div>
	)
}

export default ButtonAddCard
