import Timer from '../Timer/Timer'

import styles from './Footer.module.scss'

const Footer = () => {
	return (
		<div className={styles.footer}>
			<p style={{ color: 'red' }}>Hello World test</p>
			<Timer />
		</div>
	)
}

export default Footer
