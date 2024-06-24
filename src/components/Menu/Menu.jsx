import { Link, useMatch } from '@tanstack/react-router'
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

	const matches = {
		home: useMatch({ from: '/' }),
		// profile: useMatch({ from: '/profile', }),
		// somePage: useMatch({ from: '/somePage'  }),
		// about: useMatch({ from: '/about' }),
	}

	return (
		<div
			ref={menuRef}
			className={`${styles.menu} ${showMenu ? styles.active : ''} `}
		>
			<Link className={matches.home ? styles.activeLink : ''} to='/'>
				Home
			</Link>
			<Link className={matches.profile ? styles.activeLink : ''} to='/profile'>Profile</Link>
			<Link className={matches.somePage ? styles.activeLink : ''} to='/somePage'>Some Page</Link>
			<Link className={matches.about ? styles.activeLink : ''} to='/about'>About</Link>
		</div>
	)
}

export default Menu
