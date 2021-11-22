import { createSlice } from "@reduxjs/toolkit";

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

export const { loadTranslations } = i18nSlice.actions;
export default i18nSlice.reducer;
