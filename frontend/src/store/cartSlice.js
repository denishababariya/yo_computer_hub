import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      // payload: { id, product, qty = 1, replace = false }
      const { id, product, qty = 1, replace = false } = action.payload;
      const existing = state.items[id];
      if (replace) {
        // set the qty to provided value (or remove if <=0)
        if (qty > 0) {
          state.items[id] = { product, qty };
        } else {
          delete state.items[id];
        }
      } else {
        state.items[id] = {
          product,
          qty: (existing?.qty || 0) + qty,
        };
      }
    },
    removeFromCart: (state, action) => {
      delete state.items[action.payload];
    },
    setQty: (state, action) => {
      const { id, qty } = action.payload;
      if (state.items[id]) {
        state.items[id].qty = qty;
        if (qty <= 0) delete state.items[id];
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addToCart, removeFromCart, setQty, clearCart } = cartSlice.actions;
export default cartSlice.reducer;