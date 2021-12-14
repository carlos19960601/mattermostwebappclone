import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { Link } from "react-router-dom";
import logoImage from "../../assets/images/logo.png";
import * as UserAgent from "../../utils/user_agent";
import AnnouncementBar from "../announcement_bar/announcement_bar_controller";
import BackButton from "../common/back_button";
import SiteNameAndDescription from "../common/site_name_and_description";
import SystemPermissionGate from "../permissions_gates/system_permission_gate";
import LogoutIcon from "../widgets/icons/fa_logout_icon";

const SelectTeam = (props) => {
  const { isMemberOfTeam, customDescriptionText, siteName } = props;

  const { formatMessage } = useIntl();

  const [error, setError] = useState(null);

  const handleLogoutClick = () => {};

  let openContent;

  const teamSignUp = (
    <SystemPermissionGate permissions={[Permissions.CREATE_TEAM]}>
      <div className="margin--extra" style={{ marginTop: "0.5em" }}>
        <Link
          id="createNewTeamLink"
          to="/create_team"
          onClick={() => {}}
          className="signup-team-login"
        >
          <FormattedMessage
            id="login.createTeam"
            defaultMessage="Create a team"
          />
        </Link>
      </div>
    </SystemPermissionGate>
  );

  let adminConsoleLink;
  if (!UserAgent.isMobileApp()) {
    adminConsoleLink = (
      <SystemPermissionGate permissions={[Permissions.MANAGE_SYSTEM]}>
        <div className="mt-8 hidden-xs">
          <Link
            to="/admin_console"
            className="signup-team-login"
            onClick={() => {}}
          >
            <FormattedMessage
              id="signup_team_system_console"
              defaultMessage="Go to System Console"
            />
          </Link>
        </div>
      </SystemPermissionGate>
    );
  }

  let headerButton;
  if (error) {
    headerButton = <BackButton onClick={this.clearError} />;
  } else if (isMemberOfTeam) {
    headerButton = <BackButton />;
  } else {
    headerButton = (
      <div className="signup-header">
        <a href="#" id="logout" onClick={handleLogoutClick}>
          <LogoutIcon />
          <FormattedMessage id="web.header.logout" defaultMessage="Logout" />
        </a>
      </div>
    );
  }
  return (
    <div>
      <AnnouncementBar />
      {headerButton}
      <div className="col-sm-12">
        <div className={"select-team__container signup-team__container"}>
          <img
            alt={"signup team logo"}
            className="signup-team-logo"
            src={logoImage}
          />
          <SiteNameAndDescription
            customDescriptionText={customDescriptionText}
            siteName={siteName}
          />
          {openContent}
          {teamSignUp}
          {adminConsoleLink}
        </div>
      </div>
    </div>
  );
};

export default SelectTeam;
