import './Header.scss';
import '../../app/Common.scss';

import { useContext, useEffect, useRef, useState } from 'react';
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
  searchInpHeader,
  setCategoryName,
  setCurrentPage,
  setSort,
} from '../../store/filterSlice';
import {
  CartItem,
  cartOpen,
  selectCart,
  selectCartOpenSt,
  cartOpenError,
} from '../../store/cartSlice';
import { itemsReindexing } from '../../store/furnitureSlice';
import { RootState } from '../../store';
import { iconCartContext } from '../../app/App';

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
  const dispatch = useDispatch();
  const isMounted = useRef(false);

  const menuListRef = useRef<HTMLUListElement>(null);
  const burgRef: React.ForwardedRef<any> = useRef();

  const iconCartRef: React.ForwardedRef<any> = useContext(iconCartContext);

  const goodsReindex: {} = useSelector(itemsReindexing);
  const cart: CartItem = useSelector(selectCart);
  const sortValue = useSelector((state: RootState) => state.filter.sort);

  const [valSearch, setValSearch] = useState('null');

  const selCartOpenSt: boolean = useSelector(selectCartOpenSt);

  const [burgerClick, setBurgerClick] = useState<boolean>(true);
  let fullQuantityGoodsCart = useSelector(fullQuantityGoods);

  // filter select category
  const handlerSelCategory = (e: string) => {
    if (e.toLowerCase().replace(' ', '') === 'allgoods') {
      dispatch(setCategoryName(''));
      dispatch(searchInpHeader(''));
      setValSearch('');
    } else {
      dispatch(setCategoryName(e.toLowerCase().replace(' ', '')));
    }
    dispatch(setCurrentPage(1));
  };

  // filter select sort
  const handlerSelSort = (e: {}) => {
    dispatch(setSort(e as Sort));
    dispatch(setCurrentPage(1));
  };

  const handlerSelCurrency = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selCostFlag(e.target.value !== 'RUB'));
    dispatch(selCurrensy(e.target.value));
  };

  const handleCart = () => {
    //======== Проверка, есть ли в масииве товаров все товары из корзины ==========
    const cartGoodsFlag = () => {
      for (const el of Object.keys(cart)) {
        if (goodsReindex.hasOwnProperty(el) && fullQuantityGoodsCart !== 0) {
          dispatch(cartOpen(!selCartOpenSt as false));
          dispatch(cartOpenError(true));
          break;
        } else {
          dispatch(cartOpen(!selCartOpenSt as false));
          dispatch(cartOpenError(false));
          break;
        }
      }
    };

    cartGoodsFlag();
  };

  const handleLogo = () => {
    // баг с  searchCategoryFilter !!!
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  // burgerClick in window--------------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const _event = e as MouseEvent & {
        composedPath(): Node[];
      };

      // document.getElementById('hamburger')
      if (
        !burgerClick &&
        ![menuListRef.current, burgRef.current].some(
          (x: Element | null) => x && _event.composedPath().includes(x)
        )
      ) {
        setBurgerClick(true);
        // dispath(menuOpen(false));
      }
    };

    document.body.addEventListener('click', handleClickOutside);

    return () => document.body.removeEventListener('click', handleClickOutside); //добавляем удаление обработчика, т.к. при ухода со стр стрый обработчик остается! return - сделай при размонтировании
  }, [burgerClick]);

  // save data from localstorage ---------------------------------
  useEffect(() => {
    if (isMounted.current) {
      const jsonCart = JSON.stringify(cart);
      localStorage.setItem('cart', jsonCart);
    }
    isMounted.current = true;
  }, [cart]);

  return (
    <header className="header">
      <div className="header__wrapper">
        <div className="header__logo-burger">
          <Link to="/" className="header__logo" onClick={handleLogo}>
            ME
            {/* <img src="#" alt="Image logo" /> */}
          </Link>
          {/* Menu Burger */}

          {/*onClick={() => setBurgerClick(!burgerClick)} <Burger burgerClickMenu={(i: boolean) => setBurgerClick(i)} /> */}
        </div>
        <nav className="header__nav menu">
          <ul
            ref={menuListRef}
            className={'menu__list-left' + (!burgerClick ? ' activ-nav' : '')}>
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
            <Search value={valSearch} />

            <div className="block-search-cart__cart cart-header">
              <div className="cart-header__icon">
                <span className="cart-header__cart-icon">
                  <button
                    id="cartIcon"
                    ref={iconCartRef}
                    onClick={handleCart}
                    className="cart-header__btn cart-btn"></button>
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
        <Burger
          ref={burgRef}
          burgerClick={burgerClick}
          setBurgerClick={setBurgerClick}
        />
      </div>
    </header>
  );
};

export default Header;
