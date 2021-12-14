import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
  name: "teams",
  initialState: {
    currentTeamId: "",
    teams: {},
    myMembers: {},
    membersInTeam: null,
    stats: null,
    groupsAssociatedToTeam: null,
    totalCount: 0,
  },
  reducers: {},
});

export default teamsSlice.reducer;
