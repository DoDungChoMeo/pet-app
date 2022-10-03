import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '~/firebase.config';
import FirebaseProvider from '~/contexts/FirebaseProvider';
import AntdProvider from './contexts/AntdProvider';
import ProductProvider from './contexts/ProductProvider';
import App from '~/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProvider>
        <AntdProvider>
          <ProductProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </ProductProvider>
        </AntdProvider>
      </FirebaseProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);
