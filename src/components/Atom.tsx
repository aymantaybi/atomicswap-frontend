import React from 'react';
import styles from './Atom.module.css';

function Atom() {
    return (
        <div className={styles.atom}>
            <div className={styles.electron} />
            <div className={styles.electron} />
            <div className={styles.electron} />
        </div>
    )
}

export default Atom