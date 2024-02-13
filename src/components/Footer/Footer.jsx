import Timer from '../Timer/Timer';

import styles from './Footer.module.scss'

const Footer = () => {
    return (
        <div className={styles.footer}>
            <Timer/>
        </div>
    )
}

export default Footer;