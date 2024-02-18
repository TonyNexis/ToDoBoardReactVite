import ButtonAddCardFooter from '../ButtonAddCardFooter/ButtonAddCardFooter'
import Clock from './../Clock/Clock'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<div className={styles.footer}>
			<ButtonAddCardFooter/>
			<Clock />
		</div>
	)
}

export default Footer
