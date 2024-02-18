import styles from './ButtonAddCardFooter.module.scss'

const click = () => {
    console.log('click')
}

const ButtonAddCardFooter = () => {
	return (
		<button onClick={click} className={styles.ButtonAddCardFooter}>
			<div className={styles.buttonAddCard}>
				<s className={styles.verticalLine}></s>
				<s className={styles.horizontalLine}></s>
			</div>
            <p className={styles.buttonText}>New card</p>
		</button>
	)
}

export default ButtonAddCardFooter
