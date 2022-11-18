import {
  FETCH_PRODUCTS,
  SORT_NEWEST,
  SORT_PRICE_ASC,
  SORT_PRICE_DESC,
  SORT_OLDEST,
  PAGINATE,
  CATEGORY,
  BRAND,
  SEARCH,
  RESET,
} from './actions';
import { PAGE_SIZE } from '~/constants';
import { searchProduct } from '~/utils';

const productReducer = (state, action) => {
  if (action.type === FETCH_PRODUCTS) {
    const { products } = action.payload;

    return {
      products,
      originalProducts: [...products],
    };
  }

  if (action.type === RESET) {
    const products = [...state.originalProducts]; // make copy
    return {
      ...state,
      products,
    };
  }

  if (action.type === SORT_NEWEST) {
    state.products.sort((a, b) =>
      a.createAt < b.createAt ? 1 : a.createAt > b.createAt ? -1 : 0
    );

    return {
      ...state,
    };
  }

  if (action.type === SORT_OLDEST) {
    state.products.sort((a, b) =>
      a.createAt < b.createAt ? -1 : a.createAt > b.createAt ? 1 : 0
    );

    return {
      ...state,
    };
  }

  if (action.type === SORT_PRICE_ASC) {
    state.products.sort((a, b) =>
      a.inventory.price < b.inventory.price
        ? -1
        : a.inventory.price > b.inventory.price
        ? 1
        : 0
    );

    return {
      ...state,
    };
  }

  if (action.type === SORT_PRICE_DESC) {
    state.products.sort((a, b) =>
      a.inventory.price < b.inventory.price
        ? 1
        : a.inventory.price > b.inventory.price
        ? -1
        : 0
    );

    return {
      ...state,
    };
  }

  if (action.type === PAGINATE) {
    const pageParam = Number(action.payload.pageParam) || 1;
    const endAt = pageParam * PAGE_SIZE;
    const startAt = endAt - PAGE_SIZE;
    const products = state.originalProducts.slice(startAt, endAt);

    return {
      ...state,
      products
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
      products = [...state.originalProducts]; // make copy
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
      products = [...state.originalProducts]; // make copy
    }

    return {
      ...state,
      products,
    };
  }

  if (action.type === SEARCH) {
    let products = [];
    const { qParam } = action.payload;
    if (qParam) {
      products = searchProduct(state.originalProducts, qParam);
    } else {
      products = [];
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
