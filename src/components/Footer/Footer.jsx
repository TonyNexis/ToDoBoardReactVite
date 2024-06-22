import { useLocation } from '@tanstack/react-router'
import ButtonAddCardFooter from '../ButtonAddCardFooter/ButtonAddCardFooter'
import Clock from './../Clock/Clock'
import Filter from './../Filter/Filter'
import styles from './Footer.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../../redux/showMenuSlice'

const Footer = () => {
	const dispatch = useDispatch();
	const location = useLocation()
	const menuIsOpen = useSelector(state => state.showMenu.MenuIsOpen)

	const isHomePage = location.pathname === '/'

	const toggleNavBtn = useSelector(state => state.showMenu.MenuIsOpen)

    const onToggleNavBtn = () => {
		dispatch(toggleShowMenu())
    }

	return (
		<div className={styles.footer}>
			<div className={`${styles.toggleNavBtn} ${toggleNavBtn ? styles.open : ''}`} onClick={onToggleNavBtn}>
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
