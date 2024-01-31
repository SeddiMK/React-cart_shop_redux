import './Null.css';
import './App.css';
import './Common.css';

import Header from '../components/header';
import Footer from '../components/footer';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from '../pages/About';
import Contacts from '../pages/Contacts';

import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="container">
      <Header />
      <div className="wrap-main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}
