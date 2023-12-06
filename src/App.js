import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "../src/translations/i18n"
import CollectiveIndex from './containers/collective/index/CollectiveIndex';
import AboutUsIndex from './containers/about-us/index/AboutUsIndex';
import ContactIndex from './containers/contact/index/ContactIndex';
import EventIndex from './containers/event/index/EventIndex';
import EventShow from './containers/event/show/EventShow';
import EventBooking from './containers/event/booking/EventBooking';
import ShopIndex from './containers/shop/index/ShopIndex';
import VerificationPage from './containers/register/VerificationPage';
import ShopShow from './containers/shop/show/ShopShow';
import HomeIndex from './containers/home/index/HomeIndex';
import DesignerIndex from './containers/designers/index/DesignerIndex';
import LoginIndex from './containers/login/index/LoginIndex';
import AccountIndex from './containers/account/index/AccountIndex';
import RegisterIndex from './containers/register/index/RegisterIndex';
import EmailVerificationIndex from './containers/email-verification/index/EmailVerificationIndex';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/register" element={<RegisterIndex />} />
                    <Route path="/login" element={<LoginIndex />} />
                    <Route path="/" element={<HomeIndex />} />
                    <Route path="/collective/:id" element={<CollectiveIndex />} />
                    <Route path="/designers/:id" element={<DesignerIndex />} />
                    <Route path='/about-us' element={<AboutUsIndex />} />
                    <Route path='/contact' element={<ContactIndex />} />
                    <Route path='/event' element={<EventIndex />} />
                    <Route path='/event/:id' element={<EventShow />} />
                    <Route path='/event/:id/:ticket' element={<EventBooking />} />
                    <Route path="/shop" element={<ShopIndex />} />
                    <Route path="/verify/:id" element={<VerificationPage />} />
                    <Route path="/shop/:id" element={<ShopShow />} />
                    <Route path='/account' element={<AccountIndex />} />
                    <Route path='/email-verification' element={<EmailVerificationIndex />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
