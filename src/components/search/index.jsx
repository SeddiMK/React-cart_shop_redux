import React,{useCallback, useRef, useState} from 'react';
import debounce from 'lodash.debounce';

import styles from './search.module.css'

export default function Search() {
    const [value, setValue] = useState('');
    const [searchValue, setSearchValue] = useState('');
    const inputRef = useRef();
   
    // кнопка очистки 
    // const onClickClear = () => {
    //     setSearchValue('');
    //     setValue('');
    // }

    const updateInpSearchValue = useCallback(
        debounce((inp) => {
            console.log(inp,'debounce in debounceInpSearch');
            setSearchValue(inp);
        }, 1000),
        [])
    
         console.log(searchValue,'before debounce');
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
        updateInpSearchValue(e.target.value);
    } 

   


    return (
        
        <form className={styles.root} >
            <input className={styles.inp} ref={inputRef} value={value} onChange={onChangeInput} type="search" placeholder="Search..." />
            <button type="search" className={styles.btn}></button>
        </form>
        
)
};

