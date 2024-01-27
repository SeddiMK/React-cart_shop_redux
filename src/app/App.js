import './Null.css';
import './App.css';
import './Common.css';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';

function App() {
  // const cartIconRef = forwardRef(null);
  return (
    <div className="container">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
