import { useState } from 'react'
import { useLocation } from '@tanstack/react-router'
import ButtonAddCardFooter from '../ButtonAddCardFooter/ButtonAddCardFooter'
import Clock from './../Clock/Clock'
import Filter from './../Filter/Filter'

import styles from './Footer.module.scss'
import { useSelector } from 'react-redux'

const Footer = () => {
	const location = useLocation()

	const isHomePage = location.pathname === '/'

	const toggleNavBtn = useSelector((state) =>)
	const [toggleNavBtn, setToggleNavBtn] = useState(false)

	return (
		<div className={styles.footer}>
			<div className={`${styles.toggleNavBtn} ${toggleNavBtn ? styles.open : null}`} onClick={() => setToggleNavBtn(!toggleNavBtn)}>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
			{isHomePage && <ButtonAddCardFooter />}
			<div className={styles.container}>
				{isHomePage && <Filter />}
				<Clock />
			</div>
		</div>
	)
}

export default Footer
