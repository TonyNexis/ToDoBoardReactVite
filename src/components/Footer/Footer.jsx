import { useLocation } from '@tanstack/react-router'
import { useDispatch, useSelector } from 'react-redux'

import { toggleShowMenu } from '../../redux/showMenuSlice'
import ButtonAddCardFooter from '../ButtonAddCardFooter/ButtonAddCardFooter'
import Filter from '../Filter/Filter'

import Clock from './../Clock/Clock'
import styles from './Footer.module.scss'

const Footer = ({ footerBtnToggleMenuRef }) => {
	const dispatch = useDispatch()
	const location = useLocation()

	const isHomePage = location.pathname === '/'

	const toggleNavBtn = useSelector(state => state.showMenu.MenuIsOpen)

	const onToggleNavBtn = () => {
		dispatch(toggleShowMenu())
	}

	return (
		<div className={styles.footer}>
			<div
				ref={footerBtnToggleMenuRef}
				className={`${styles.toggleNavBtn} ${toggleNavBtn ? styles.open : ''}`}
				onClick={onToggleNavBtn}
			>
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
