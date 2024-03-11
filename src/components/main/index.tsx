import './Main.scss';
import React from 'react';

import GoodsList from '../../containers/GoodsList';
// import CartList from '../../containers/CartList';
import Pagination from '../pagination';

const CartList = React.lazy(() => import('../../containers/CartList'));

const Main: React.FC = () => {
  return (
    <main className="main">
      {/* Вывод данных из хранилища */}
      <GoodsList />

      <React.Suspense fallback={<div>Загрузка корзины...</div>}>
        <CartList />
      </React.Suspense>

      <Pagination />
    </main>
  );
};

export default Main;
