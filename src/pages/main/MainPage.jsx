import ButtonAddCard from '../../components/ButtonAddCard/ButtonAddCard'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'

import styles from './MainPage.module.scss'

const MainPage = () => {
	console.log(styles.className)

	return (
		<div className={styles.page}>
			<Footer />
			<div className={styles.cardList}>
				<Card/>
				<ButtonAddCard />
			</div>
		</div>
	)
}

export default MainPage
