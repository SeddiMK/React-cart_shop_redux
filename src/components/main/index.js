import './Main.css';
import React from 'react';
import { useDispatch } from 'react-redux';

import GoodsList from '../../containers/GoodsList';
import CartList from '../../containers/CartList';
import Pagination from '../pagination';

import { setCurrentPage } from '../../store/filterSlice';
import { current } from '@reduxjs/toolkit';

export default function Main() {
  const dispath = useDispatch();

  const onChangePage = (number) => {
    dispath(setCurrentPage(number));
  };
  return (
    <main className="main">
      {/* Вывод данных из хранилища */}
      {/* <GoodsList />
      <CartList /> */}
      {/* изменить currentPage!!!!!! */}
      <Pagination currentPage={3} onChangePage={onChangePage} />
    </main>
  );
}
