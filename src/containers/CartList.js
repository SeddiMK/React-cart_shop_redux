import React, { useState, useEffect, useRef } from 'react';
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

export default function CartList({ cartIconRef }) {
  const selCostFlag = useSelector(selectCostFlag);
  const currency = useSelector(selectCurrensy);
  const goods = useSelector(selectGoods);
  const cart = useSelector(selectCart);

  const [openCart, setOpenCart] = useState(true);
  const catCartRef = useRef(null);

  const cartClass = document.querySelector('.goods-table');
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

  // setTimeout(() => {
  //   const cartClass = document.querySelector('.goods-table');
  //   console.log(cartClass, '9879878989789789988989');
  //   if (fullQuantityGoodsCart === 0) cartClass.classList.remove('activ');
  // }, 1);

  useEffect(() => {
    // const cartClassUef = document.querySelector('.goods-table');
    // Получаем ссылку на элемент, при клике на который, скрытие не будет происходить
    const cartClassUef = document.getElementsByClassName('goods-table')[0];
    //===============================================================
    if (fullQuantityGoodsCart === 0) cartClassUef.classList.remove('activ');
    // console.log(document.addEventListener('click', ));

    //====================================================================================
  }, [fullQuantityGoodsCart]);

  let clickHandler = (e) => {
    e.preventDefault();

    let targ = e.target;
    // if (!targ.classList.contains('goods-table')) return true; // если клик не по кнопке с классом(add-to-cart), то уходим
    if (targ.classList.contains('delete-one-position')) {
      dispath(minus(targ.getAttribute('data-key')));
      // if (fullQuantityGoodsCart <= 1) cartClass.classList.remove('activ');
    }
    if (targ.classList.contains('delete-quantity')) {
      dispath(del(targ.getAttribute('data-key')));
    }
  };
  // cart close in btn-close ===========================================================================

  const hadlerClose = (e) => {
    if (cartClass && fullQuantityGoodsCart !== 0) {
      // setOpenCartSt(false);
      cartClass.classList.toggle('activ');
    }
  };
  // cart close in window ===========================================================================
  useEffect(() => {
    console.log('cart Mount');
    const cartIcon = document.getElementsByClassName('cart-btn')[0];

    console.log(catCartRef.current, 'catCartRef.current');

    const handleClickOutside = (e) => {
      if (
        ![catCartRef.current, cartIcon].some((x) =>
          e.composedPath().includes(x)
        )
      ) {
        console.log('нажали на catCartRef');
        setOpenCart(false);
        catCartRef.current.classList.remove('activ');
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside); //unMount- сработает при размонтировании, при ухода со стр!
  }, []);
  console.log(openCart);
  //  ===========================================================================

  return (
    <section className="main__goods-table-wrapper goods-table" ref={catCartRef}>
      <div className="main__goods-table" onClick={clickHandler}>
        {/* fullGoods */}
        <div className="goods-table__full-goods-block">
          <ul className="goods-table__full-goods">
            {Object.keys(cart).map((el) => (
              <li
                className="goods-table__item"
                key={el + goodsObj[el]['title']}>
                {goodsObj[el]['title']} - {cart[el]}
              </li>
            ))}
          </ul>
          <div
            className="goods-table__full-goods-close"
            onClick={hadlerClose}></div>
        </div>
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
    </section>
  );
}
