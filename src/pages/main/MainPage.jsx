import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'
import ButtonAddCard from '../../components/ButtonAddCard/ButtonAddCard'
import Card from '../../components/Card/Card'
import { fetchData } from '../../redux/dataSlice'
import FormAddCard from '../FormAddCard/FormAddCard'

import { useEffect } from 'react'
import styles from './MainPage.module.scss'

const MainPage = () => {
	const dispatch = useDispatch()

	const isModalOpen = useSelector(state => state.modalCard.modalCardIsOpen)
	const dataToDo = useSelector(state => state.dataToDo.data)
	const loadingStatus = useSelector(state => state.dataToDo.loading)
	const filters = useSelector(state => state.filterCards)

	useEffect(() => {
		dispatch(fetchData())
	}, [dispatch])

	const filteredData = dataToDo ? dataToDo.filter((item) => {
		if (item.status === 'Hot' && !filters.hot) return false;
		if (item.status === 'Important' && !filters.important) return false;
		if (item.status === 'Normal' && !filters.normal) return false;
		return true;
	}) : [];

	return (
		<div className={styles.page}>
			<div className={styles.footerPlaceholder}></div>
			{isModalOpen && <FormAddCard />}
			<div className={styles.cardList}>
				{loadingStatus ? (
					<div className={styles.loadingWrapper}>
						<BeatLoader color='#2ea19b76' margin={5} size={30} />
					</div>
				) : (
					<>
						{filteredData.map(item => (
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
