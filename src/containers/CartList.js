import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fullQuantityGoods,
  fullQuantity,
  selectCostFlag,
  selectCurrensy,
  selectGoods,
} from '../store/goodsSlice';
import { selectCart, minus, del } from '../store/cartSlice';
import Cart from '../components/cart/Cart';

export default function CartList() {
  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);

  // let [quantityFull, setQuantityFull] = useState(0);
  // const cartClass = document.querySelector('.goods-table');
  const cartClass = document.getElementById('goodsTable');
  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);
  const dispath = useDispatch();

  // переидексирую массив товара
  const goodsObj = goods.reduce((accum, item) => {
    accum[item['articul']] = item;
    return accum;
  }, {});

  //full price
  // let fullPrice = 0;
  // Object.keys(cart).map((el) => {
  //   return (fullPrice +=
  //     (!selCostFlag
  //       ? goodsObj[el]['cost']
  //       : (goodsObj[el]['cost'] / 95).toFixed(0)) * cart[el]);
  // });

  const fullPriceArr = Object.keys(cart).map((el) => {
    let price = 0;
    return (price +=
      (!selCostFlag
        ? goodsObj[el]['cost']
        : (goodsObj[el]['cost'] / 95).toFixed(0)) * cart[el]);
  });

  const fullPrice = () => {
    let sum = 0;
    for (let i = 0; i < fullPriceArr.length; i++) {
      sum += fullPriceArr[i];
    }
    return sum;
  };
  // setQuantityFull(fullPrice());
  console.log(fullPrice());

  console.log(fullPriceArr);

  //=========================================================
  // full Quantity
  // let fullQuantity = 0;
  // let fullQuantitySumm = Object.keys(cart).map(
  //   (el) => (fullQuantity += Number(cart[el]))
  // );
  //=========================================================
  useEffect(() => {
    if (fullQuantityGoodsCart !== undefined) {
      dispath(fullQuantity(Object.values(cart).reduce((a, b) => a + b, 0)));
    }
  });

  let clickHandler = (e) => {
    e.preventDefault();

    let targ = e.target;
    // if (!targ.classList.contains('goods-table')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим
    if (targ.classList.contains('delete-one-position')) {
      dispath(minus(targ.getAttribute('data-key')));
      if (fullQuantityGoodsCart <= 1) cartClass.classList.remove('activ');
    }
    if (targ.classList.contains('delete-quantity')) {
      dispath(del(targ.getAttribute('data-key')));

      // fullQuantityGoodsCart = 0;
      console.log(fullQuantityGoodsCart, 'click handler');
      console.log(fullPrice(), 'arrrrrrrrrrrrrrrrrrrrrrrrrrrrrr');
      // if (fullPriceArr === []) cartClass.classList.remove('activ');
    }
  };
  console.log(fullQuantityGoodsCart, 'function');
  // console.log(
  //   cartClass.classList.contains('goods-table') == null,
  //   '1111111111111111111111111111'
  // );
  useEffect(() => {
    console.log(fullQuantityGoodsCart, 'use Effect');
    console.log(fullPrice());
    console.log(cartClass);
    // if (fullQuantityGoodsCart === 0) cartClass.classList.remove('activ');
  });

  return (
    <div className="main__goods-table" onClick={clickHandler}>
      {/* fullGoods */}
      <ul className="goods-table__full-goods">
        {Object.keys(cart).map((el) => (
          <li className="goods-table__item" key={el + goodsObj[el]['title']}>
            {goodsObj[el]['title']} - {cart[el]}
          </li>
        ))}
      </ul>
      <div className="cart__full-price">
        Full price: {fullPrice()} {currency}
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
