import styles from './Filter.module.scss'
import { Switch } from '@mui/material'

const Filter = () => {
    const label = { inputProps: { 'aria-label': 'Color switch demo' } };

    return (
        <div className={styles.filterWrapper}>
            <p>Filter:</p>
            <div className={styles.switchWrapper}>
            <Switch {...label} className={styles.switch} defaultChecked color="error"/>
            <p>Hot</p>
            </div>
            <div className={styles.switchWrapper}>
            <Switch {...label} className={styles.switch} defaultChecked color="success"/>
            <p>Important</p>
            </div>
            <div className={styles.switchWrapper}>
            <Switch {...label} className={styles.switch} defaultChecked color="primary"/>
            <p>Normal</p>
            </div>
        </div>
    )
}

export default Filter;