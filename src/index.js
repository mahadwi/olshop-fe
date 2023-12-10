import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import LoadingContextProvider from './context/LoadingContext';
import AuthUserContextProvider from './context/AuthUserContext';


const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <LoadingContextProvider>
                <AuthUserContextProvider>
                    <App />
                </AuthUserContextProvider>
            </LoadingContextProvider>
        </Provider>
    </React.StrictMode>
);

