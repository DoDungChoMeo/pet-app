import { getFirestore, doc, setDoc } from 'firebase/firestore';

export const SET_USER = 'SET_USER';
export const SET_CART = 'SET_CART';
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const INPUT_QUANTITY = 'INPUT_QUANTITY';
export const SUBMIT_CART = 'SUBMIT_CART';

export const EXPIRED_DAY = 3;

export const initialState = {
  userId: '',
  status: 'pending',
  modifiedDate: new Date(),
  expirationDate: new Date(
    new Date().setDate(new Date().getDate() + EXPIRED_DAY)
  ),
  products: [],
  quantity: 0,
  total: 0,
};

const cartReducer = (state, action) => {
  // sync to firestore any action add to cart, exclusive set user and set cart
  const syncToFirestore = (currentCart) => {
    const firestore = getFirestore();
    const { userId } = state;
    // console.log('sync to fire store with data', {cart: currentCart});
    if (userId) {
      const userRef = doc(firestore, `users/${userId}`);
      setDoc(userRef, {userId: currentCart?.userId, cart: currentCart}, { merge: true })
        .then(() => {
          console.log('sync cart success');
        })
        .catch((error) => {
          console.log('sync cart error: ', error);
        });
    }
  };

  // set owner user after have userId from cookie
  if (action.type === SET_USER) {
    return {
      ...state,
      modifiedDate: new Date(),
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + EXPIRED_DAY)
      ),
      userId: action.payload.userId,
    };
  }

  // Action set cart after fetch data cart from database
  if (action.type === SET_CART) {
    return {
      ...action.payload.cart,
    };
  }

  // Action add to cart
  if (action.type === ADD_TO_CART) {
    // find product in cart whether it's existed
    const indexProductModified = state.products.findIndex(
      (product) => product?.productId === action.payload.productId
    );
    const isAdded = indexProductModified !== -1;
    const productModified = state.products[indexProductModified];

    // if isAdded => modified else addNew
    const newProducts = isAdded
      ? state.products.map((product, index) =>
          index === indexProductModified
            ? {
                ...productModified,
                quantity: productModified.quantity + action.payload.quantity,
              }
            : product
        )
      : [...state.products, action.payload];

    const currentCart = {
      ...state,
      modifiedDate: new Date(),
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + EXPIRED_DAY)
      ),
      products: newProducts,
      quantity: state.quantity + Number(action.payload.quantity),
      total:
        state.total +
        Number(action.payload.price) * Number(action.payload.quantity),
    };

    syncToFirestore(currentCart);
    return currentCart;
  }
  // Action increase quantity of an item
  if (action.type === INCREASE_QUANTITY) {
    const indexProductModified = state.products.findIndex(
      (product) => product.productId === action.payload.productId
    );
    const ProductModified = state.products[indexProductModified];
    const newProducts = state.products.map((product, index) =>
      index === indexProductModified
        ? {
            ...ProductModified,
            quantity: ProductModified.quantity + 1,
          }
        : product
    );

    const newQuantity = state.quantity + 1;
    const newTotal = state.total + ProductModified.price;

    const currentCart = {
      ...state,
      modifiedDate: new Date(),
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + EXPIRED_DAY)
      ),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };
    
    syncToFirestore(currentCart);
    return currentCart;
  }
  // Action decrease quantity of an item
  if (action.type === DECREASE_QUANTITY) {
    const indexProductModified = state.products.findIndex(
      (product) => product.productId === action.payload.productId
    );
    const ProductModified = state.products[indexProductModified];
    const newProducts = state.products.map((product, index) =>
      index === indexProductModified
        ? {
            ...ProductModified,
            quantity: ProductModified.quantity - 1,
          }
        : product
    );

    const newQuantity = state.quantity - 1;
    const newTotal = state.total - ProductModified.price;

    const currentCart = {
      ...state,
      modifiedDate: new Date(),
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + EXPIRED_DAY)
      ),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };

    syncToFirestore(currentCart);
    return currentCart;
  }

  // input a product quantity
  if (action.type === INPUT_QUANTITY) {
    const indexProductModified = state.products.findIndex(
      (product) => product.productId === action.payload.productId
    );
    const ProductModified = state.products[indexProductModified];
    const newProducts = state.products.map((product, index) =>
      index === indexProductModified
        ? {
            ...ProductModified,
            quantity: action.payload.quantity,
          }
        : product
    );

    const newQuantity = newProducts.reduce((prevValue, product) => {
      return prevValue + product?.quantity;
    }, 0);

    const newTotal = newProducts.reduce((prevValue, product) => {
      return prevValue + product?.quantity * product?.price;
    }, 0);

    const currentCart = {
      ...state,
      modifiedDate: new Date(),
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + EXPIRED_DAY)
      ),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };

    syncToFirestore(currentCart);
    return currentCart;
  }

  // remove from cart
  if (action.type === REMOVE_ITEM) {
    const newProducts = state.products.filter(
      (product) => product.productId !== action.payload.productId
    );

    const newQuantity = newProducts.reduce((prevValue, product) => {
      return prevValue + product?.quantity;
    }, 0);

    const newTotal = newProducts.reduce((prevValue, product) => {
      return prevValue + product?.quantity * product?.price;
    }, 0);

    const currentCart = {
      ...state,
      modifiedDate: new Date(),
      expirationDate: new Date(
        new Date().setDate(new Date().getDate() + EXPIRED_DAY)
      ),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };

    syncToFirestore(currentCart);
    return currentCart;
  }

  // SET cart to initial state
  if (action.type == SUBMIT_CART) {
    syncToFirestore(initialState);
    return initialState;
  }
};

export default cartReducer;
