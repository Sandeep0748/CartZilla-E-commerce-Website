import { createSlice } from "@reduxjs/toolkit";
import { addToCart } from "./cartSlice";

// Helper function to load wishlist from localStorage
const loadWishlistFromLocalStorage = () => {
  try {
    const serializedWishlist = localStorage.getItem("wishlistItems");
    if (serializedWishlist === null) {
      return [];
    }
    return JSON.parse(serializedWishlist);
  } catch (e) {
    console.error("Could not load wishlist from localStorage", e);
    return [];
  }
};

// Helper function to save wishlist to localStorage
const saveWishlistToLocalStorage = (items) => {
  try {
    localStorage.setItem("wishlistItems", JSON.stringify(items));
  } catch (e) {
    console.error("Could not save wishlist to localStorage", e);
  }
};

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: loadWishlistFromLocalStorage(),
    status: "idle",
  },
  reducers: {
    addToWishlist: (state, action) => {
      const exists = state.items.find(item => item.id === action.payload.id);
      if (!exists) {
        state.items.push(action.payload);
        saveWishlistToLocalStorage(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      saveWishlistToLocalStorage(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlistToLocalStorage(state.items);
    },
  },
});

// Thunk to move item from wishlist to cart
export const moveToCart = (item) => (dispatch, getState) => {
  const cart = getState().cart; // assuming cart state shape has .items
  console.log(getState().cart)
  const alreadyInCart = cart.find(cartItem => cartItem.id === item.id);
  if (!alreadyInCart) {
    dispatch(addToCart({ ...item, quantity: 1 }));
  }
  console.log(cart, alreadyInCart,)
  dispatch(wishlistSlice.actions.removeFromWishlist(item.id));
};

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;

export default wishlistSlice.reducer;



