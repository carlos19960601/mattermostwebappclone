import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import UsersService from "../../services/users";

export const createUser = createAsyncThunk(
  "users/create",
  async ({ user, token, inviteId, redirectTo }) => {
    const res = await UsersService.create({
      user,
      token,
      inviteId,
      redirectTo,
    });
    return res.data;
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUserId: "",
    profiles: {},
  },
  reducers: {
    receivedProfiles: (state, action) => {
      let profiles = action.data;
      Object.keys(profiles).forEach((key) => {
        state.profiles[key] = profiles[key];
      });
    },
  },
});

export const { receivedProfiles } = usersSlice.actions;
export default usersSlice.reducer;
