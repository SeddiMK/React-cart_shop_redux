import './Null.css';
import './App.css';
import './Common.css';
import GoodsList from '../containers/GoodsList';
import CartList from '../containers/СartList';

function App() {
  return (
    <div className="container">
      {/* Вывод данных из хранилища */}
      <GoodsList />
      <CartList />
    </div>
  );
}

export default App;
