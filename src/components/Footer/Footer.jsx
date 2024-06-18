import { useLocation } from '@tanstack/react-router'
import ButtonAddCardFooter from '../ButtonAddCardFooter/ButtonAddCardFooter'
import Clock from './../Clock/Clock'
import Filter from './../Filter/Filter'

import styles from './Footer.module.scss'

const Footer = () => {
	const location = useLocation()

	const isHomePage = location.pathname === '/'

	return (
		<div className={styles.footer}>

			{isHomePage && <ButtonAddCardFooter />}
			<div className={styles.container}>
				{isHomePage && <Filter />}
				<Clock />
			</div>
		</div>
	)
}

export default Footer
