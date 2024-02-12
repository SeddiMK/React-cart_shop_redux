import styles from './sort.module.css';

import React, { useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch } from 'react-redux';

import { searchInpHeader, setCurrentPage } from '../../store/filterSlice';

export default function Sort({ value, onChangeSort }) {
  const [open, setOpen] = useState(false);
  const listSort = {
    rating: 'По популярности',
    costAsk: 'Цена - по возрастанию',
    costDesk: 'Цена - по убыванию',
  };
  const sortName = listSort[value];

  const onClickListItem = (i) => {
    onChangeSort(i);
    setOpen(false);
  };
  return (
    <div className="sort">
      <div className="sort__label">Сортировка по:</div>
      {open && (
        <div className={'sort__popup ' + styles.root}>
          <ul
            name="sort"
            className={'cart-header__sort select--header ' + styles.root}
            onChange={(e) => onChangeSort(e.target.value)}>
            {Object.values(listSort).map((sortName, i) => (
              <li
                onClick={() => onClickListItem(i)}
                key={sortName + i}
                className={value === i ? 'active' : ''}>
                {sortName}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
