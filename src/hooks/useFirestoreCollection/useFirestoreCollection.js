import { useEffect, useState } from 'react';
import { getFirestore, onSnapshot, collection } from 'firebase/firestore';

function useFirestoreCollection(path) {
  const [firestoreCollection, setFirestoreCollection] = useState([]);
  const [firestoreLoading, setFirestoreLoading] = useState(true);

  const firestore = getFirestore();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(firestore, path), (snapshot) => {
      setFirestoreCollection(snapshot.docs.map((doc) => doc.data()));
      setFirestoreLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [path]);

  return [firestoreCollection, firestoreLoading];
}

export default useFirestoreCollection;
