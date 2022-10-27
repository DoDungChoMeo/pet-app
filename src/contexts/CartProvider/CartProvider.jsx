import React, { useContext, useReducer } from 'react';
import cartReducer from './CartReducer';
import {
  ADD_TO_CART,
  INCREASE_QUANTITY,
  DECREASE_QUANTITY,
  REMOVE_ITEM,
  INPUT_QUANTITY,
} from './CartReducer';

const CartContext = React.createContext();

const initialState = {
  cartId: '',
  userId: '',
  status: '',
  modifiedOn: new Date(),
  products: [],
  quantity: 0,
  total: 0,
};

function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, initialState);

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

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        inputQuantity,
        removeItem,
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
