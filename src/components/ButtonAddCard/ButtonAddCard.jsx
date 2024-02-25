import { useDispatch } from 'react-redux'
import { openModalCardAdd } from './../../redux/modalCardAddSlice.js'
import styles from './ButtonAddCard.module.scss'

const ButtonAddCard = () => {
	const dispatch = useDispatch();

	const onButtonCard = () => {
		dispatch(openModalCardAdd())
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
