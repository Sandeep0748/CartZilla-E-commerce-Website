import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/productSlice";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import wishlistReducer from "./slices/wishlistSlice";
import notificationReducer from "./slices/notificationSlice";
import buyNowReducer from "./slices/buyNowSlice";

const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    wishlist: wishlistReducer,
    notification: notificationReducer,
    buyNow: buyNowReducer,
  },
});

export default store;

