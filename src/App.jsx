import { Routes, Route } from 'react-router-dom';

import MainLayout from '~/layouts/MainLayout';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import SuccessfulCheckoutPage from './pages/SuccessfulCheckoutPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:bookmarkName" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="successful-checkout" element={<SuccessfulCheckoutPage />} />
      </Route>
      <Route path="*" element={'page not found'} />
    </Routes>
  );
}

export default App;
