import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import qs from 'qs';
import axios from 'axios';

import {
  selectCostFlag,
  selectCurrensy,
  selectGoods,
  selGoodsValArr,
} from '../store/goodsSlice';
import { increment } from '../store/cartSlice';
import {
  setCurrentPage,
  setFilters,
  setSort,
  categoryName,
} from '../store/filterSlice';

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

  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);

  // data from backend-------------------------

  // const [goodsItems, setGoodsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // изменить на true если данные берем с сервера

  const axiosGoods = () => {
    setIsLoading(true); // обновляем set загрузки

    // setTimeout(() => setIsLoading(false), 1000); // !!! убрать имитация загрузки с сервера
    const sortBy = sortType.sortProperty.replace('-', '');
    const order = sortType.sortProperty.includes('-') ? 'desc' : 'asc'; // убыванию или возрастанию с помощью тернарного оператора

    const searchCategoryFilter =
      categoryName !== 'allgoods' ? `${categoryName}` : '';
    console.log(searchInpVal, 'searchInpVal');

    const searchInpValData = searchInpVal ? searchInpVal : '';
    // const searchInpValCategory = () => {
    //   if (searchInpVal) return searchInpVal;
    //   else return searchCategoryFilter;
    // };

    axios
      .get(
        `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?page=${currentPage}&limit=5&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}` //limit=должен давать бэкенд(mockapi.io- не дает всех страниц)&sortBy=cost&order=asc&page=${currentPage}&search=${valFilterSearch}&rating= можно вынести в отдельный файл ${searchCategoryFilter}${searchInpVal}
      )
      .then((res) => {
        console.log(res.data, 'axiosssss');
        if (res.data) setIsLoading(false);
        dispath(selGoodsValArr(res.data));
        // return res.data;
      })
      .catch((error) => {
        console.log(error);
        // return <Error />;
      });
  };

  // qs строка параметров в URL -------------------------

  useEffect(() => {
    // проверяем произошел ли первый рендер
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryName,
        currentPage,
      });

      console.log(queryString);

      navigate(`?${queryString}`);
    }
    isMounted.current = true; // произoшeл первый рендер
  }, [categoryName, currentPage, sortType.sortProperty, navigate]);

  //проверяем URL-параметры и сохо в redux
  useEffect(() => {
    console.log(Boolean(window.location.search), 'window.location.search');
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = listSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispath(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // делаем чтобы не было 2 запроса, т.к. useEffect первый рендер делает васегда
  useEffect(() => {
    window.scrollTo(0, 0); // при перерисовке скорит на верх стр

    console.log(!isSearch.current, '!isSearch.current------------');

    if (!isSearch.current) {
      axiosGoods();
    }
    isSearch.current = false;
  }, [
    currentPage,
    sortType.sortProperty,
    categoryName,
    searchInpVal,
    sortType,
    dispath,
  ]);

  // end -------------------------
  let clickHandler = (e) => {
    e.preventDefault();
    let targ = e.target;

    if (!targ.classList.contains('add-to-cart')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим

    dispath(increment(targ.getAttribute('data-key')));
  };

  return (
    <>
      <div className="main__goods-field goods-field" onClick={clickHandler}>
        {/* если идет загрузка isLoading=true, то создаем массив и момещаем туда <Skeleton/>, если загрузки нет, то рендерь <Goods/>*/}
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />) // _ -НЕТ ЭЛЕМЕНТОВт.к. ...new Array-это фековый массив с undefined.
          : goods.map((el) => (
              <Goods
                title={el.title}
                cost={!selCostFlag ? el.cost : (el.cost / 95).toFixed(0)} // курс 1 доллара 95
                image={el.image}
                articul={el.articul}
                key={el.articul}
                rating={el.rating}
                description={el.description}
                currency={currency}
              />
            ))}
      </div>
    </>
  );
}
