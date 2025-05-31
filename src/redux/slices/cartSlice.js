import { createSlice } from "@reduxjs/toolkit";

// Load cart data from localStorage
const loadCartFromLocalStorage = () => {
  const cartData = localStorage.getItem("cart");
  return cartData ? JSON.parse(cartData) : [];
};

// Save cart data to localStorage
const saveCartToLocalStorage = (cart) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const cartSlice = createSlice({
  name: "cart",
  initialState: loadCartFromLocalStorage(),
  reducers: {
    addToCart: (state, action) => {
      const item = state.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },

    removeFromCart: (state, action) => {
      const newState = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(newState);
      return newState; // Return new state so Redux updates correctly
    },

    increaseQuantity: (state, action) => {
      const item = state.find((product) => product.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state);
      }
    },

    decreaseQuantity: (state, action) => {
      const item = state.find((product) => product.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        saveCartToLocalStorage(state);
      }
    },

    clearCart: () => {
      localStorage.removeItem("cart");
      return []; // Return empty array for Redux state update
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

