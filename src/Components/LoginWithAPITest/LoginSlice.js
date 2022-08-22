import { createSlice } from "@reduxjs/toolkit";

export const LoginSlice = createSlice({
  name: "login",
  initialState: {
    User: {},
    isAuth: false,
  },
  reducers: {
    setUser(state, action) {
      state.User = action.payload;
    },
    setAuth(state, action) {
      state.isAuth = action.payload;
    },
  },
});

export const LoginReducer = LoginSlice.reducer;
export const { setUser, setAuth } = LoginSlice.actions;
