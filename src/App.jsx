import { Routes, Route } from 'react-router-dom';

import MainLayout from '~/layouts/MainLayout';
import Counter from './Counter';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import CartPage from './pages/CartPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="product/:bookmarkName" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="counter" element={<Counter />} />
      </Route>
      <Route path="*" element={'page not found'} />
    </Routes>
  );
}

export default App;
