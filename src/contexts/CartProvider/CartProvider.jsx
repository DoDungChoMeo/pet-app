import React, { useContext, useEffect, useReducer, useState, useRef } from 'react';
import cartReducer from './CartReducer';
import {
  initialState,
  SET_USER,
  SET_CART,
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEM,
  INPUT_QUANTITY,
  SUBMIT_CART
} from './CartReducer';
import {
  getFirestore,
  collection,
  doc,
  setDoc,
  getDoc,
} from 'firebase/firestore';
import { getCookie, setCookie, checkCookie } from '~/utils/cookies';

const CartContext = React.createContext();

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);
  const [userId, setUserId] = useState();
  const firestore = getFirestore();
  console.log({cart})
  const handleCookie = (() => {
    let executed = false;
    return function () {
      if (!executed) {
        executed = true;
        const userId = getCookie('user');
        if (userId != '') {
          return userId;
        } else {
          const userRef = doc(collection(firestore, 'users'));
          setDoc(userRef, {cart: {...cart, userId: userRef.id}, userId: userRef.id, userType: "guest"}).then(() => {
            console.log('creat new guest successful')
          }).catch((e) => {
            console.log('creat new guest error :', e)
          }); 
          setCookie('user', userRef.id, 3);
        }
      }
    };
  })();

  // handle get - set cookie
  useEffect(() => {
    const data = handleCookie();
    if (data) {
      dispatch({ type: SET_USER, payload: { userId: data } });
      setUserId(data);
    }
  }, []);

  // fetch data from database and set cart
  useEffect(() => {
    if (userId) {
      async function fetchData() {
        const userRef = doc(firestore, `users/${userId}`);
        const snap = await getDoc(userRef);
        const data = snap.data();
        if (data) {
          dispatch({type: SET_CART, payload: {cart: data?.cart}})
        }
      }
      fetchData();
    }
  }, [userId]);

  const addToCart = (product) => {
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const increaseQuantity = (productId) => {
    dispatch({ type: INCREASE_QUANTITY, payload: { productId } });
  };

  const decreaseQuantity = (productId) => {
    dispatch({ type: DECREASE_QUANTITY, payload: { productId } });
  };

  const inputQuantity = (productId, quantity) => {
    dispatch({ type: INPUT_QUANTITY, payload: { productId, quantity } });
  };

  const removeItem = (productId) => {
    dispatch({ type: REMOVE_ITEM, payload: { productId } });
  };

  const submitCart = () => {
    dispatch({type: SUBMIT_CART, payload: {}})
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        inputQuantity,
        removeItem,
        submitCart,
        userId
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, useCartContext };

export default CartProvider;
