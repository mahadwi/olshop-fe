import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import "./translations/i18n"
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
import AuthGoogleIndex from './containers/auth-google/index/AuthGoogleIndex';
import ReturnPolicyIndex from './containers/return-policy/index/ReturnPolicyIndex';
import AuthenticationIndex from './containers/authentication/index/AuthenticationIndex.jsx';
import WorkWithUsIndex from './containers/work-with-us/index/WorkWithUsIndex.jsx';
import ConsignmentIndex from './containers/consignment/index/ConsignmentIndex.jsx';
import PrivacyPoliceIndex from './containers/privacy-policy/index/PrivacyPoliceIndex';
import DeliveryAndShippingIndex from './containers/delivery-and-shipping/index/DeliveryAndShippingIndex';
import CustomerCareIndex from './containers/customer-care/index/CustomerCareIndex';
import TermAndConditionIndex from './containers/term-and-condition/index/TermAndConditionIndex';
import AddressIndex from './containers/address/index/AddressIndex';
import VendorMiddleware from './middleware/VendorMiddleware';
import VendorIndex from './containers/vendor/index/VendorIndex';
import VendorStep1 from './containers/vendor/step1/VendorStep1';
import VendorStep2 from './containers/vendor/step2/VendorStep2';
import MainLayout from './layouts/MainLayout';
import AuthenticateMiddleware from './middleware/AuthenticateMiddleware';
import AccountOrder from './containers/account/order/AccountOrder';
import AccountWishlist from './containers/account/wishlist/AccountWishlist';
import ProfileIndex from './containers/profile/index/ProfileIndex';
import ProfileAccount from './containers/profile/account/ProfileAccount';
import ProfileWishlist from './containers/profile/wishlist/ProfileWishlist';
import ProfileOrders from './containers/profile/orders/ProfileOrders';
import ProfileAddress from './containers/profile/address/ProfileAddress';
import ShoppingCart from './containers/shopping/cart/ShoppingCart';
import ShoppingCheckout from './containers/shopping/checkout/ShoppingCheckout';
import FaqIndex from './containers/faq/FaqIndex';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<HomeIndex />} />

                        {/* Auth */}
                        <Route path="/login" element={<LoginIndex />} />
                        <Route path="/register" element={<RegisterIndex />} />
                        <Route path='/email-verification' element={<EmailVerificationIndex />} />
                        <Route path='/auth/google' element={<AuthGoogleIndex />} />
                        {/* End of Auth */}

                        {/* POS */}
                        <Route path='/shop' element={<ShopIndex />} />
                        <Route path="/shop/:id" element={<ShopShow />} />
                        <Route path='/collective/:id' element={<CollectiveIndex />} />
                        <Route path="/designers/:id" element={<DesignerIndex />} />
                        <Route path='/shopping'>
                            <Route path="cart" element={<ShoppingCart />} />
                            <Route path="checkout" element={<ShoppingCheckout />} />
                        </Route>
                        {/* End of POS */}

                        {/* Basic Nav & Footer Page */}
                        <Route path='/about-us' element={<AboutUsIndex />} />
                        <Route path='/contact' element={<ContactIndex />} />
                        <Route path='/policy' element={<ReturnPolicyIndex />} />
                        <Route path='/authentication' element={<AuthenticationIndex />} />
                        <Route path='/privacy-policy' element={<PrivacyPoliceIndex />} />
                        <Route path='/delivery-and-shipping' element={<DeliveryAndShippingIndex />} />
                        <Route path='/customer-care' element={<CustomerCareIndex />} />
                        <Route path='/term-and-conditions' element={<TermAndConditionIndex />} />
                        <Route path='/faq' element={<FaqIndex />} />
                        <Route path='/work-with-us' element={<WorkWithUsIndex />} />
                        <Route path='/consignment' element={<ConsignmentIndex />} />
                        {/* Event */}

                        {/* End of Event */}
                        <Route path='/event' element={<EventIndex />} />
                        <Route path='/event/:id' element={<EventShow />} />
                        <Route path='/event/:id/:ticket' element={<EventBooking />} />
                        {/* End of Basic Nav & Footer Page */}

                        {/* Account */}
                        <Route path='/account' element={<AuthenticateMiddleware />}>
                            <Route index element={<AccountIndex />} />
                            <Route path='orders' element={<AccountOrder />} />
                            <Route path='wishlist' element={<AccountWishlist />} />
                            <Route path='address' element={<AddressIndex />} />
                            <Route path='vendor' element={<VendorMiddleware />}>
                                <Route index element={<VendorIndex />} />
                                <Route path='1' element={<VendorStep1 />} />
                                <Route path='2' element={<VendorStep2 />} />
                            </Route>
                        </Route>
                        {/* End of Account */}

                        {/* Profile */}
                        <Route path='/profile' element={<AuthenticateMiddleware />}>
                            <Route index element={<ProfileIndex />} />
                            <Route path='account' element={<ProfileAccount />} />
                            <Route path='wishlist' element={<ProfileWishlist />} />
                            <Route path='orders' element={<ProfileOrders />} />
                            <Route path='address' element={<ProfileAddress />} />
                        </Route>
                        {/* End of Profile */}
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
