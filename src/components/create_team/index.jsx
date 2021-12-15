import { useState } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import AnnouncementBar from "../announcement_bar/announcement_bar_controller";
import BackButton from "../common/back_button";
import DisplayName from "./components/display_name";
import TeamUrl from "./components/team_url";

const CreateTeam = (props) => {
  const [state, setState] = useState({
    team: {},
    wizard: "display_name",
  });

  const updateParent = (state) => {
    setState(state);
    props.history.push(`/create_team/${state.wizard}`);
  };

  let url = "/select_team";
  return (
    <div>
      <AnnouncementBar />
      <BackButton url={url} />
      <div className="col-sm-12">
        <div className="signup-team__container">
          <Switch>
            <Route
              path={`${props.match.url}/display_name`}
              render={(props) => (
                <DisplayName
                  state={state}
                  updateParent={updateParent}
                  {...props}
                />
              )}
            />
            <Route
              path={`${props.match.url}/team_url`}
              render={(props) => (
                <TeamUrl state={state} updateParent={updateParent} {...props} />
              )}
            />
            <Redirect to={`${props.match.url}/display_name`} />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
