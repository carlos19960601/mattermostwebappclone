import { createSlice } from "@reduxjs/toolkit";

export const channelsSlice = createSlice({
  name: "channels",
  initialState: {
    currentChannelId: "",
    channels: {},
    channelsInTeam: {},
    myMembers: null,
    roles: null,
    membersInChannel: null,
    stats: null,
    groupsAssociatedToChannel: null,
    totalCount: 0,
    manuallyUnread: null,
    channelModerations: null,
    channelMemberCountsByGroup: null,
    messageCounts: null,
  },
  reducers: {},
});

export default channelsSlice.reducer;
