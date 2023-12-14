import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';

import { selectCart, minus, del } from '../store/cartSlice';

import Cart from '../components/Cart';

export default function CartList() {
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);
  const dispath = useDispatch();

  // переидексирую массив товара
  const goodsObj = goods.reduce((accum, item) => {
    accum[item['articul']] = item;
    return accum;
  }, {});

  // console.log(goodsObj);

  let clickHandler = (e) => {
    e.preventDefault();
    let targ = e.target;
    if (targ.classList.contains('delete-one-position')) {
      dispath(minus(targ.getAttribute('data-key')));

      // return true;
    }
    if (targ.classList.contains('delete-quantity')) {
      dispath(del(targ.getAttribute('data-key')));
      // return true;
    }
  };

  //full price
  let fullPrice = 0;
  Object.keys(cart).map((el) => {
    fullPrice += goodsObj[el]['cost'] * cart[el];
    return fullPrice;
  });

  return (
    <div className="goods-table" onClick={clickHandler}>
      <ul>
        {Object.keys(cart).map((el) => (
          <li key={el + goodsObj[el]['title']}>
            {goodsObj[el]['title']} - {cart[el]}
          </li>
        ))}
      </ul>

      <div>
        {Object.keys(cart).map((el) => (
          <Cart
            title={goodsObj[el]['title']}
            cost={goodsObj[el]['cost']}
            quantity={cart[el]}
            priceAllItem={goodsObj[el]['cost'] * cart[el]}
            image={goodsObj[el]['image']}
            articul={goodsObj[el]['articul']}
            key={el + goodsObj[el]['title']}
          />
        ))}
        <div className="fullPrice">Full price: {fullPrice}</div>
      </div>
    </div>
  );
}
