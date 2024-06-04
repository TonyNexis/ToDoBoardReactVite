import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import ButtonAddCard from '../../components/ButtonAddCard/ButtonAddCard'
import Card from '../../components/Card/Card'
import Footer from '../../components/Footer/Footer'
import { fetchData } from './../../redux/dataSlice'
import FormAddCard from './../FormAddCard/FormAddCard'

import { useEffect } from 'react'
import styles from './MainPage.module.scss'

const MainPage = () => {
	const dispatch = useDispatch()

	const isModalOpen = useSelector(state => state.modalCard.modalCardIsOpen)
	const dataToDo = useSelector(state => state.dataToDo.data)
	const loadingStatus = useSelector(state => state.dataToDo.loading)

	useEffect(() => {
		dispatch(fetchData())
	}, [dispatch])

	return (
		<div className={styles.page}>
			<Footer />
			<div className={styles.footerPlaceholder}></div>
			{isModalOpen && <FormAddCard />}
			<div className={styles.cardList}>
				{loadingStatus ? (
					<div className={styles.loadingWrapper}>
						<BeatLoader color='#2ea19b76' margin={5} size={30} />
					</div>
				) : (
					<>
						{dataToDo &&
							dataToDo.map(item => (
								<Card
									key={item.id}
									id={item.id}
									date={item.date}
									status={item.status}
									title={item.title}
									comment={item.comment}
								/>
							))}
						<ButtonAddCard />
					</>
				)}
			</div>
		</div>
	)
}

export default MainPage
