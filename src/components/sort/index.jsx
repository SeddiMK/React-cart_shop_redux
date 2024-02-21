import styles from './sort.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

export const listSort = [
  {
    name: 'popularity',
    sortProperty: '-rating',
  },
  // {
  //   name: 'decreasing popularity',
  //   sortProperty: 'rating',
  // },
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
  const sortRef = useRef();

  const onClickListItem = (i) => {
    onChangeSort(i);
    setOpen(false);
  };

  // закрываем окно вне области клика Sort by
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.composedPath().includes(sortRef.current)) {
        setOpen(false);
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside); //добавляем удаление обработчика, т.к. при ухода со стр стрый обработчик остается! return - сделай при размонтировании
  }, []);

  return (
    <div ref={sortRef} className={'sort ' + styles.root}>
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
