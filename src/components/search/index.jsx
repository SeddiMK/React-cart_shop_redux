import styles from './search.module.css'

import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';


import { searchInpHeader } from '../../store/filterSlice';

export default function Search() {
    const dispatch = useDispatch();
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
            // handlerSearchBtn();
        }, 250),
        [])
    
    console.log(searchValue,'before debounce');
    
    const onChangeInput = (e) => {
        setValue(e.target.value);
        updateInpSearchValue(e.target.value);
    } 

    const handlerSearchBtn = (e) => {
        e.preventDefault();
        // отправить данные в store для поиска
        dispatch(searchInpHeader(searchValue))
    }

    return (
        
        <form className={styles.root} >
            <input className={styles.inp} ref={inputRef} value={value} onChange={onChangeInput} type="search" placeholder="Search..." />
            <button type="search" onClick={handlerSearchBtn} className={styles.btn}></button>
        </form>
        
)
};

