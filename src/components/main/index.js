import './Main.css';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import GoodsList from '../../containers/GoodsList';
import CartList from '../../containers/CartList';
import Pagination from '../pagination';

import { setCurrentPage, setFilters } from '../../store/filterSlice';

export default function Main() {
  const dispath = useDispatch();
  // const [quantityOneGoods, setQuantityOneGoods] = useState(0);
  // console.log(
  //   quantityOneGoods,
  //   'quantityOneGoods ------ !!!!!!!!!!!!!!!!! in main'
  // );
  // const { categoryName, sort, currentPage } = useSelector(setFilters);
  // const categoryName = useSelector((state) => state.filter.categoryName);
  let currentPage = useSelector((state) => state.filter.currentPage);
  // const sort = useSelector((state) => state.filter.sort);
  // console.log(useSelector((state) => state.filter.currentPage));

  const onChangePage = (number) => {
    dispath(setCurrentPage(number));
  };

  return (
    <main className="main">
      {/* Вывод данных из хранилища */}
      <GoodsList />
      <CartList />

      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </main>
  );
}
