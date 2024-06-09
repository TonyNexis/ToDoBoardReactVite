import ButtonAddCardFooter from '../ButtonAddCardFooter/ButtonAddCardFooter'
import Filter from '../Filter/Filter'
import Clock from './../Clock/Clock'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<div className={styles.footer}>
			<ButtonAddCardFooter />
			<div className={styles.container}>
				<Filter />
				<Clock />
			</div>
		</div>
	)
}

export default Footer
