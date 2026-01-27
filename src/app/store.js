import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "../features/ui/uislice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});
