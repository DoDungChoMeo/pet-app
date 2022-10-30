export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const INPUT_QUANTITY = 'INPUT_QUANTITY';

const cartReducer = (state, action) => {
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

    return {
      modifiedOn: new Date(),
      image: action.payload.image,
      title: action.payload.title,
      products: newProducts,
      quantity: state.quantity + Number(action.payload.quantity),
      total:
        state.total +
        Number(action.payload.price) * Number(action.payload.quantity),
    };
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

    return {
      modifiedOn: new Date(),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };
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

    return {
      modifiedOn: new Date(),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };
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

    return {
      modifiedOn: new Date(),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };
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

    return {
      modifiedOn: new Date(),
      products: newProducts,
      quantity: newQuantity,
      total: newTotal,
    };
  }
};

export default cartReducer;
