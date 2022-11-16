import {
  getFirestore,
  collection,
  getCountFromServer
} from 'firebase/firestore';

const fetchProductCount = async () => {
  const firestore = getFirestore();
  const coll = collection(firestore, 'products');
  const snapshot = await getCountFromServer(coll);
  const productsLength = snapshot.data().count
  return productsLength
};

export default fetchProductCount;
