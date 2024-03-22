import './Main.scss';
import React from 'react';

import GoodsList from '../../containers/GoodsList';
import Pagination from '../../components/pagination';

// import CartList from '../../containers/CartList';
const CartList = React.lazy(
  () => import(/* webpackChunkName:"CartList" */ '../../containers/CartList')
);

const Main: React.FC = () => {
  return (
    <main className="main">
      <GoodsList />

      <React.Suspense fallback={<div>Загрузка корзины...</div>}>
        <CartList />
      </React.Suspense>

      <Pagination />
    </main>
  );
};

export default Main;
