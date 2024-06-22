import { Link } from '@tanstack/react-router'
import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../../redux/showMenuSlice'
import styles from './Menu.module.scss'

const Menu = () => {
	const showMenu = useSelector(state => state.showMenu.MenuIsOpen)
	const menuRef = useRef(null)
    const dispatch = useDispatch();

	const handleClickOutside = (event) => {
		if (menuRef.current && !menuRef.current.contains(event.target)) {
			dispatch(toggleShowMenu())
		}
	}

	useEffect(() => {
		if (showMenu) {
			document.addEventListener('click', handleClickOutside)
		} else {
			document.removeEventListener('click', handleClickOutside)
		}

		return () => {
			document.removeEventListener('click', handleClickOutside)
		}
	}, [showMenu])

	return (
		<div
			ref={menuRef}
			className={`${styles.menu} ${showMenu ? styles.active : null} `}
		>
			<Link to='/'>Home</Link>
			<Link to='/about'>About</Link>
		</div>
	)
}

export default Menu
