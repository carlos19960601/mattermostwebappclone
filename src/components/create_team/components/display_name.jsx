import { useState } from "react";
import { FormattedMessage } from "react-intl";
import logoImage from "../../../assets/images/logo.png";
import Constants from "../../../utils/constants";
import { cleanUpUrlable } from "../../../utils/url";
import NextIcon from "../../widgets/icons/fa_next_icon";

const TeamSignupDisplayNamePage = (props) => {
  const [nameError, setNameError] = useState(null);
  const [teamDisplayName, setTeamDisplayname] = useState("");

  const handleFocus = (e) => {
    e.preventDefault();
    e.currentTarget.select();
  };

  const handleDisplayNameChange = (e) => {
    setTeamDisplayname(e.target.value);
  };

  const submitNext = (e) => {
    e.preventDefault();
    const displayName = teamDisplayName.trim();
    if (!displayName) {
      setNameError(
        <FormattedMessage
          id="create_team.display_name.required"
          defaultMessage="This field is required"
        />
      );
      return;
    } else if (
      displayName.length < Constants.MIN_TEAMNAME_LENGTH ||
      displayName.length > Constants.MAX_TEAMNAME_LENGTH
    ) {
      setNameError(
        <FormattedMessage
          id="create_team.display_name.charLength"
          defaultMessage="Name must be {min} or more characters up to a maximum of {max}. You can add a longer team description later."
          values={{
            min: Constants.MIN_TEAMNAME_LENGTH,
            max: Constants.MAX_TEAMNAME_LENGTH,
          }}
        />
      );
      return;
    }

    let newState = {
      wizard: "team_url",
      team: {
        display_name: displayName,
        name: cleanUpUrlable(displayName),
      },
    };
    props.updateParent(newState);
  };

  let nameErrorLabel = null;
  let nameDivClass = "form-group";
  if (nameError) {
    nameErrorLabel = <label className="control-label">{nameError}</label>;
    nameDivClass += " has-error";
  }
  return (
    <div>
      <form>
        <img alt={"signup logo"} className="signup-team-logo" src={logoImage} />
        <h5>
          <FormattedMessage
            id="create_team.display_name.teamName"
            tagName="strong"
            defaultMessage="Team Name"
          />
        </h5>
        <div className={nameDivClass}>
          <div className="row">
            <div className="col-sm-9">
              <input
                id="teamNameInput"
                type="text"
                className="form-control"
                placeholder=""
                maxLength={128}
                value={teamDisplayName}
                autoFocus={true}
                onFocus={handleFocus}
                onChange={handleDisplayNameChange}
                spellCheck="false"
              />
            </div>
          </div>
          {nameError}
        </div>
        <div>
          <FormattedMessage
            id="create_team.display_name.nameHelp"
            defaultMessage="Name your team in any language. Your team name shows in menus and headings."
          />
        </div>
        <button
          id="teamNameNextButton"
          type="submit"
          className="btn btn-primary mt-8"
          onClick={submitNext}
        >
          <FormattedMessage
            id="create_team.display_name.next"
            defaultMessage="Next"
          />
          <NextIcon />
        </button>
      </form>
    </div>
  );
};

export default TeamSignupDisplayNamePage;
