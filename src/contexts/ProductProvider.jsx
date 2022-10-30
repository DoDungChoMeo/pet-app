import React, { useContext } from 'react';
import { useFirestoreCollection } from '~/hooks';

const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [products, productsLoading] = useFirestoreCollection('products');

  return (
    <ProductContext.Provider value={{ products, productsLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

const useProductContext = () => {
  return useContext(ProductContext);
};

export { useProductContext, ProductContext };

export default ProductProvider;
