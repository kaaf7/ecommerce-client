import { createSlice } from "@reduxjs/toolkit";





const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    loggedIn: false,
    isFetching: false,
    registerationSuccess: false,
    registerationDone: false,
    error: false,
  },
  reducers: {
    registerStart: (state) => {
      state.isFetching = true;
    },
    registerSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
      state.registerationSuccess = true;
      state.registerationDone = true;
    },
    registerFailed: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentUser = null;
      state.registerationSuccess = false;
    },
    registerDone: (state) => {
      state.registerationDone = false;
    },

    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      let newLogIn = true;
      state.loggedIn = newLogIn;
    },
    loginFailed: (state) => {
      state.isFetching = false;
      state.error = true;
      state.currentUser = null;
    },
    logOut: (state) => {
      state.isFetching = false;
      state.currentUser = null;
      state.error = false;
      state.loggedIn = true;
    },

    
  },
});

export const {
  registerStart,
  registerSuccess,
  registerFailed,
  registerDone,

  loginStart,
  loginSuccess,
  loginFailed,
  logOut,
} = userSlice.actions;
export default userSlice.reducer;
