import { useState } from 'react';
import { doc, setDoc, getFirestore } from 'firebase/firestore';
import { Button } from 'antd';

function Counter() {
  const [counter, setCounter] = useState(0);
  const firestore = getFirestore();
  const save = () => {
    setDoc(
      doc(firestore, 'users/user03'),
      {
        counter,
      },
      { merge: true }
    )
      .then(() => {
        console.log('set counter success');
      })
      .catch(() => {
        console.log('set counter error');
      });
  };
  return (
    <div className="App">
      <h1>Couter</h1>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>increase</button>
      <Button onClick={save}>save</Button>
    </div>
  );
}

export default Counter;
