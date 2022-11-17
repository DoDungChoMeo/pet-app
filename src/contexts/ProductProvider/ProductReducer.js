import {
  FETCH_PRODUCTS,
  SORT_NEWEST,
  SORT_PRICE_ASC,
  SORT_PRICE_DESC,
  SORT_OLDEST,
  PAGINATE,
  CATEGORY,
  BRAND,
} from './actions';
import { PAGE_SIZE } from '~/constants';

const productReducer = (state, action) => {
  if (action.type === FETCH_PRODUCTS) {
    const { products } = action.payload;
    return {
      products,
      originalProducts: products,
    };
  }

  if (action.type === SORT_NEWEST) {
    const products = state.originalProducts.sort((a, b) =>
      a.createAt < b.createAt ? 1 : a.createAt > b.createAt ? -1 : 0
    );
    return {
      ...state,
      products,
    };
  }

  if (action.type === SORT_OLDEST) {
    const products = state.originalProducts.sort((a, b) =>
      a.createAt < b.createAt ? -1 : a.createAt > b.createAt ? 1 : 0
    );
    return {
      ...state,
      products,
    };
  }

  if (action.type === SORT_PRICE_ASC) {
    const products = state.originalProducts.sort((a, b) =>
      a.inventory.price < b.inventory.price
        ? -1
        : a.inventory.price > b.inventory.price
        ? 1
        : 0
    );
    return {
      ...state,
      products,
    };
  }

  if (action.type === SORT_PRICE_DESC) {
    const products = state.originalProducts.sort((a, b) =>
      a.inventory.price < b.inventory.price
        ? 1
        : a.inventory.price > b.inventory.price
        ? -1
        : 0
    );

    return {
      ...state,
      products,
    };
  }

  if (action.type === PAGINATE) {
    const pageParam = Number(action.payload.pageParam);
    const endAt = pageParam * PAGE_SIZE;
    const startAt = endAt - PAGE_SIZE;
    const products = state.originalProducts.slice(startAt, endAt);

    return {
      ...state,
      products,
    };
  }

  if (action.type === CATEGORY) {
    const { categoryParam } = action.payload;
    let products = [];

    if (categoryParam) {
      products = state.originalProducts.filter((product) => {
        return product.categories.includes(categoryParam);
      });
    } else {
      products = state.originalProducts;
    }

    return {
      ...state,
      products,
    };
  }

  if (action.type === BRAND) {
    let products = [];
    const { brandParam } = action.payload;
    if (brandParam) {
      products = state.originalProducts.filter((product) => {
        return product.brand === brandParam;
      });
    } else {
      products = state.originalProducts;
    }

    return {
      ...state,
      products,
    };
  }

  // default return previous state when action not found
  return state;
};

export default productReducer;
