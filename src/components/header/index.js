import './Header.css';
import '../../app/Common.css';

import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Burger from '../burger';
import Search from '../search';
import Categories from '../categories';
import Sort from '../sort';

import {
  selCostFlag,
  selCurrensy,
  fullQuantityGoods,
} from '../../store/goodsSlice';
import {
  setCategoryName,
  setCurrentPage,
  setSort,
} from '../../store/filterSlice';
import { cartOpen } from '../../store/cartSlice';
import { fetchFurniture } from '../../store/furnitureSlice';

export default function Header() {
  const dispath = useDispatch();
  const [sortValue] = useState(0);
  const categoryName = useSelector((state) => state.filter.categoryName);
  let cartOpenSt = useSelector((state) => state.cartVal.cartOpen);

  // data-header-nav-link --// можно вынести в отдельный файл------------
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
  const [resetWindow, setResetWindow] = useState();
  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);
  // const cartClass = document.querySelector('.goods-table');------------------------

  // filter select category
  const handlerSelCategory = (e) => {
    if (e.toLowerCase().replace(' ', '') === 'allgoods') {
      dispath(setCategoryName(''));
    } else {
      dispath(setCategoryName(e.toLowerCase().replace(' ', '')));
    }
    dispath(setCurrentPage(1));
  };

  // filter select sort
  const handlerSelSort = (e) => {
    dispath(setSort(e));
    dispath(setCurrentPage(1));
  };

  const handlerSelCurrency = (e) => {
    dispath(selCostFlag(e.target.value !== 'RUB'));
    dispath(selCurrensy(e.target.value));
  };

  const handleCart = () => {
    if (fullQuantityGoodsCart !== 0) {
      // if (cartClass && fullQuantityGoodsCart !== 0)
      // cartClass.classList.toggle('activ');
      dispath(cartOpen(!cartOpenSt));
    }
  };

  const handleLogo = () => {
    dispath(
      fetchFurniture({
        sortBy: 'rating',
        order: 'desc',
        searchCategoryFilter: '',
        searchInpValData: '',
        currentPage: '1',
      })
    );
    // баг с  searchCategoryFilter !!!
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  console.log(categoryName, 'categoryName');
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
          <Link to="/" className="header__logo" onClick={handleLogo}>
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
            <Sort value={sortValue} onChangeSort={handlerSelSort} />
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
