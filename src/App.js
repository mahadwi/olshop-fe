import React from 'react';
import Index from './containers/register/indexRegister';
import IndexLogin from './containers/login/indexLogin'
import IndexHome from './containers/home/indexHome';
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
      </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
