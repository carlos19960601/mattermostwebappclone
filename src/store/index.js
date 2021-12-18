import { configureStore } from "@reduxjs/toolkit";
import { api } from "./reducer/api";
import channelsReducer from "./reducer/channels";
import generalReducer from "./reducer/general";
import i18nReducer from "./reducer/i18n";
import rolesReducer from "./reducer/roles";
import teamsReducer from "./reducer/teams";
import usersReducer from "./reducer/users";

export default configureStore({
  reducer: {
    users: usersReducer,
    i18n: i18nReducer,
    general: generalReducer,
    teams: teamsReducer,
    channels: channelsReducer,
    roles: rolesReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});
