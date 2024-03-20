import './Null.scss';
import './App.scss';
import './Common.scss';

import Header from '../components/header';
import Footer from '../components/footer';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';
import About from '../pages/about';
import Contacts from '../pages/contacts';
import FullOptions from '../pages/fullOption';

import { Route, Routes } from 'react-router-dom';

export default function App() {
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contacts" element={<Contacts />} />
        <Route path="/fullOptions/:articul" element={<FullOptions />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

{
  /* <div className="wrap-main">
 </div> */
}
