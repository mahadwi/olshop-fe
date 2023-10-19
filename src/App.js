import React from 'react';
import { Counter } from './features/counter/Counter';
import Index from './containers/register/index';
import IndexNavbar from './components/navbar/IndexNavbar';
import IndexFooter from './components/footer/indexFooter';

function App() {
  return (
    <>
    <IndexNavbar/>
    <Index/>
    <br/>
    <br/>
    <br/>
    <br/>
    <IndexFooter/>
    </>
  );
}

export default App;
