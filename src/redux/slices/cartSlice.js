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
  // TODO: Initialize state with cart data from localStorage
  initialState: loadCartFromLocalStorage(),
  reducers: {
    // TODO: Implement addToCart reducer to add items to cart and update localStorage
    addToCart: (state, action) => {
      // Check if item exists in cart and update quantity
      // Otherwise, add new item to cart
      // Update localStorage
      const item = state.find((product) => product.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
      saveCartToLocalStorage(state);
    },

    // TODO: Implement removeFromCart reducer to remove items from cart and update localStorage
    removeFromCart: (state, action) => {
      // Remove item from cart
      // Update localStorage

      const newState = state.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(newState);
      return newState; // Return new state so Redux updates correctly
    },

    // TODO: Implement increaseQuantity reducer to increase item quantity and update localStorage
    increaseQuantity: (state, action) => {
      // Find item and increase quantity
      // Update localStorage
      const item = state.find((product) => product.id === action.payload);
      if (item) {
        item.quantity += 1;
        saveCartToLocalStorage(state);
      }
    },

    // TODO: Implement decreaseQuantity reducer to decrease item quantity and update localStorage
    decreaseQuantity: (state, action) => {
      // Find item and decrease quantity if greater than 1
      // Update localStorage
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

