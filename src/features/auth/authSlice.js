import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("freelanzo_user")) || null,
  isAuthenticated: !!localStorage.getItem("freelanzo_user"),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    authSuccess: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
      state.error = null;
      localStorage.setItem("freelanzo_user", JSON.stringify(action.payload));
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.loading = false;
      state.error = null;
      localStorage.removeItem("freelanzo_user");
    },
    clearError: (state) => {
      state.error = null;
    }
  },
});

export const { authStart, authSuccess, authFailure, logout, clearError } = authSlice.actions;
export default authSlice.reducer;
