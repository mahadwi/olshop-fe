import React from 'react';
import Index from './containers/register/Index';
import IndexLogin from './containers/login/Index'
import IndexHome from './containers/home/Index';
import {BrowserRouter, Routes, Route} from "react-router-dom"

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
