import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  getFirestore,
  onSnapshot,
  query,
  collection,
  where,
  limit,
} from 'firebase/firestore';

const PRODUCT_LIMIT_QUANTITY = 20;

function useProducts() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const firestore = getFirestore();
  useEffect(() => {
    setLoading(true);
    const categoryParam = searchParams.get('category');
    const brandParam = searchParams.get('brand');
    let productQuery = query(
      collection(firestore, 'products'),
      limit(PRODUCT_LIMIT_QUANTITY)
    );
    if (categoryParam && brandParam) {
      productQuery = query(
        collection(firestore, 'products'),
        where('categories', 'array-contains', categoryParam),
        where('brand', '==', brandParam),
        limit(PRODUCT_LIMIT_QUANTITY)
      );
    } else if (categoryParam) {
      productQuery = query(
        collection(firestore, 'products'),
        where('categories', 'array-contains', categoryParam),
        limit(PRODUCT_LIMIT_QUANTITY)
      );
    } else if (brandParam) {
      productQuery = query(
        collection(firestore, 'products'),
        where('brand', '==', brandParam)
      );
    }

    const unsubscribe = onSnapshot(productQuery, (snapshot) => {
      setProducts(snapshot.docs.map((doc) => doc.data()));
    });

    let timeout = setTimeout(() => {
      setLoading(false);
    }, 300);

    return () => {
      unsubscribe();
      clearTimeout(timeout);
    };
  }, [searchParams]);

  return [products, loading];
}

export default useProducts;
