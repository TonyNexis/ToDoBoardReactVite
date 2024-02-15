import ButtonAddCard from '../../components/ButtonAddCard/ButtonAddCard'
import Footer from '../../components/Footer/Footer'

import styles from './MainPage.module.scss'

const MainPage = () => {
	console.log(styles.className)

	return (
		<div className={styles.page}>
			<Footer />
			<div className={styles.cardList}>
				<ButtonAddCard />
			</div>
		</div>
	)
}

export default MainPage
