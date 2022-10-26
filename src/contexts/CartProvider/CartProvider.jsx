import React, { useContext, useReducer } from 'react';
import cartReducer from './CartReducer';
import { ADD_TO_CART } from './CartReducer';

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

  return (
    <CartContext.Provider value={{ cart, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

const useCartContext = () => {
  return useContext(CartContext);
};

export { CartContext, useCartContext };

export default CartProvider;
