import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeSection: "home",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setActiveSection: (state, action) => {
      state.activeSection = action.payload;
    },
  },
});

export const { setActiveSection } = uiSlice.actions;
export default uiSlice.reducer;
