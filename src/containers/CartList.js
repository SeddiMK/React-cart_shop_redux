import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fullQuantity,
  selectCostFlag,
  selectCurrensy,
  selectGoods,
  fullQuantityGoods,
} from '../store/goodsSlice';
import { selectCart, minus, del } from '../store/cartSlice';
import Cart from '../components/cart/Cart';

export default function CartList() {
  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);

  const cartClass = document.querySelector('.goods-table');
  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);
  // const [fullQuantitySt, setFullQuantity] = useState(0);

  const dispath = useDispatch();

  // переидексирую массив товара
  const goodsObj = goods.reduce((accum, item) => {
    accum[item['articul']] = item;
    return accum;
  }, {});

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
  const fullPrice = Object.keys(cart).map((el) => {
    let fullPr = 0;
    fullPr +=
      (!selCostFlag
        ? goodsObj[el]['cost']
        : (goodsObj[el]['cost'] / 95).toFixed(0)) * cart[el];
    return fullPr;
  });

  // full Quantity
  // let fullQuantity = 0;
  // let fullQuantitySumm = Object.keys(cart).map(
  //   (el) => (fullQuantity += Number(cart[el]))
  // );
  console.log(fullQuantityGoodsCart);
  const fullQuantity = () => {
    if (fullQuantityGoodsCart !== undefined) {
      dispath(fullQuantity(Object.values(cart).reduce((a, b) => a + b, 0)));
    }
  };

  // setFullQuantity(fullQuantityGoodsCart);

  // if (fullQuantitySt === 0 && cartClass.classList.contains('activ')) {
  //   cartClass.classList.remove('activ');
  // }
  // useEffect(() => {
  //   if (fullQuantitySt === 0 && cartClass.classList.contains('activ')) {
  //     cartClass.classList.remove('activ');
  //   }
  // });

  return (
    <div className="main__goods-table goods-table" onClick={clickHandler}>
      {/* fullGoods */}
      <ul className="goods-table__full-goods">
        {Object.keys(cart).map((el) => (
          <li className="goods-table__item" key={el + goodsObj[el]['title']}>
            {goodsObj[el]['title']} - {cart[el]}
          </li>
        ))}
      </ul>
      <div className="cart__fullPrice">
        Full price: {fullPrice} {currency}
      </div>
      <div className="goods-table__cart cart">
        {Object.keys(cart).map((el) => (
          <Cart
            title={goodsObj[el]['title']}
            cost={
              !selCostFlag
                ? goodsObj[el]['cost']
                : (goodsObj[el]['cost'] / 95).toFixed(0)
            } //cost={!selCostFlag ? el.cost : (el.cost / 95).toFixed(0)} // курс 1 доллара 95
            currency={currency}
            quantity={cart[el]}
            priceAllItem={
              (!selCostFlag
                ? goodsObj[el]['cost']
                : (goodsObj[el]['cost'] / 95).toFixed(0)) *
                cart[el] +
              ' ' +
              currency
            }
            image={goodsObj[el]['image']}
            articul={goodsObj[el]['articul']}
            key={el + goodsObj[el]['title']}
          />
        ))}
      </div>
    </div>
  );
}
