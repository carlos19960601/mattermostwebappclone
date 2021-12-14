import { createSelector, createSlice } from "@reduxjs/toolkit";

export const usersSlice = createSlice({
  name: "users",
  initialState: {
    currentUserId: "",
    profiles: {},
  },
  reducers: {
    receivedProfiles: (state, action) => {
      let profiles = action.payload;
      Object.keys(profiles).forEach((key) => {
        state.profiles[key] = profiles[key];
      });
    },
    receivedMe: (state, action) => {
      const user = action.payload;
      state.currentUserId = user.id;
    },
  },
});

// selectors
export const selectProfiles = (state) => state.users.profiles;
export const selectCurrentUserId = (state) => state.users.currentUserId;

export const selectCurrentUser = createSelector(
  [selectCurrentUserId, selectProfiles],
  (profiles, userId) => profiles[userId]
);

export const selectMySystemRoles = createSelector(
  [selectCurrentUser],
  (user) => {
    if (user) {
      return new Set(user.roles.split(" "));
    }
    return new Set();
  }
);

export const selectMySystemPermissions = createSelector(
  [selectMySystemRoles, (state) => state.roles.roles],
  (mySystemRoles, roles) => {
    const permissions = new Set();
    for (const roleName of mySystemRoles) {
      if (roles[roleName]) {
        for (const permission of roles[roleName].permissions) {
          permissions.add(permission);
        }
      }
    }

    return permissions;
  }
);

export const { receivedProfiles, receivedMe } = usersSlice.actions;
export default usersSlice.reducer;
