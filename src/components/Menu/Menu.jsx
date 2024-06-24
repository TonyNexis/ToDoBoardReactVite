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
			<Link className={isActive('/') ? styles.activeLink : ''} to='/'>
				Home
			</Link>
			<Link
				className={isActive('/profile') ? styles.activeLink : ''}
				to='/profile'
			>
				Profile
			</Link>
			<Link
				className={isActive('/somepage') ? styles.activeLink : ''}
				to='/somepage'
			>
				Some Page
			</Link>
			<Link className={isActive('/about') ? styles.activeLink : ''} to='/about'>
				About
			</Link>
		</div>
	)
}

export default Menu
