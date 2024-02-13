import Footer from '../../components/Footer/Footer';

import styles from './MainPage.module.scss';

const MainPage = () => {
    console.log(styles.className)

    return (
        <div className={styles.page}>
        <Footer/>
        </div>
    )
}


export default MainPage;