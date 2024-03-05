import './Main.scss';
// import { useSelector } from 'react-redux';

import GoodsList from '../../containers/GoodsList';
import CartList from '../../containers/CartList';
import Pagination from '../pagination';
// import { CartItem, selectCart } from '../../store/cartSlice';

const Main: React.FC = () => {
  // const cart: CartItem = useSelector(selectCart);
  return (
    <main className="main">
      {/* Вывод данных из хранилища */}
      <GoodsList />
      <CartList />

      <Pagination />
    </main>
  );
};

export default Main;
