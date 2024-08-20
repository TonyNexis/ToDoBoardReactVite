import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import IconButton from '@mui/material/IconButton'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store';

import { setEditCard } from '../../redux/editCardDataSlice'
import { openModalCard } from '../../redux/modalCardSlice'

import { deleteData } from '../../redux/dataSlice'
import styles from './Card.module.scss'

interface CardProps {
	id: string;
	title: string;
	comment: string;
	status: string;
	date: string;
}

interface TimeLeft {
	days: number | string;
	hours: number | string;
	minutes: number | string;
	seconds: number | string;
}

const Card: React.FC<CardProps> = ({id, title, comment, status, date}) => {
	const [timeAlert, setTimeAlert] = useState(false)
	const dispatch = useDispatch<AppDispatch>()

	const calculateTimeLeft = () => {
		const difference = +new Date(date) - +new Date()
		let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60),
			}
		} else {
			timeLeft = {
				days: '00',
				hours: '00',
				minutes: '00',
				seconds: '00',
			}
		}

		return timeLeft
	}

	const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft())
	const cardSended = useSelector((state: RootState) => state.dataToDo.sended)

	useEffect(() => {
		if (
			timeLeft.days === '00' &&
			timeLeft.hours === '00' &&
			timeLeft.minutes === '00' &&
			timeLeft.seconds === '00'
		) {
			setTimeAlert(true)
		} else {
			setTimeAlert(false)
		}
	}, [timeLeft])
	
	useEffect(() => {
		if (cardSended) {
			setTimeLeft(calculateTimeLeft())
		}
	}, [cardSended])

	useEffect(() => {
		const timer = setInterval(() => {
			setTimeLeft(calculateTimeLeft())
		}, 1000)

		return () => clearInterval(timer)
	}, [date])

	let days = ''

	if (timeLeft.days === 1) {
		days = '1 Day'
	} else if (typeof timeLeft.days === 'number' && timeLeft.days > 1) {
		days = `${timeLeft.days} Days`
	}

	const cardDeleting = () => {
		dispatch(deleteData(id))
	}

	const updateCard = () => {
		dispatch(setEditCard({ id, title, comment, status, date }))
		dispatch(openModalCard())
	}

	return (
		<div
			className={`${styles.card} ${timeAlert === true ? styles.cardAlert : ''}`}
			id={id}
		>
			<div className={styles.btnWrapper}>
				<IconButton
					aria-label='edit'
					onClick={updateCard}
					size='small'
					className={styles.btn}
				>
					<EditIcon fontSize='medium' />
				</IconButton>
				<IconButton
					aria-label='close'
					onClick={cardDeleting}
					size='medium'
					className={styles.btn}
				>
					<CloseIcon fontSize='medium' />
				</IconButton>
			</div>

			<div
				className={`${styles.timer} ${
					status === 'Hot'
						? styles.hotStatus
						: status === 'Important'
						? styles.importantStatus
						: ''
				} ${timeAlert === true ? styles.timeAlert : ''}`}
			>
				{days} {timeLeft.hours.toString().padStart(2, '0')}:
				{timeLeft.minutes.toString().padStart(2, '0')}:
				{timeLeft.seconds.toString().padStart(2, '0')}
			</div>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>ToDo:</p>
				<p className={styles.toDoText}>{title}</p>
			</div>
			<div className={styles.cardBlock}>
				<p className={styles.ticker}>Comment:</p>
				<p className={styles.commentText}>{comment}</p>
			</div>
		</div>
	)
}

export default Card
