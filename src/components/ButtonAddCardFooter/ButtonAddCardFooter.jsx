import { useDispatch } from 'react-redux'
import { openModalCardAdd } from './../../redux/modalCardAddSlice.js'
import styles from './ButtonAddCardFooter.module.scss'

const ButtonAddCardFooter = () => {
	const dispatch = useDispatch();

	const onButtonCard = () => {
		dispatch(openModalCardAdd())
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
