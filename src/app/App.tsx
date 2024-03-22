import './Null.scss';
import './App.scss';
import './Common.scss';

import Header from '../components/header';
import Footer from '../components/footer';
import Main from '../pages/main';
import NotFound from '../pages/NotFound';
import About from '../pages/about';
import Contacts from '../pages/contacts';
import FullOptions from '../pages/fullOption';

import { Route, Routes } from 'react-router-dom';
// import { createContext } from 'vm';
import React, { useRef } from 'react';

export const iconCartContext =
  React.createContext<React.MutableRefObject<null> | null>(null);

export default function App() {
  const iconCartRef = useRef(null);
  return (
    <div className="container">
      <iconCartContext.Provider value={iconCartRef}>
        <Header />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/fullOptions/:articul" element={<FullOptions />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        <Footer />
      </iconCartContext.Provider>
    </div>
  );
}
