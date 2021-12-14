import { createSlice } from "@reduxjs/toolkit";
import General from "../../constants/general";

export const i18nSlice = createSlice({
  name: "i18n",
  initialState: {
    translations: {},
  },
  reducers: {
    loadTranslations: (state, action) => {
      const url = action.playload;
    },
  },
});

export const selectCurrentLocale = (state) => {
  const currentUserId = state.users.currentUserId;
  const currentUser = state.users.profiles[currentUserId];
  if (currentUser) {
    return currentUser.locale || General.DEFAULT_LOCALE;
  }

  return General.DEFAULT_LOCALE;
};

export const selectTranslations = (state) => {
  const locale = selectCurrentLocale(state);
  return state.i18n.translations[locale];
};

export const { loadTranslations } = i18nSlice.actions;
export default i18nSlice.reducer;
