import React from 'react';
import Index from './containers/register/indexRegister';
import IndexLogin from './containers/login/indexLogin'
import IndexHome from './containers/home/indexHome';
import IndexShop from './containers/shop/indexShop';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "../src/translations/i18n"
import CollectiveIndex from './containers/collective/collectiveIndex';
import DesignerIndex from './containers/designers/designerIndex';
import AboutUsIndex from './containers/about-us/index/AboutUsIndex';
import ContactIndex from './containers/contact/index/ContactIndex';
import EventIndex from './containers/event/index/EventIndex';
import EventShow from './containers/event/show/EventShow';
import EventBooking from './containers/event/booking/EventBooking';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<Index />} />
                    <Route path="/login" element={<IndexLogin />} />
                    <Route path="/" element={<IndexHome />} />
                    <Route path="/shop" element={<IndexShop />} />
                    <Route path="/collective/:id" element={<CollectiveIndex />} />
                    <Route path="/designers/:id" element={<DesignerIndex />} />
                    <Route path='/about-us' element={<AboutUsIndex />} />
                    <Route path='/contact' element={<ContactIndex />} />
                    <Route path='/event' element={<EventIndex />} />
                    <Route path='/event/:id' element={<EventShow />} />
                    <Route path='/event/:id/:ticket' element={<EventBooking />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
