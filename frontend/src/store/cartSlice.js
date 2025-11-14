import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, product, qty = 1 } = action.payload;
      const existing = state.items[id];
      state.items[id] = {
        product,
        qty: (existing?.qty || 0) + qty,
      };
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