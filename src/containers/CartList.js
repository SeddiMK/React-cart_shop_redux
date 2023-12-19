import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectGoods } from '../store/goodsSlice';

import { selectCart, minus, del } from '../store/cartSlice';

import Cart from '../components/cart/Cart';

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
      // для ярлыка удаления в корзине !!!!!!!
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

  // full Quantity
  // let fullQuantity = 0;
  // let fullQuantitySumm = Object.keys(cart).map(
  //   (el) => (fullQuantity += Number(cart[el]))
  // );
  let fullQuantity = () => Object.values(cart).reduce((a, b) => a + b, 0);

  console.log(cart);
  console.log(fullQuantity()); // количество товаров всего, для ярлыка корзины

  return (
    <div className="main__goods-table goods-table" onClick={clickHandler}>
      {/* fullGoods */}
      <ul className="goods-table__full-goods">
        {Object.keys(cart).map((el) => (
          <li key={el + goodsObj[el]['title']}>
            {goodsObj[el]['title']} - {cart[el]}
          </li>
        ))}
      </ul>

      <div className="goods-table__cart cart">
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
        <div className="cart__fullPrice">Full price: {fullPrice}</div>
      </div>
    </div>
  );
}
