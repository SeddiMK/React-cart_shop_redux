import './Main.css';

import React from 'react';

import GoodsList from '../../containers/GoodsList';
import CartList from '../../containers/CartList';
import Pagination from '../pagination';

export default function Main() {
  return (
    <main className="main">
      {/* Вывод данных из хранилища */}
      <GoodsList />
      <CartList />

      <Pagination />
    </main>
  );
}
