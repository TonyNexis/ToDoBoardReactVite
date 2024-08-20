import { useEffect, useState } from 'react'

import styles from './Clock.module.scss'

const Clock: React.FC = () => {
	const [currentTime, setCurrentTime] = useState<Date>(new Date())

	useEffect(() => {
		const intervalID = setInterval(() => {
			setCurrentTime(new Date())
		}, 1000)

		return () => clearInterval(intervalID)
	}, [])

	const hours = currentTime.getHours().toString().padStart(2, '0'),
		minutes = currentTime.getMinutes().toString().padStart(2, '0'),
		seconds = currentTime.getSeconds().toString().padStart(2, '0')
	return (
		<div className={styles.timer}>
			{hours}:{minutes}:{seconds}
		</div>
	)
}

export default Clock
