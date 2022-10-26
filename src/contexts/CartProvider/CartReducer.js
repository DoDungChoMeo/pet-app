export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const INCREASE_QUANTITY = 'INCREASE_QUANTITY';
export const DECREASE_QUANTITY = 'DECREASE_QUANTITY';
export const INPUT_QUANTITY = 'INPUT_QUANTITY';

const cartReducer = (state, action) => {
  if (action.type === 'ADD_TO_CART') {
    // find product in cart whether it's existed
    const indexProductModified = state.products.findIndex(
      (product) => product?.productId === action.payload.productId
    );
    const isAdded = indexProductModified !== -1;
    const productUpdated = state.products[indexProductModified];

    // if isAdded => modified else addNew
    const newProducts = isAdded
      ? state.products.map((product, index) =>
          index === indexProductModified
            ? {
                ...productUpdated,
                quantity: productUpdated.quantity + action.payload.quantity,
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
};

export default cartReducer;
