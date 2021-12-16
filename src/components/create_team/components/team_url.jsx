import { useState } from "react";
import { Button } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import logoImage from "../../../assets/images/logo.png";
import Constants from "../../../utils/constants";
import * as URL from "../../../utils/url";
import OverlayTrigger from "../../overlay_trigger";
import Tooltip from "../../tooltip";

const TeamUrl = (props) => {
  const [nameError, setNameError] = useState("");
  const [teamURL, setTeamURL] = useState(props.state.team?.name);
  const [isLoading, setIsLoading] = useState(false);

  const handleFocus = (e) => {
    e.preventDefault();
    e.currentTarget.select();
  };

  const handleTeamURLInputChange = (e) => {
    setTeamURL(e.target.value);
  };

  const submitBack = (e) => {};
  const submitNext = (e) => {};

  let nameErrorLabel = null;
  let nameDivClass = "form-group";
  if (nameError) {
    nameErrorLabel = <label className="control-label">{nameError}</label>;
    nameDivClass += " has-error";
  }

  const title = `${URL.getSiteURL()}/`;
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
