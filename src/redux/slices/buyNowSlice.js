import { createSlice } from "@reduxjs/toolkit";

const buyNowSlice = createSlice({
  name: "buyNow",
  initialState: null,
  reducers: {
    setBuyNowItem: (state, action) => action.payload,
    clearBuyNow: () => null,  // Rename action to clearBuyNow
  },
});

export const { setBuyNowItem, clearBuyNow } = buyNowSlice.actions;  // Export clearBuyNow
export default buyNowSlice.reducer;

