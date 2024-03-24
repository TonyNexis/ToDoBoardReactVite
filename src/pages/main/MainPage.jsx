import { useDispatch, useSelector } from 'react-redux'
import ButtonAddCard from '../../components/ButtonAddCard/ButtonAddCard'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
import FormAddCard from './../FormAddCard/FormAddCard'
import { fetchData } from './../../redux/dataSlice'

import styles from './MainPage.module.scss'
import { useEffect } from 'react'

const MainPage = () => {
	const dispatch = useDispatch()

	const isModalOpen = useSelector(state => state.cardAdd.modalCardAddIsOpen)
	const dataToDo = useSelector(state => state.dataToDo.data)

	useEffect(() => {
		dispatch(fetchData())
	}, [dispatch])

	console.log(dataToDo)

	return (
		<div className={styles.page}>
			<Footer />
			{isModalOpen && <FormAddCard />}
			<div className={styles.cardList}>
				{/* <Card /> */}
				{dataToDo &&
					dataToDo.map(item => (
						<Card key={item.id} id={item.id} date={item.date} status={item.status} title={item.title} comment={item.comment} />
					))}
				<ButtonAddCard />
			</div>
		</div>
	)
}

export default MainPage
