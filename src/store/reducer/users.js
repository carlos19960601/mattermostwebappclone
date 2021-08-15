import { createSlice } from "@reduxjs/toolkit";

export const currentUserIdSlice = createSlice({
  name: "current_user_id",
  initialState: "",
  reducers: {
    login: (state, action) => {
      const user = action.data;
      return user ? user.id : state;
    },
    loginSuccess: (state) => {
      return "";
    },
    receivedMe: (state, action) => {
      const data = action.data || action.payload;
      return data.id;
    },
  },
});

export const { login, loginSuccess, receivedMe } = currentUserIdSlice.actions;
export const { currentUserIdReducer } = currentUserIdSlice.reducer;
