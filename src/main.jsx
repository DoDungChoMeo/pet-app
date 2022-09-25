import React from 'react';
import ReactDOM from 'react-dom/client';
import { FirebaseAppProvider } from 'reactfire';
import { firebaseConfig } from '~/firebase.config';
import FirebaseProvider from '~/contexts/FirebaseProvider';
import App from '~/App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </FirebaseAppProvider>
  </React.StrictMode>
);
