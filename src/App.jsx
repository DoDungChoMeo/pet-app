import { Routes, Route } from 'react-router-dom';

import MainLayout from '~/layouts/MainLayout';
import Counter from './Counter';

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={'home'} />
        <Route path="san-pham" element={'san-pham'} />
        <Route path="thanh-toan" element={'thanh-toan'} />
        <Route path="counter" element={<Counter />} />
      </Route>
      <Route path="*" element={'page not found'} />
    </Routes>
  );
}

export default App;
