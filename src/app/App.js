import './Null.css';
import './App.css';
import Header from '../components/header/Header';
import Main from '../components/main/Main';
import Footer from '../components/footer/Footer';

export default function App() {
  const nav = [];
  return (
    <div className="container">
      <Header nav={nav} />
      <Main />
      <Footer />
    </div>
  );
}
