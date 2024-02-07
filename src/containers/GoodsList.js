import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  selectCostFlag,
  selectCurrensy,
  selectGoods,
} from '../store/goodsSlice';

import Goods from '../components/goods/Goods';
import Skeleton from '../components/goods/Skeleton';
import { increment } from '../store/cartSlice';
import Error from '../components/error';

// get data from store
// list data
export default function GoodsList() {
  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const dispath = useDispatch();

  // data from backend-------------------------
  // const [goodsItems, setGoodsItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // изменить на true если данные берем с сервера
  // const URL = `https://65c21d61f7e6ea59682aa9c7.mockapi.io/data_shop_furniture`; // можно вынести в отдельный файл

  setTimeout(() => setIsLoading(false), 1000); // !!! убрать имитация загрузки с сервера
  // useEffect(() => {
  //   setIsLoading(true);

  //   // fetch('url')
  //   //   .then((res) => res.json())
  //   //   .then((data) => {
  //   //     setGoodsItems(data);
  //   //     if (data) setIsLoading(false);
  //   //   });

  //   const data = axios.get(URL).then((res) => {
  //     setGoodsItems(res.data);
  //     if (res.data) setIsLoading(false);
  //   }).catch((error) =>{
  //   console.log(error);
  // <Error/>
  // };

  //   console.log(data);
  // }, []);
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
