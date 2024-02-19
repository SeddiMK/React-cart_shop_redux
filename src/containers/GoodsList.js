import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';
import axios from 'axios';

import {
  selectCostFlag,
  selectCurrensy,
  selectGoods,
  setGoodsValArr,
} from '../store/goodsSlice';
import { increment, selectCart } from '../store/cartSlice';
import {
  setCurrentPage,
  setFilters,
  setSort,
  categoryName,
} from '../store/filterSlice';
import { fetchFurniture, setItems } from '../store/furnitureSlice';

import Goods from '../components/goods/Goods';
import Skeleton from '../components/sceleton/Skeleton';
import { listSort } from '../components/sort';
import Error from '../components/error';

// get data from store
// list data
export default function GoodsList() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false);
  const isMounted = useRef(false); // если мы делали что нибудь на стр, то первый рендер был

  let searchInpVal = useSelector((state) => state.filter.searchInpVal);
  let categoryName = useSelector((state) => state.filter.categoryName);
  let currentPage = useSelector((state) => state.filter.currentPage);
  let sortType = useSelector((state) => state.filter.sort);

  let { items, status, loading } = useSelector((state) => state.furniture);

  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);

  //проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = listSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispath(setFilters({ ...params, sort }));

      console.log('-----------------был первый рендер--------------------');
      isSearch.current = true; //флаг первого рендера
    }
  }, [dispath]);
  // data from backend-------------------------

  // setTimeout(() => setIsLoading(false), 1000); // !!! убрать имитация загрузки с сервера
  // делаем чтобы не было 2 запроса, т.к. useEffect первый рендер делает васегда
  const axiosGoods = () => {
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc'; // убыванию или возрастанию с помощью тернарного оператора
    const searchCategoryFilter =
      categoryName !== 'allgoods' ? `${categoryName}` : '';
    const searchInpValData = searchInpVal ? searchInpVal : '';

    dispath(
      fetchFurniture({
        sortBy,
        order,
        searchCategoryFilter,
        searchInpValData,
        currentPage,
      })
    );

    document.getElementById('root').scrollIntoView(); // при перерисовке скорит на верх стр
  };

  useEffect(() => {
    document.getElementById('root').scrollIntoView(); // при перерисовке скорит на верх стр

    console.log(isSearch.current, '!isSearch.current--- для запроса!!!');

    // isSearch.current = false; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //если был первый рендер, то запрашиваем данные
    if (!isSearch.current) {
      axiosGoods();
    }

    isSearch.current = false;
  }, [currentPage, sortType.sortProperty, categoryName, searchInpVal]);

  // end -------------------------

  // qs строка параметров в URL -------------------------
  useEffect(() => {
    // проверяем произошел ли первый рендер или изменились ли параметры
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryName,
        currentPage,
        searchInpVal,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true; // произoшeл первый рендер
  }, [
    categoryName,
    currentPage,
    sortType.sortProperty,
    searchInpVal,
    items,
    navigate,
  ]);

  // при изменении furnitureSlice вносим изменения
  useEffect(() => {
    if (status === 'success') dispath(setGoodsValArr(items));
  }, [status, items, dispath]);

  //=end===============================
  let clickHandler = (e) => {
    e.preventDefault();
    let targ = e.target;

    if (!targ.classList.contains('add-to-cart')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим

    dispath(increment(targ.getAttribute('data-key')));
  };

  // if (loading) return <p className="loading"> Загрузка...</p>; //загрузка...
  return (
    <>
      <div className="main__goods-field goods-field" onClick={clickHandler}>
        {status === 'error' ? (
          <Error />
        ) : (
          <>
            {status === 'loading'
              ? [...new Array(10)].map((_, i) => <Skeleton key={i} />)
              : goods.map((el) => (
                  <Goods
                    key={el.articul}
                    quantityOneGoods={cart[el.articul]}
                    title={el.title}
                    cost={!selCostFlag ? el.cost : (el.cost / 95).toFixed(0)} // курс 1 доллара 95
                    image={el.image}
                    articul={el.articul}
                    rating={el.rating}
                    description={el.description}
                    currency={currency}
                  />
                ))}
          </>
        )}
      </div>
    </>
  );
}
