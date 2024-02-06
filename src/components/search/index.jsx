import React from 'react';

import styles from './Search.module.css'

export default function Search() {
    return (
        
        <form className={styles.root} >
            <input className={styles.inp} type="search" placeholder="Search..." />
            <button type="search" className={styles.btn}></button>
        </form>
        
)
};