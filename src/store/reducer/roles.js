import { createSlice } from "@reduxjs/toolkit";

export const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: {},
    pending: {},
  },
  reducers: {},
});

export default rolesSlice.reducer;
