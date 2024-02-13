import styles from './sort.module.scss';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export const listSort = [
  {
    name: 'increasing popularity',
    sortProperty: 'rating',
  },
  {
    name: 'decreasing popularity',
    sortProperty: '-rating',
  },
  {
    name: 'price increase',
    sortProperty: 'cost',
  },
  {
    name: 'decreasing prices',
    sortProperty: '-cost',
  },
]; // можно вынести в отдельный файл

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
        <span>Sort by:</span>
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
