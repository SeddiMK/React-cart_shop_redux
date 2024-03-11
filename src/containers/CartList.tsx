import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

import {
  fullQuantityGoods,
  fullQuantity,
  selectCostFlag,
  selectCurrensy,
} from '../store/goodsSlice';
import {
  selectCart,
  minus,
  del,
  cartOpen,
  selectCartOpenSt,
  CartItem,
  selectCartOpenErrorSt,
} from '../store/cartSlice';
import { itemsReindexing } from '../store/furnitureSlice';

import Cart from '../components/cart/Cart';
import ErrorBeckend from '../components/ErrorBeckend';
import { useAppDispatch } from '../store';

const CartList: React.FC = () => {
  const dispath = useAppDispatch();
  const selCartOpenSt: boolean = useSelector(selectCartOpenSt);
  const selCartOpenErrorSt: boolean = useSelector(selectCartOpenErrorSt);
  const selCostFlag: boolean = useSelector(selectCostFlag);
  const currency: string = useSelector(selectCurrensy);
  const goodsReindex: any = useSelector(itemsReindexing);
  const cart: CartItem = useSelector(selectCart);

  const catCartRef = useRef(null);

  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);

  // fullPrice ----------------------------------------------------------
  const fullPrice = (): number => {
    const fullPriceArr: number[] = Object.keys(cart).map((el) => {
      const priceInObj: number = goodsReindex[el].cost;

      let price: number = 0;
      return (price += (Number(
        !selCostFlag && goodsReindex ? priceInObj : priceInObj / 95
      ) * cart[el]) as number);
    });

    let sum: number = 0;
    for (let i = 0; i < fullPriceArr.length; i++) {
      sum += fullPriceArr[i];
    }
    return sum;
  };

  //=========================================================
  useEffect(() => {
    if (fullQuantityGoodsCart !== undefined) {
      dispath(
        fullQuantity(
          Object.values(cart).reduce((a: number, b: number) => a + b, 0)
        )
      );
    }
  }, [cart, fullQuantityGoodsCart, dispath]);

  useEffect(() => {
    if (selCartOpenSt && fullQuantityGoodsCart === 0) dispath(cartOpen(false));
  }, [fullQuantityGoodsCart, selCartOpenSt, dispath]);

  // cart close in btn-close ===========================================================================
  const hadlerClose = (e: any) => {
    if (catCartRef.current && fullQuantityGoodsCart !== 0) {
      // catCartRef.current.classList.toggle('activ');
      dispath(cartOpen(false));
    }
  };
  // cart close in window ===========================================================================
  useEffect(() => {
    const cartIcon: Element = document.getElementsByClassName('cart-btn')[0];

    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        composedPath(): Node[];
      };
      if (
        ![catCartRef.current, cartIcon].some(
          (x: Element | null) => x && _event.composedPath().includes(x)
        )
      ) {
        dispath(cartOpen(false));
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside); //unMount- сработает при размонтировании, при ухода со стр! //добавляем удаление обработчика, т.к. при ухода со стр стрый обработчик остается! return - сделай при размонтировании
  }, []);

  //========clickHandler============================================================================
  let clickHandler = (e: any) => {
    e.preventDefault();

    let targ = e.target;
    if (targ.classList.contains('delete-one-position')) {
      dispath(minus(targ.getAttribute('data-key')));
    }
    if (targ.classList.contains('delete-quantity')) {
      dispath(del(targ.getAttribute('data-key')));
    }
  };

  return (
    <>
      {selCartOpenSt && (
        <section
          className="main__goods-table-wrapper goods-table"
          ref={catCartRef}>
          {selCartOpenErrorSt && Object.keys(cart).length ? (
            <div className="main__goods-table" onClick={clickHandler}>
              <div className="goods-table__full-goods-block">
                <ul className="goods-table__full-goods">
                  {Object.keys(cart).map((el: string, i: number) => {
                    const item = goodsReindex[el];
                    return (
                      <li className="goods-table__item" key={item.title + i}>
                        {item.title} - {cart[el]}
                      </li>
                    );
                  })}
                </ul>
                <div
                  className="goods-table__full-goods-close"
                  onClick={hadlerClose}></div>
              </div>
              <div className="cart__full-price">
                Full price: {fullPrice()} {currency}
              </div>
              <div className="goods-table__cart cart">
                {Object.keys(cart).map((el: string, i: number) => {
                  const item = goodsReindex[el as keyof typeof goodsReindex];

                  return (
                    <Cart
                      key={item.title + i}
                      title={item.title}
                      cost={
                        !selCostFlag ? item.cost : (item.cost / 95).toFixed(0)
                      }
                      currency={currency}
                      quantity={cart[el]}
                      priceAllItem={
                        !selCostFlag
                          ? Number(item.cost) * cart[el]
                          : Number((item.cost / 95).toFixed(0)) * cart[el] +
                            ' ' +
                            currency
                      }
                      image={item.image}
                      articul={item.articul}
                    />
                  );
                })}
              </div>
            </div>
          ) : (
            <ErrorBeckend />
          )}
        </section>
      )}
    </>
  );
};

export default CartList;
