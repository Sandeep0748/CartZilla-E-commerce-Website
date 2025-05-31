// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
});

// ✅ Async thunk to fetch product categories
export const fetchCategories = createAsyncThunk("products/fetchCategories", async () => {
  const response = await axios.get("https://fakestoreapi.com/products/categories");
  return response.data;
});

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    categories: [],
    selectedCategory: "all",
    status: "idle",
    error: null,
  },
  reducers: {
    // ✅ Allow setting selected category from UI
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      });
  },
});

// ✅ Export action to use in ProductCategory component
export const { setSelectedCategory } = productSlice.actions;

export default productSlice.reducer;
