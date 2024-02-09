import './Main.css';
import React,{useEffect,useSelector} from 'react';
import { useDispatch } from 'react-redux';
// import { selectFilter } from '../redux/filter/selectors';
import qs from 'qs';

import GoodsList from '../../containers/GoodsList';
import CartList from '../../containers/CartList';
import Pagination from '../pagination';

import {setSort, setCurrentPage,setCategoryName } from '../../store/filterSlice';

export default function Main() {
  const dispath = useDispatch();
  // const { categoryId, sort, currentPage } = useSelector(selectFilter); 
  // const categoryId = useSelector((state) => state.filter.categoryName);
  // const currentPage = useSelector((state) => state.filter.currentPage);
  // const sort= useSelector((state) => state.filter.sort);

  const onChangePage = (number) => {
    dispath(setCurrentPage(number));
  };
  // qs строка параметров в URL -------------------------
  // useEffect(() => {
  //   const queryString = qs.stringify({
  //     // sortProperty: sort.sortProperty,
  //     // categoryId,
  //     // currentPage,
  //   });
  //   console.log(queryString);
  // }, [categoryId,currentPage]);

  // end -------------------------

  return (
    <main className="main">
      {/* Вывод данных из хранилища */}
      <GoodsList />
      <CartList />
      {/* изменить currentPage!!!!!! */}
      <Pagination currentPage={1} onChangePage={onChangePage} />
    </main>
  );
}
