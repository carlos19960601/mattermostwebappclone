import { createSlice } from "@reduxjs/toolkit";

export const generalSlice = createSlice({
  name: "general",
  initialState: {
    appState: false,
    credentials: {},
    config: {
      AboutLink: "",
      PrivacyPolicyLink: "",
      TermsOfServiceLink: "",
      HelpLink: "",
      EnableSignUpWithEmail: true,
      EnableSignUpWithGitLab: true,
      EnableSignUpWithGoogle: true,
      EnableSignUpWithOffice365: true,
      EnableLdap: true,
      EnableSaml: true,
      CustomDescriptionText: "CustomDescriptionText",
      SiteName: "SiteName",
      EnableSignInWithEmail: true,
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

export const selectConfig = (state) => state.general.config;

export default generalSlice.reducer;
