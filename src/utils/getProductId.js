import {
  query,
  getFirestore,
  where,
  collection,
  getDocs,
} from 'firebase/firestore';
const getProductId = async (bookmarkName) => {
  const firestore = getFirestore();

  const q = query(
    collection(firestore, 'products'),
    where('bookmarkName', '==', bookmarkName)
  );
  const data = await getDocs(q);
  const productId = data.docs[0].id;

  return productId;
};

export default getProductId;
