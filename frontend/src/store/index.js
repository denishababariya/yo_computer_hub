import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishlistReducer from './wishlistSlice';

const PERSIST_KEY = 'yohub_state_v1';

function loadState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch {
    return undefined;
  }
}

function saveState(state) {
  try {
    const subset = { cart: state.cart, wishlist: state.wishlist };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(subset));
  } catch {}
}

const preloaded = loadState();

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: preloaded,
});

store.subscribe(() => saveState(store.getState()))

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  Object.values(state.cart.items).reduce((sum, i) => sum + i.qty, 0);
export const selectWishlistIds = (state) => state.wishlist.ids;
export const selectWishlistCount = (state) => state.wishlist.ids.length;