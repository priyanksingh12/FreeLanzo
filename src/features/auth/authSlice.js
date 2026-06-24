import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("freelanzo_user")) || null,
  accessToken: null, // intentionally NOT persisted to localStorage — memory only
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
    // Expect the payload shape: { user, accessToken }
    authSuccess: (state, action) => {
      const { user, accessToken } = action.payload;
      state.loading = false;
      state.isAuthenticated = true;
      state.user = user;
      state.accessToken = accessToken;
      state.error = null;
      localStorage.setItem("freelanzo_user", JSON.stringify(user));
    },
    authFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
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