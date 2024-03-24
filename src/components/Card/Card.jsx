import { useEffect, useState } from 'react'
import styles from './Card.module.scss'

const Card = (props) => {
	const { id, title, comment, status, date } = props;

	// console.log('Timer >> ', new Date(date))
	// // console.log(new Date)

	const calculateTimeLeft = () => {
		const difference = +new Date(date) - +new Date();
		let timeLeft = {};

		if (difference > 0) {
			timeLeft = {
				days: Math.floor(difference / (1000 * 60 * 60 * 24)),
				hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
				minutes: Math.floor((difference / 1000 / 60) % 60),
				seconds: Math.floor((difference / 1000) % 60)
			};
		} else {
			timeLeft = {
				days: '00',
				hours: '00',
				minutes: '00',
				seconds: '00',
			}
		}

		return timeLeft;
	}

	const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

	useEffect(() => {
		const timer = setTimeout(() => {
			setTimeLeft(calculateTimeLeft());
		}, 1000);

		return () => clearTimeout(timer);
	})

	let days = '';

	if (timeLeft.days === 1) {
		days = '1 Day';
	} else if (timeLeft.days > 1) {
		days = `${timeLeft.days} Days`;
	}

	return (
		<div className={styles.card} id={id}>
			<div className={`${styles.timer} ${status === 'Hot' ? styles.hotStatus : status === 'Important' ? styles.importantStatus : ''}`}>{days} {timeLeft.hours.toString().padStart(2, '0')}:{timeLeft.minutes.toString().padStart(2, '0')}:{timeLeft.seconds.toString().padStart(2, '0')}</div>
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
