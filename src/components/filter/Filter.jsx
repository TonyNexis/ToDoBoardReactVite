import styles from './Filter.module.scss'

const Filter = () => {
    return (
        <div className={styles.filterWrapper}>
            <p>Filter:</p>
            <p>Hot</p>
            <p>Important</p>
            <p>Normal</p>
        </div>
    )
}

export default Filter;