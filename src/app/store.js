import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uislice";
import authReducer from "../features/auth/authSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    auth: authReducer,
  },
});
