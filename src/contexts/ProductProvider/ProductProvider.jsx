import React, { useContext, useReducer, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

import {
  FETCH_PRODUCTS,
  SORT_NEWEST,
  SORT_OLDEST,
  SORT_PRICE_DESC,
  SORT_PRICE_ASC,
  PAGINATE,
  CATEGORY,
  BRAND 
} from './actions';
import productReducer from './ProductReducer';
import { initialState } from './initialState';

const ProductContext = React.createContext();

function ProductProvider({ children }) {
  const [productState, dispatch] = useReducer(productReducer, initialState);
  const [productLoading, setProductLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const sortParam = searchParams.get('sort');
  const pageParam = searchParams.get('page');
  const categoryParam = searchParams.get('category');
  const brandParam = searchParams.get('brand');
  // console.log(productState)
  const fetchData = async () => {
    const firestore = getFirestore();
    const snap = await getDocs(collection(firestore, 'products'));
    return snap.docs.map((doc) => {
      return doc.data();
    });
  };

  const handleLoading = () => {
    setProductLoading(true)
    setTimeout(() => {
      setProductLoading(false)
    }, (200));
  }

  useEffect(() => {
    fetchData().then((data) => {
      setProductLoading(true);
      dispatch({ type: FETCH_PRODUCTS, payload: { products: data } });
      setProductLoading(false);
    });
  }, []);

  useEffect(() => {
    handleLoading();
    dispatch({ type: CATEGORY, payload: { categoryParam } });
  }, [categoryParam])

  useEffect(() => {
    handleLoading();
    dispatch({ type: BRAND, payload: { brandParam } });
  }, [brandParam])


  useEffect(() => {
    handleLoading();

    if (sortParam === 'newest') {
      dispatch({ type: SORT_NEWEST });
    }

    if (sortParam === 'oldest') {
      dispatch({ type: SORT_OLDEST });
    }

    if (sortParam === 'price-desc') {
      dispatch({ type: SORT_PRICE_DESC });
    }

    if (sortParam === 'price-asc') {
      dispatch({ type: SORT_PRICE_ASC });
    }

  }, [sortParam]);

  useEffect(() => {
    handleLoading();
    dispatch({ type: PAGINATE, payload: { pageParam } });
  }, [pageParam]) 

  return (
    <ProductContext.Provider value={{ productState, productLoading }}>
      {children}
    </ProductContext.Provider>
  );
}

const useProductContext = () => {
  return useContext(ProductContext);
};

export { useProductContext, ProductContext };

export default ProductProvider;
