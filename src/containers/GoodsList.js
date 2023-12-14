import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';

import Goods from '../components/Goods';
import { increment } from '../store/cartSlice';

// get data from store
// list data
export default function GoodsList() {
  const goods = useSelector(selectGoods);
  const dispath = useDispatch();

  let clickHandler = (e) => {
    e.preventDefault();
    let targ = e.target;

    if (!targ.classList.contains('add-to-cart')) {
      return true;
    }
    dispath(increment(targ.getAttribute('data-key')));
  };

  return (
    <>
      <div className="goods-field" onClick={clickHandler}>
        {goods.map((el) => (
          <Goods
            title={el.title}
            cost={el.cost}
            image={el.image}
            articul={el.articul}
            key={el.articul}
          />
        ))}
      </div>
    </>
  );
}
