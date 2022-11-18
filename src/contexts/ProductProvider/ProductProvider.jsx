import React, { useContext, useReducer, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  limit,
} from 'firebase/firestore';

import { PRODUCT_LIMIT } from '~/constants';
import {
  FETCH_PRODUCTS,
  SORT_NEWEST,
  SORT_OLDEST,
  SORT_PRICE_DESC,
  SORT_PRICE_ASC,
  PAGINATE,
  CATEGORY,
  BRAND,
  SEARCH,
  RESET,
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
    const q = query(
      collection(firestore, 'products'),
      where('status', '==', 'visible'),
      limit(PRODUCT_LIMIT)
    );
    const snap = await getDocs(q);
    return snap.docs.map((doc) => {
      return doc.data();
    });
  };

  const emulateLoading = () => {
    setProductLoading(true);
    setTimeout(() => {
      setProductLoading(false);
    }, 200);
  };

  useEffect(() => {
    fetchData().then((data) => {
      setProductLoading(true);
      dispatch({ type: FETCH_PRODUCTS, payload: { products: data } });
      setProductLoading(false);
    });
  }, []);

  // when don't have every param. Return full product
  useEffect(() => {
    const params = Array.from(searchParams.values());
    if (params.length === 0) {
      emulateLoading();
      dispatch({ type: RESET });
    }
  }, [searchParams]);

  useEffect(() => {
    emulateLoading();
    dispatch({ type: CATEGORY, payload: { categoryParam } });
  }, [categoryParam]);

  useEffect(() => {
    emulateLoading();
    dispatch({ type: BRAND, payload: { brandParam } });
  }, [brandParam]);

  useEffect(() => {
    emulateLoading();
    switch (sortParam) {
      case 'newest':
        dispatch({ type: SORT_NEWEST });
        break;

      case 'oldest':
        dispatch({ type: SORT_OLDEST });
        break;

      case 'price-desc':
        dispatch({ type: SORT_PRICE_DESC });
        break;

      case 'price-asc':
        dispatch({ type: SORT_PRICE_ASC });
        break;

      default:
        dispatch({ type: RESET });
        break;
    }
  }, [sortParam]);

  useEffect(() => {
    emulateLoading();
    if (pageParam) {
      dispatch({ type: PAGINATE, payload: { pageParam } });
    } else {
      dispatch({ type: RESET });
    }
  }, [pageParam]);

  const searchProduct = (qParam) => {
    emulateLoading();
    dispatch({ type: SEARCH, payload: { qParam } });
  };

  return (
    <ProductContext.Provider
      value={{ productState, productLoading, searchProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
}

const useProductContext = () => {
  return useContext(ProductContext);
};

export { useProductContext, ProductContext };

export default ProductProvider;
