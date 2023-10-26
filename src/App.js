import React from 'react';
import Index from './containers/register/indexRegister';
import IndexLogin from './containers/login/indexLogin'
import IndexHome from './containers/home/indexHome';
import IndexShop from './containers/shop/indexShop';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import "../src/translations/i18n"

function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Index/>} />
        <Route path="/" element={<IndexLogin/>} />
        <Route path="/home" element={<IndexHome/>} />
        <Route path="/shop" element={<IndexShop/>} />
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
