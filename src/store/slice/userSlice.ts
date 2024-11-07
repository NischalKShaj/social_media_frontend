// <========================= file to create the slice for the user ================>

// importing the required module
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/types";

type UserState = {
  user: User;
  isAuthorized: boolean;
};

const initialState: UserState = {
  user: {
    username: "",
    email: "",
    profile: "",
    _id: "",
  },
  isAuthorized: false,
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    isLoggedIn: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthorized = true;
    },
    isLoggedOut: (state) => {
      state.user = { username: "", email: "", profile: "", _id: "" };
      state.isAuthorized = false;
    },
  },
});

export const { isLoggedIn, isLoggedOut } = userSlice.actions;

export default userSlice.reducer;
