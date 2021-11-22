import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./reducer/api";
import generalReducer from "./reducer/general";
import i18nReducer from "./reducer/i18n";
import usersReducer from "./reducer/users";

export default configureStore({
  reducer: {
    users: usersReducer,
    i18n: i18nReducer,
    general: generalReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
