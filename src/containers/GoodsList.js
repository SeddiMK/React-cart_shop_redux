import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectCostFlag,
  selectCurrensy,
  selectGoods,
} from '../store/goodsSlice';

import Goods from '../components/goods/Goods';
import Skeleton from '../components/goods/Skeleton';
import { increment } from '../store/cartSlice';

// get data from store
// list data
export default function GoodsList() {
  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const dispath = useDispatch();

  //берем данные с бэкенда-------------------------
  // const [goodsItems, setGoodsItems] = useState([]); // изменить если данные берем с сервера
  const [isLoading, setIsLoading] = useState(false); // изменить если данные берем с сервера

  // useEffect(() => {
  //   fetch('url')
  //     .then((res) => res.json)
  //     .then((data) => {
  //       setGoodsItems(data);
  //       if (data) setIsLoading(false);
  //     });
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
