import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// TODO: Create an async thunk for login request
export const loginUser = createAsyncThunk("auth/loginUser", async (credentials, { rejectWithValue }) => {
  try {
    // TODO: Send a POST request to login API
    const response = await axios.post("https://reqres.in/api/login", credentials, {
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'reqres-free-v1'
    }
  }
);
    console.log(response)
    localStorage.setItem("token", response.data.token);
    return response.data;
    // TODO: Store token in localStorage on successful login
  } catch (error) {
    return rejectWithValue("Invalid credentials");
  }
});

// TODO: Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // TODO: Initialize token from localStorage or null
    token: localStorage.getItem("token") || null,
    status: "idle",
    error: null,
  },
  reducers: {
    // TODO: Implement logout reducer to clear token from state and localStorage
    logout: (state) => {
      // Remove token from state
      state.token = null;
      // Remove token from localStorage
      localStorage.removeItem("token");
    },
  },
  extraReducers: (builder) => {
    builder
      // TODO: Handle loginUser pending state
      .addCase(loginUser.pending, (state) => {
        state.status = "loading";
      })
      // TODO: Handle loginUser fulfilled state and store token
      .addCase(loginUser.fulfilled, (state, action) => {
        // Store token and reset error
        state.status = "succeeded";
        state.token = action.payload.token;
        state.error = null;
      })
      // TODO: Handle loginUser rejected state and store error message
      .addCase(loginUser.rejected, (state, action) => {
        // Store error message
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

// TODO: Export logout action
export const { logout } = authSlice.actions;

export default authSlice.reducer;