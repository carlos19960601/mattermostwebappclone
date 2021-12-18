import { useState } from "react";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import { useHistory } from "react-router-dom";
import logoImage from "../../../assets/images/logo.png";
import {
  useCheckIsTeamExistsMutation,
  useCreateTeamMutation,
} from "../../../store/reducer/api";
import Constants from "../../../utils/constants";
import * as URL from "../../../utils/url";
import FormattedMarkdownMessage from "../../formatted_markdown_message";
import OverlayTrigger from "../../overlay_trigger";
import Tooltip from "../../tooltip";

const TeamUrl = (props) => {
  // State
  const [nameError, setNameError] = useState("");
  const [teamURL, setTeamURL] = useState(props.state.team?.name);
  const [isLoading, setIsLoading] = useState(false);

  // API
  const [checkIfTeamExists] = useCheckIsTeamExistsMutation();
  const [createTeam] = useCreateTeamMutation();

  const history = useHistory();

  const handleFocus = (e) => {
    e.preventDefault();
    e.currentTarget.select();
  };

  const handleTeamURLInputChange = (e) => {
    setTeamURL(e.target.value);
  };

  const submitBack = (e) => {};

  const submitNext = async (e) => {
    e.preventDefault();
    const name = teamURL.trim();
    const cleanedName = URL.cleanUpUrlable(name);
    const urlRegex = /^[a-z]+([a-z\-0-9]+|(__)?)[a-z0-9]+$/g;

    if (!name) {
      setNameError(
        <FormattedMessage
          id="create_team.team_url.required"
          defaultMessage="This field is required"
        />
      );
      return;
    }

    if (
      cleanedName.length < Constants.MIN_TEAMNAME_LENGTH ||
      cleanedName.length > Constants.MAX_TEAMNAME_LENGTH
    ) {
      setNameError(
        <FormattedMessage
          id="create_team.team_url.charLength"
          defaultMessage="Name must be {min} or more characters up to a maximum of {max}"
          values={{
            min: Constants.MIN_TEAMNAME_LENGTH,
            max: Constants.MAX_TEAMNAME_LENGTH,
          }}
        />
      );
      return;
    }

    if (cleanedName !== name || !urlRegex.test(name)) {
      setNameError(
        <FormattedMessage
          id="create_team.team_url.regex"
          defaultMessage="Use only lower case letters, numbers and dashes. Must start with a letter and can't end in a dash."
        />
      );
      return;
    }

    for (let index = 0; index < Constants.RESERVED_TEAM_NAMES.length; index++) {
      if (cleanedName.indexOf(Constants.RESERVED_TEAM_NAMES[index]) === 0) {
        setNameError(
          <FormattedMarkdownMessage
            id="create_team.team_url.taken"
            defaultMessage="This URL [starts with a reserved word](!https://docs.mattermost.com/help/getting-started/creating-teams.html#team-url) or is unavailable. Please try another."
          />
        );
        return;
      }
    }

    setIsLoading(true);
    const teamSignup = JSON.parse(JSON.stringify(props.state));
    teamSignup.team.type = "O";
    teamSignup.team.name = name;

    try {
      const checkIfTeamExistsData = await checkIfTeamExists(name).unwrap();
      if (checkIfTeamExistsData.exists) {
        setNameError(
          <FormattedMessage
            id="create_team.team_url.unavailable"
            defaultMessage="This URL is taken or unavailable. Please try another."
          />
        );
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.error("rejected", error);
    }

    try {
      const data = await createTeam(teamSignup.team).unwrap();
      if (data) {
        history.push(`/${data.name}/channels/${Constants.DEFAULT_CHANNEL}`);
      }
    } catch (error) {
      setNameError(error.message);
      setIsLoading(false);
    }
  };

  let nameErrorLabel = null;
  let nameDivClass = "form-group";
  if (nameError) {
    nameErrorLabel = <label className="control-label">{nameError}</label>;
    nameDivClass += " has-error";
  }

  const title = `${URL.getSiteURL()}`;
  const urlTooltip = <Tooltip id="urlTooltip">{title}</Tooltip>;

  let finishMessage = (
    <FormattedMessage
      id="create_team.team_url.finish"
      defaultMessage="Finish"
    />
  );
  return (
    <div>
      <form>
        <img alt={"signup logo"} className="signup-team-logo" src={logoImage} />
        <h5>
          <FormattedMessage
            id="create_team.team_url.teamUrl"
            tagName="strong"
            defaultMessage="Team URL"
          />
        </h5>
        <div className={nameDivClass}>
          <div className="row">
            <div className="col-sm-11">
              <div className="input-group input-group--limit">
                <OverlayTrigger
                  delayShow={Constants.OVERLAY_TIME_DELAY}
                  placement="top"
                  overlay={urlTooltip}
                >
                  <span className="input-group-addon">{title}</span>
                </OverlayTrigger>
                <input
                  id="teamURLInput"
                  type="text"
                  className="form-control"
                  placeholder=""
                  maxLength={128}
                  value={teamURL}
                  autoFocus={true}
                  onFocus={handleFocus}
                  onChange={handleTeamURLInputChange}
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
          {nameErrorLabel}
        </div>
        <p>
          <FormattedMessage
            id="create_team.team_url.webAddress"
            defaultMessage="Choose the web address of your new team:"
          />
        </p>
        <ul className="color--light">
          <li>
            <FormattedMessage
              id="create_team.team_url.hint1"
              defaultMessage="Short and memorable is best"
            />
          </li>
          <li>
            <FormattedMessage
              id="create_team.team_url.hint2"
              defaultMessage="Use lowercase letters, numbers and dashes"
            />
          </li>
          <li>
            <FormattedMessage
              id="create_team.team_url.hint3"
              defaultMessage="Must start with a letter and can't end in a dash"
            />
          </li>
        </ul>
        <div className="mt-8">
          <Button
            id="teamURLFinishButton"
            type="submit"
            bsStyle="primary"
            disabled={isLoading}
            onClick={(e) => submitNext(e)}
          >
            {finishMessage}
          </Button>
        </div>
        <div className="mt-8">
          <a href="#" onClick={submitBack}>
            <FormattedMessage
              id="create_team.team_url.back"
              defaultMessage="Back to previous step"
            />
          </a>
        </div>
      </form>
    </div>
  );
};

export default TeamUrl;
