import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  where,
  orderBy,
} from 'firebase/firestore';

import { PAGE_SIZE } from '~/constants';

function useProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(1);

  const firestore = getFirestore();
  useEffect(() => {
    setLoading(true);
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    const pageParam = Number(searchParams.get('page')) || 1;
    const sortParam = searchParams.get('sort');

    const queryParams = [collection(firestore, 'products')];

    if (categoryParam) {
      queryParams.push(where('categories', 'array-contains', categoryParam));
    }

    if (brandParam) {
      queryParams.push(where('brand', '==', brandParam));
    }

    if (sortParam) {
      let [field, direction] = sortParam.split('-');
      if (field === 'price') {
        field = `inventory.${field}`;
      }

      queryParams.push(orderBy(field, direction));
    }

    let productQuery = query(...queryParams);

    const unsubscribe = onSnapshot(productQuery, (snapshot) => {
      const data = snapshot.docs.map((doc) => doc.data());
      setTotal(data.length); // total number of origin products

      const endAt = pageParam * PAGE_SIZE;
      const startAt = endAt - PAGE_SIZE;
      const paginationData = data.slice(startAt, endAt);
      setProducts(paginationData); // product after paginate and category
    });

    let timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [searchParams]);

  return [products, loading, total];
}

export default useProducts;
