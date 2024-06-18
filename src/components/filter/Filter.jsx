import { useDispatch, useSelector } from 'react-redux'
import styles from './Filter.module.scss'
import { Switch } from '@mui/material'
import { toggleFilter } from '../../redux/filterSlice'

const Filter = () => {
    const dispatch = useDispatch();
    const filterCards = useSelector((state) => state.filterCards)

    const handleSwitchChange = (filter) => () => {
        dispatch(toggleFilter(filter))
    }

    return (
        <div className={styles.filterWrapper}>
            <p>Filter:</p>
            <div className={styles.switchWrapper}>
            <Switch  className={styles.switch} checked={filterCards.hot} color="error" onChange={handleSwitchChange('hot')}/>
            <p>Hot</p>
            </div>
            <div className={styles.switchWrapper}>
            <Switch  className={styles.switch} checked={filterCards.important} color="success" onChange={handleSwitchChange('important')}/>
            <p>Important</p>
            </div>
            <div className={styles.switchWrapper}>
            <Switch  className={styles.switch} checked={filterCards.normal} color="primary" onChange={handleSwitchChange('normal')}/>
            <p>Normal</p>
            </div>
        </div>
    )
}

export default Filter;