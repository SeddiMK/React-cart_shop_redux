import styles from './sort.module.scss';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Sort, SortPropertyEnum } from '../../store/filterSlice';

export type SortItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export const listSort: SortItem[] = [
  {
    name: 'popularity',
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  // {
  //   name: 'decreasing popularity',
  //   sortProperty: 'rating', //SortPropertyEnum.RATING_DESC
  // },
  {
    name: 'price increase',
    sortProperty: SortPropertyEnum.COST_DESC,
  },
  {
    name: 'decreasing prices',
    sortProperty: SortPropertyEnum.COST_ASC,
  },
]; // можно вынести в отдельный файл

type SortProps = {
  value: SortItem; //=================!!!!!!!!!!!!!!!!!!!!!
  onChangeSort: (obj: {}) => void;
};

const SortPopup: React.FC<SortProps> = ({ value, onChangeSort }) => {
  const [open, setOpen] = useState(false);
  const nameSort = useSelector((state: RootState) => state.filter.sort);
  const sortRef = useRef<HTMLDivElement>(null);

  const onClickListItem = (obj: SortItem) => {
    onChangeSort(obj);
    setOpen(false);
  };

  // закрываем окно вне области клика Sort by
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        composedPath(): Node[];
      };
      if (sortRef.current && !_event.composedPath().includes(sortRef.current)) {
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
          <ul>
            {listSort.map((obj, i) => (
              <li
                onClick={() => onClickListItem(obj)}
                key={i}
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
};

export default SortPopup;
