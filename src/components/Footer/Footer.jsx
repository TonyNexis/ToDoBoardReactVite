import ButtonAddCardFooter from '../ButtonAddCardFooter/ButtonAddCardFooter'
import Clock from './../Clock/Clock'
import Filter from '../filter/Filter'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<div className={styles.footer}>
			<ButtonAddCardFooter/>
			<Clock />
			<Filter/>
		</div>
	)
}

export default Footer
