import './Header.css';
import '../../app/Common.css';

import React, { useEffect, useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Burger from '../burger';
import Search from '../search';
import Categories from '../categories';

import {
  selCostFlag,
  selCurrensy,
  fullQuantityGoods,
} from '../../store/goodsSlice';
import { setCategoryName } from '../../store/filterSlice';

export default function Header() {
  const dispath = useDispatch();
  // data-header-nav-link --------------
  const linkHeaderArr = [
    'Home',
    'Products',
    'Discount',
    'HITs',
    'About us',
    'Contacts',
  ];
  const linkHeaderAuthArr = ['Sig in', 'Registration', 'Logout'];
  // end -----------------

  const [burgerClick, setBurgerClick] = useState(false);

  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);
  const cartClass = document.querySelector('.goods-table');

  // filter select category
  const handlerSelCategory = (e) => {
    dispath(setCategoryName(e));
  };
  // end

  const handlerSelCurrency = (e) => {
    dispath(selCostFlag(e.target.value !== 'RUB'));
    dispath(selCurrensy(e.target.value));
  };

  const handleCart = () => {
    if (cartClass && fullQuantityGoodsCart !== 0) {
      cartClass.classList.toggle('activ');
    }
  };

  // useEffect(() => {
  //   const navHeaderLeft = document.getElementsByClassName('menu__list-left');
  //   console.log(navHeaderLeft);
  //   console.log(burgerClick, 'burgerClick');
  //   // if (burgerClick) console.log(navHeaderLeft.classList.contains('is-open'));
  // }, [burgerClick]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo-burger">
          <Link to="/" className="header__logo">
            ME
            {/* <img src="#" alt="Image logo" /> */}
          </Link>
          {/* Menu Burger */}
          <div onClick={() => setBurgerClick(!burgerClick)}>
            <Burger />
          </div>
        </div>
        <nav className="header__nav menu">
          {/* {'menu__list-left' + (burgerClick ? ' activ-nav' : '')}  */}
          <ul className={'menu__list-left' + (burgerClick ? ' activ-nav' : '')}>
            {linkHeaderArr.map((el, i) => (
              <li className="menu__item" key={el + i}>
                {/* автоматически добавляет название из массива linkHeaderArr в Link to(href) */}
                <NavLink
                  to={
                    '/' +
                    (el.toLowerCase().trim().split(' ')[0] === 'home'
                      ? ''
                      : el.toLowerCase().trim().split(' ')[0])
                  }
                  className="menu__link">
                  {el}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="header__search-cart block-search-cart">
            <Search />

            <div className="block-search-cart__cart cart-header">
              <div className="cart-header__icon">
                <span className="cart-header__cart-icon" onClick={handleCart}>
                  <button className="cart-header__btn cart-btn"></button>
                </span>
                <span className="cart-header__quantity-goods">
                  {fullQuantityGoodsCart}
                </span>
              </div>

              <select
                name="currency"
                onChange={handlerSelCurrency}
                className="cart-header__currency select--header">
                <option value="RUB">RUB</option>
                <option value="USD">USD</option>
              </select>

              <Categories onChangeCategories={handlerSelCategory} />
            </div>
          </div>
          <ul className="menu__list-right list-right auth_block">
            {linkHeaderAuthArr.map((el, i) => (
              <li className="menu__item" key={el + i}>
                <NavLink to={`/${el.toLowerCase()}`} className="menu__link">
                  {el}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
