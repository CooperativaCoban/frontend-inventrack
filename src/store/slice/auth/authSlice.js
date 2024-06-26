import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: null,
    role: null,
    loading: false,
  },
  reducers: {
    credentials: (state, { payload }) => {
      state.token = payload.token;
      state.role = payload.role;
      state.loading = false;
    },
    logout: (state) => {
      state.token = null;
      state.role = null;
    },
    isLoading: (state) => {
      state.loading = true;
    },
    loaded: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(HYDRATE, (state, action) => {
      console.log("HY", state);
      return {
        ...state,
        ...action.payload.auth,
      };
    });
  },
});

// Action creators are generated for each case reducer function
export const { credentials, logout, isLoading, loaded } = authSlice.actions;

export default authSlice.reducer;
