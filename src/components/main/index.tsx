import './Main.scss';

import GoodsList from '../../containers/GoodsList';
import CartList from '../../containers/CartList';
import Pagination from '../pagination';

const Main: React.FC = () => {
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
