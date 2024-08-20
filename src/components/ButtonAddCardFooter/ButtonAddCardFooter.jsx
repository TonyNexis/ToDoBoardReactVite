import { useDispatch } from 'react-redux'

import { openModalCard } from './../../redux/modalCardSlice'
import styles from './ButtonAddCardFooter.module.scss'

const ButtonAddCardFooter = () => {
	const dispatch = useDispatch();

	const onButtonCard = () => {
		dispatch(openModalCard())
	}

	return (
		<button onClick={onButtonCard} className={styles.ButtonAddCardFooter}>
			<div className={styles.buttonAddCard}>
				<s className={styles.verticalLine}></s>
				<s className={styles.horizontalLine}></s>
			</div>
            <p className={styles.buttonText}>New card</p>
		</button>
	)
}

export default ButtonAddCardFooter
