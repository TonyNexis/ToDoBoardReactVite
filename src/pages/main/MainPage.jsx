import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BeatLoader } from 'react-spinners'

import ButtonAddCard from '../../components/ButtonAddCard/ButtonAddCard'
import SortableItem from '../../components/SortableItem/SortableItem'
import { fetchData } from '../../redux/dataSlice'
import FormAddCard from '../FormAddCard/FormAddCard'

import styles from './MainPage.module.scss'

const MainPage = () => {
	const dispatch = useDispatch()

	const isModalOpen = useSelector(state => state.modalCard.modalCardIsOpen)
	const dataToDo = useSelector(state => state.dataToDo.data)
	const loadingStatus = useSelector(state => state.dataToDo.loading)
	const filters = useSelector(state => state.filterCards)

	const [items, setItems] = useState(dataToDo)

	useEffect(() => {
		dispatch(fetchData())
	}, [dispatch])

	useEffect(() => {
		setItems(dataToDo)
	}, [dataToDo])

	const filteredData = items
		? items.filter(item => {
				if (item.status === 'Hot' && !filters.hot) return false
				if (item.status === 'Important' && !filters.important) return false
				if (item.status === 'Normal' && !filters.normal) return false
				return true
			})
		: []

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				delay: 140,
			},
		}),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	)

	const handleDragEnd = event => {
		const { active, over } = event

		if (active.id !== over.id) {
			setItems(items => {
				const oldIndex = items.findIndex(item => item.id === active.id)
				const newIndex = items.findIndex(item => item.id === over.id)

				return arrayMove(items, oldIndex, newIndex)
			})
		}
	}

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
					<DndContext
						sensors={sensors}
						collisionDetection={closestCenter}
						onDragEnd={handleDragEnd}
					>
						<SortableContext
							items={filteredData}
							strategy={verticalListSortingStrategy}
						>
							{filteredData.map(item => (
								<SortableItem
									key={item.id}
									id={item.id}
									date={item.date}
									status={item.status}
									title={item.title}
									comment={item.comment}
								/>
							))}
						</SortableContext>
					</DndContext>
				)}
				<ButtonAddCard />
			</div>
		</div>
	)
}

export default MainPage
