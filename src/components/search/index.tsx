import styles from './search.module.scss';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';

import { searchInpHeader, setCurrentPage } from '../../store/filterSlice';

type SearchProps = {
  value: string;
};

const Search: React.FC<SearchProps> = ({ value }) => {
  const dispatch = useDispatch();
  const [valueSt, setValueSt] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const searchInpValStore = useSelector(
    (state: RootState) => state.filter.searchInpVal
  );
  // кнопка очистки
  // const onClickClear = () => {
  //     setSearchValue('');
  //     setValueSt('');
  // }

  const updateInpSearchValue = useCallback(
    debounce((inp: string) => {
      setSearchValue(inp);
      dispatch(searchInpHeader(inp));
    }, 250),
    []
  );

  // e: React.ChangeEvent<HTMLInputElement>
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (inputRef.current) {
      updateInpSearchValue(inputRef.current.value);
      setValueSt(inputRef.current.value);
    }

    dispatch(setCurrentPage(1));
  };

  const handlerSearchBtn = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // отправить данные в store для поиска
    dispatch(searchInpHeader(searchValue));
  };
  useEffect(() => {
    if (value === '') {
      setValueSt(value);
    } else if (inputRef.current) {
      updateInpSearchValue(inputRef.current.value);
      setValueSt(inputRef.current.value);
    }
  }, [value, searchInpValStore, updateInpSearchValue]);

  return (
    <form className={styles.root}>
      <input
        className={styles.inp}
        ref={inputRef}
        value={valueSt}
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
