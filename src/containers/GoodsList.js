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
import { increment, selectCart } from '../store/cartSlice';
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
  const cart = useSelector(selectCart);

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

    const searchInpValData = searchInpVal ? searchInpVal : '';

    axios
      .get(
        `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture?limit=2&page=${currentPage}&sortBy=${sortBy}&order=${order}&search=${searchInpValData}&filter=${searchCategoryFilter}`
      ) //limit=должен давать бэкенд(mockapi.io- не дает всех страниц от количетва товара)&sortBy=cost&order=asc&page=${currentPage}&search=${valFilterSearch}&rating= можно вынести в отдельный файл
      .then((res) => {
        console.log(res.data, 'axiosssss');
        if (res.data) setIsLoading(false);
        dispath(selGoodsValArr(res.data));
        // dispath(goods(res.data));
        // return res.data;
      })
      .catch((error) => {
        console.log(error);
        // return <Error />;
      });
  };

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
    navigate,
  ]);

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
  }, []);

  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // делаем чтобы не было 2 запроса, т.к. useEffect первый рендер делает васегда
  useEffect(() => {
    window.scrollTo(0, 0); // при перерисовке скорит на верх стр
    console.log(!isSearch.current, '!isSearch.current--- для запроса!!!');
    isSearch.current = false; //!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    //если был первый рендер, то запрашиваем данные
    if (!isSearch.current) {
      axiosGoods();
    }
    isSearch.current = false;
  }, [currentPage, sortType.sortProperty, categoryName, searchInpVal]);

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
                quantityOneGoods={cart[el.articul]}
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
