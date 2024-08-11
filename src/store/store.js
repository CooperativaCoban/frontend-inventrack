import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "@/store/slice/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
 
  },
});
