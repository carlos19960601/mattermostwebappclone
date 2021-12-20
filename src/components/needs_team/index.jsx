import { useState } from "react";
import { Route, Switch } from "react-router-dom";
import ChannelController from "../channel_layout/channel_controller";

const NeedsTeam = () => {
  const [finishedFetchingChannels, setFinishedFetchingChannels] =
    useState(true);

  return (
    <Switch>
      <Route
        render={() => (
          <ChannelController fetchingChannels={!finishedFetchingChannels} />
        )}
      />
    </Switch>
  );
};

export default NeedsTeam;
