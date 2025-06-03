// src/redux/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch all products
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  // Send GET request to API and return response data
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
    // TODO: Initialize items array to store fetched products
    items: [],
    categories: [],
    selectedCategory: "all",
    // TODO: Initialize status for tracking API request state
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
    // TODO: Handle fetchProducts pending state
      .addCase(fetchProducts.pending, (state) => {
         // Update status to loading
        state.status = "loading";
      })
      // TODO: Handle fetchProducts fulfilled state and store fetched products
      .addCase(fetchProducts.fulfilled, (state, action) => {
        // Update status and store products
        state.status = "succeeded";
        state.items = action.payload;
      })
       // TODO: Handle fetchProducts rejected state
      .addCase(fetchProducts.rejected, (state, action) => {
        // Update status to failed
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
