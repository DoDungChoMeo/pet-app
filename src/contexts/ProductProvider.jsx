import React, { useEffect, useContext, useState } from 'react';

const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [products, setProducts] = useState();
  const [loading, setLoading] = useState(false);

  const fetchProduct = async () => {
    setLoading(true);
    const res = await fetch('https://dummyjson.com/products');
    const data = await res.json();
    setProducts(data.products);
    setLoading(false);
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <ProductContext.Provider value={{ products, loading }}>
      {children}
    </ProductContext.Provider>
  );
}

const useProductContext = () => {
  return useContext(ProductContext);
};

export { useProductContext, ProductContext };

export default ProductProvider;
