import { configureStore } from "@reduxjs/toolkit";
import { currentUserIdReducer } from "./reducer/users";

export default configureStore({
  reducer: {
    currentUserId: currentUserIdReducer,
  },
});
