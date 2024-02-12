import styles from './sort.module.scss';

import React, { useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import { useDispatch, useSelector } from 'react-redux';

export const listSort = [
  {
    name: 'возрастанию популярности',
    sortProperty: 'rating',
  },
  {
    name: 'убыванию популярности',
    sortProperty: '-rating',
  },
  {
    name: 'возрастанию цены',
    sortProperty: 'cost',
  },
  {
    name: 'убыванию цены',
    sortProperty: '-cost',
  },
];

export default function Sort({ value, onChangeSort }) {
  const [open, setOpen] = useState(false);
  const nameSort = useSelector((state) => state.filter.sort);

  const onClickListItem = (i) => {
    onChangeSort(i);
    setOpen(false);
  };

  return (
    <div className={'sort ' + styles.root}>
      <p className={'sort__label ' + styles.root}>
        <span>Сортировка по:</span>
        <span onClick={() => setOpen(!open)}>{nameSort.name}</span>
      </p>
      {open && (
        <div className={'sort__popup ' + styles.root}>
          <ul name="sort">
            {listSort.map((obj, i) => (
              <li
                onClick={() => onClickListItem(obj)}
                key={obj + i}
                value={i}
                className={
                  value.sortProperty === obj.sortProperty ? 'active' : ''
                }>
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
