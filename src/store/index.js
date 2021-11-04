import { configureStore } from "@reduxjs/toolkit";
import currentUserIdReducer from "./reducer/currentUserId";
import generalReducer from "./reducer/general";
import i18nReducer from "./reducer/i18n";
import profilesReducer from "./reducer/profiles";

export default configureStore({
  reducer: {
    currentUserId: currentUserIdReducer,
    profiles: profilesReducer,
    i18n: i18nReducer,
    general: generalReducer,
  },
});
