import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    appState: false,
    credentials: {},
    config: {
      enableSignUpWithEmail: true,
    },
    dataRetentionPolicy: {},
    deviceToken: "",
    license: {},
    serverVersion: "",
    warnMetricsStatus: {},
    firstAdminVisitMarketplaceStatus: false,
  },
  reducers: {},
});

export default generalSlice.reducer;
