import { Link }from '@tanstack/react-router'
import styles from './Menu.module.scss'

const Menu = () => {
    return (
        <div className={styles.menu}>
		<Link to='/'>Home</Link> 
        <Link to='/about'>About</Link>
	</div>
    )
}

export default Menu
