import './Header.scss';
import '../../app/Common.scss';

import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Burger from '../burger';
import Search from '../search';
import Categories from '../categories';
import SortPopup from '../sort';

import {
  selCostFlag,
  selCurrensy,
  fullQuantityGoods,
} from '../../store/goodsSlice';
import {
  Sort,
  setCategoryName,
  setCurrentPage,
  setSort,
} from '../../store/filterSlice';
import {
  CartItem,
  cartOpen,
  selectCart,
  selectCartOpenSt,
  selectCartOpenErrorSt,
  cartOpenError,
} from '../../store/cartSlice';
import {
  SearchFurnitureParams,
  fetchFurniture,
  itemsReindexing,
} from '../../store/furnitureSlice';
import { RootState } from '../../store';

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

const Header: React.FC = () => {
  const dispath = useDispatch();
  const goodsReindex: any = useSelector(itemsReindexing);
  const cart: CartItem = useSelector(selectCart);
  const sortValue = useSelector((state: RootState) => state.filter.sort);
  const [cartFlagError, setCartFlagError] = useState(true);

  // const categoryName = useSelector((state) => state.filter.categoryName);
  const selCartOpenSt: boolean = useSelector(selectCartOpenSt);
  const selCartOpenErrorSt: any = useSelector(selectCartOpenErrorSt);

  const [burgerClick, setBurgerClick] = useState(false);
  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);

  // filter select category
  const handlerSelCategory = (e: string) => {
    if (e.toLowerCase().replace(' ', '') === 'allgoods') {
      dispath(setCategoryName(''));
    } else {
      dispath(setCategoryName(e.toLowerCase().replace(' ', '')));
    }
    dispath(setCurrentPage(1));
  };

  // filter select sort
  const handlerSelSort = (e: {}) => {
    dispath(setSort(e as Sort));
    dispath(setCurrentPage(1));
  };

  const handlerSelCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispath(selCostFlag(e.target.value !== 'RUB'));
    dispath(selCurrensy(e.target.value));
  };

  const handleCart = () => {
    //======== Проверка, есть ли в масииве товаров все товары из корзины ==========================
    const cartGoodsFlag = () => {
      for (const el of Object.keys(cart)) {
        if (goodsReindex.hasOwnProperty(el) && fullQuantityGoodsCart !== 0) {
          dispath(cartOpen(!selCartOpenSt as false));
          dispath(cartOpenError(true));
          break;
        } else {
          dispath(cartOpen(!selCartOpenSt as false));
          dispath(cartOpenError(false));
          break;
        }
      }
    };

    cartGoodsFlag();
  };

  const handleLogo = () => {
    // ------------------------------!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // dispath(
    //   fetchFurniture({
    //     sortBy: 'rating',
    //     order: 'desc',
    //     searchCategoryFilter: '',
    //     searchInpValData: '',
    //     currentPage: 1,
    //   })
    // );
    // dispath(fetchFurniture({} as SearchFurnitureParams));
    // баг с  searchCategoryFilter !!!
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // burgerClick --------------------------------------
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
            <SortPopup value={sortValue} onChangeSort={handlerSelSort} />
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
};

export default Header;
