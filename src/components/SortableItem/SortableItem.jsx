import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

import Card from '../Card/Card'

import styles from './SortableItem.module.scss'

const SortableItem = props => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: props.id })

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={`${styles.sortableItem} ${isDragging ? styles.sortableItemDragging : ''}`}
			{...attributes}
			{...listeners}
		>
			<Card
				id={props.id}
				date={props.date}
				status={props.status}
				title={props.title}
				comment={props.comment}
			/>
		</div>
	)
}

export default SortableItem
