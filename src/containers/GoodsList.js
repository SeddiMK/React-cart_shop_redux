import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import qs from 'qs';

import {
  selectCostFlag,
  selectCurrensy,
  selectGoods,
  setGoodsValArr,
} from '../store/goodsSlice';
import { increment, selectCart } from '../store/cartSlice';
import { setFilters } from '../store/filterSlice';
import { fetchFurniture } from '../store/furnitureSlice';

import Goods from '../components/goods/Goods';
import Skeleton from '../components/sceleton/Skeleton';
import { listSort } from '../components/sort';
import Error from '../components/error';

// get data from store
// list data
export default function GoodsList() {
  const dispath = useDispatch();
  const navigate = useNavigate();
  const isSearch = useRef(false); // флаг первого рендера
  const isMounted = useRef(false); // если мы делали что нибудь на стр, то первый рендер был

  let { searchInpVal, categoryName, currentPage, sort } = useSelector(
    (state) => state.filter
  );

  let { items, status } = useSelector((state) => state.furniture);

  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);

  // data from backend-------------------------

  // setTimeout(() => setIsLoading(false), 1000); // !!! убрать имитация загрузки с сервера

  const axiosGoods = () => {
    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'desc' : 'asc'; // убыванию или возрастанию с помощью тернарного оператора
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

  //проверяем URL-параметры и сохраняем в redux
  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = listSort.find(
        (obj) => obj.sortProperty === params.sortProperty
      );
      dispath(setFilters({ ...params, sort }));

      isSearch.current = true; //флаг первого рендера
    }
  }, []);

  // делаем чтобы не было 2 запроса, т.к. useEffect первый рендер делает васегда
  useEffect(() => {
    document.getElementById('root').scrollIntoView(); // при перерисовке скорит на верх стр

    //если был первый рендер, то запрашиваем данные
    if (!isSearch.current) {
      axiosGoods();
    }
    isSearch.current = false;
  }, [currentPage, sort.sortProperty, categoryName, searchInpVal]);

  // alert -----------------------
  useEffect(() => {
    //если был первый рендер, то запрашиваем данные
    // !isSearch.current
    if (!isMounted.current) {
      alert(
        'Внимание! Для отображения корзины сначала выберите все фильры, потом добавляйте товар в корзину.'
      );
    }
    isSearch.current = false;
  }, []);

  // qs строка параметров в URL -------------------------
  useEffect(() => {
    // проверяем произошел ли первый рендер или изменились ли параметры
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryName,
        currentPage,
        searchInpVal,
      });

      navigate(`?${queryString}`);
    }
    isMounted.current = true; // произoшeл первый рендер
  }, [categoryName, currentPage, sort.sortProperty, searchInpVal, navigate]);

  // при изменении furnitureSlice вносим изменения
  useEffect(() => {
    if (status === 'success') dispath(setGoodsValArr(items));
  }, [status, items, dispath]);

  //=clickHandler===============================
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
                  <div className="goods-wraper" key={el.articul}>
                    <Link to={`/fullOptions/${el.articul}`}>
                      <Goods
                        quantityOneGoods={cart[el.articul]}
                        title={el.title}
                        cost={
                          !selCostFlag ? el.cost : (el.cost / 95).toFixed(0)
                        } // курс 1 доллара 95
                        image={el.image}
                        articul={el.articul}
                        rating={el.rating}
                        description={el.description}
                        currency={currency}
                      />
                    </Link>
                    <button
                      className="goods-block__add-to-cart  btn add-to-cart"
                      data-key={el.articul}>
                      Add to cart <span>{cart[el.articul]}</span>
                    </button>
                  </div>
                ))}
          </>
        )}
      </div>
    </>
  );
}
