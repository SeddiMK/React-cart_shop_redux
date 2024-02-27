import styles from './search.module.scss';

import React, { useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { searchInpHeader, setCurrentPage } from '../../store/filterSlice';

const Search: React.FC = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  // кнопка очистки
  // const onClickClear = () => {
  //     setSearchValue('');
  //     setValue('');
  // }

  const updateInpSearchValue = useCallback(
    debounce((inp: string) => {
      setSearchValue(inp);
      dispatch(searchInpHeader(inp));
    }, 250),
    []
  );

  const onChangeInput = (e) => {
    updateInpSearchValue(e.target.value);
    setValue(e.target.value);
    dispatch(setCurrentPage(1));
  };

  const handlerSearchBtn = (e) => {
    e.preventDefault();
    // отправить данные в store для поиска
    dispatch(searchInpHeader(searchValue));
  };

  return (
    <form className={styles.root}>
      <input
        className={styles.inp}
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        type="search"
        placeholder="Search..."
      />
      <button
        type="button"
        onClick={handlerSearchBtn}
        className={styles.btn}></button>
    </form>
  );
};

export default Search;
