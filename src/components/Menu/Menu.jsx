import HomeIcon from '@mui/icons-material/Home'
import PersonPinIcon from '@mui/icons-material/PersonPin';
import InfoIcon from '@mui/icons-material/Info';
import ApprovalIcon from '@mui/icons-material/Approval';
import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../../redux/showMenuSlice'

import styles from './Menu.module.scss'

const Menu = ({ footerBtnToggleMenuRef }) => {
	const showMenu = useSelector(state => state.showMenu.MenuIsOpen)
	const menuRef = useRef(null)
	const dispatch = useDispatch()

	const handleClickOutside = event => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target) &&
			footerBtnToggleMenuRef.current &&
			!footerBtnToggleMenuRef.current.contains(event.target) &&
			showMenu
		) {
			dispatch(toggleShowMenu())
		}
	}

	useEffect(() => {
		if (showMenu) {
			document.addEventListener('mousedown', handleClickOutside)
		} else {
			document.removeEventListener('mousedown', handleClickOutside)
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showMenu])

	const location = useLocation()

	const isActive = path => location.pathname === path

	return (
		<div
			ref={menuRef}
			className={`${styles.menu} ${showMenu ? styles.active : ''} `}
		>
			<Link to='/' className={styles.btnWrapper}>
				<HomeIcon className={`${styles.icon} ${isActive('/') ? styles.activeLink : ''} `} />
				<p className={isActive('/') ? styles.activeLink : ''}>
					Home
				</p>
			</Link>




			<div className={styles.btnWrapper}>
				<PersonPinIcon className={styles.icon}/>
				<Link
				className={isActive('/profile') ? styles.activeLink : ''}
				to='/profile'
			>
				Profile
			</Link>
			</div>
			<div className={styles.btnWrapper}>
				<ApprovalIcon className={styles.icon}/>
				<Link
				className={isActive('/somepage') ? styles.activeLink : ''}
				to='/somepage'
			>
				SomePage
			</Link>
			</div>
			<div className={styles.btnWrapper}>
				<InfoIcon className={styles.icon}/>
				<Link className={isActive('/about') ? styles.activeLink : ''} to='/about'>
				About
			</Link>
			</div>
		</div>
	)
}

export default Menu
