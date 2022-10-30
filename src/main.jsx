import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AntdProvider from './contexts/AntdProvider';
import './index.css';
import FirebaseProvider from './contexts/FirebaseProvider';
import ProductProvider from './contexts/ProductProvider';
import CartProvider from './contexts/CartProvider';
import App from '~/App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseProvider>
        <AntdProvider>
          <ProductProvider>
            <CartProvider>
              <App />
            </CartProvider>
          </ProductProvider>
        </AntdProvider>
      </FirebaseProvider>
    </BrowserRouter>
  </React.StrictMode>
);
