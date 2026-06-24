import { createSlice } from "@reduxjs/toolkit";
import { logout } from "../auth/authSlice";

const initialState = {
  role: null,
  onboardingStep: "role",
  location: { country: null, state: null, city: null },
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const { role, onboardingStep, location } = action.payload || {};
      if (role !== undefined) state.role = role;
      if (onboardingStep !== undefined) state.onboardingStep = onboardingStep;
      if (location !== undefined) state.location = location;
      state.loading = false;
      state.error = null;
    },
    onboardingStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    onboardingFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Whenever authSlice's logout fires, wipe this slice too.
    builder.addCase(logout, () => initialState);
  },
});

export const { setUserData, onboardingStart, onboardingFailure } = userSlice.actions;
export default userSlice.reducer;
