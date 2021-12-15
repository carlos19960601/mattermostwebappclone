import { createSlice } from "@reduxjs/toolkit";

export const rolesSlice = createSlice({
  name: "roles",
  initialState: {
    roles: {},
    pending: new Set(),
  },
  reducers: {
    setPendingRoles: (state, action) => {
      state.pending = action.payload;
    },
    reveiveRoles: (state, action) => {
      if (action.payload) {
        for (const role of action.payload) {
          state.roles[role.name] = role;
        }
      }
    },
  },
});

export const selectPendingRoles = (state) => state.roles.pending;
export const selectLoadedRoles = (state) => state.roles.roles;

export const { setPendingRoles, reveiveRoles } = rolesSlice.actions;

export default rolesSlice.reducer;
