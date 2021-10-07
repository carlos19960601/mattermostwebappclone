import { createSlice } from "@reduxjs/toolkit";

export const profilesSlice = createSlice({
  name: "profiles",
  initialState: {},
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

export const { login, loginSuccess, receivedMe } = profilesSlice.actions;
export default profilesSlice.reducer;
