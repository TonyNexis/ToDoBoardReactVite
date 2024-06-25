import ApprovalIcon from '@mui/icons-material/Approval'
import HomeIcon from '@mui/icons-material/Home'
import InfoIcon from '@mui/icons-material/Info'
import PersonPinIcon from '@mui/icons-material/PersonPin'
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
	
	const menuBtn = (link, name, IconComponent) => {
		return (
			<Link
			to={link}
			className={`${styles.btnWrapper} ${isActive(link) ? styles.activeLink : ''} `}
		>
			<IconComponent />
			<p>{name}</p>
		</Link>
		)
	}

	return (
		<div
			ref={menuRef}
			className={`${styles.menu} ${showMenu ? styles.active : ''} `}
		>
			{menuBtn('/','Home', HomeIcon)}
			{menuBtn('/profile','Profile', PersonPinIcon)}
			{menuBtn('/somepage','SomePage', ApprovalIcon)}
			{menuBtn('/about','About', InfoIcon)}
		</div>
	)
}

export default Menu
