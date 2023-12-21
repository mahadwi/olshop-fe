import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import LanguageContextProvider from './context/LanguageContext';
import LoadingContextProvider from './context/LoadingContext';
import AuthUserContextProvider from './context/AuthUserContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import CartContextProvider from './context/CartContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <GoogleOAuthProvider clientId="947119922402-enroefn9rrlsqpf2baji9qrqp3vigb4f.apps.googleusercontent.com">
                <LanguageContextProvider>
                    <LoadingContextProvider>
                        <AuthUserContextProvider>
                            <CartContextProvider>
                                <App />
                            </CartContextProvider>
                        </AuthUserContextProvider>
                    </LoadingContextProvider>
                </LanguageContextProvider>
            </GoogleOAuthProvider>
        </Provider>
    </React.StrictMode>
);

