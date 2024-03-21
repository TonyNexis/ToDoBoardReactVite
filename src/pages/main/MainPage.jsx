import { useSelector } from 'react-redux'
import ButtonAddCard from '../../components/ButtonAddCard/ButtonAddCard'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
import FormAddCard from './../FormAddCard/FormAddCard'

import styles from './MainPage.module.scss'


const MainPage = () => {

	const isModalOpen = useSelector((state) => state.cardAdd.modalCardAddIsOpen);

	return (
		<div className={styles.page}>
			<Footer />
			{isModalOpen && <FormAddCard/>}
			<div className={styles.cardList}>
				<Card/>
				<ButtonAddCard />
			</div>
		</div>
	)
}

export default MainPage
