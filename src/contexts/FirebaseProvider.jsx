import React from 'react';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';
import {
  useFirebaseApp,
  AuthProvider,
  FirestoreProvider,
  StorageProvider,
} from 'reactfire';
import { getAnalytics } from 'firebase/analytics';

function FirebaseProvider({ children }) {
  const app = useFirebaseApp();
  const analytics = getAnalytics(app);
  const auth = getAuth(app);
  const firestore = getFirestore(app);
  const storage = getStorage(app);

  if (
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1'
  ) {
    connectAuthEmulator(auth, 'http://localhost:9099');
    connectFirestoreEmulator(firestore, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
  }

  return (
    <>
      <AuthProvider sdk={auth}>
        <FirestoreProvider sdk={firestore}>
          <StorageProvider sdk={storage}>{children}</StorageProvider>
        </FirestoreProvider>
      </AuthProvider>
    </>
  );
}

export default FirebaseProvider;
