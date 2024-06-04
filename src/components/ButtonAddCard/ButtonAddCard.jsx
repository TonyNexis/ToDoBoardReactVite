import { useDispatch } from 'react-redux'
import { openModalCard } from './../../redux/modalCardSlice.js'
import styles from './ButtonAddCard.module.scss'

const ButtonAddCard = () => {
	const dispatch = useDispatch();

	const onButtonCard = () => {
		dispatch(openModalCard())
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
