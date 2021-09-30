import logoImage from "@/assets/images/logo.png";
import AnnouncementBar from "@/components/announcement_bar/announcement_bar_controller";
import BackButton from "@/components/common/back_button";
import { FormattedMessage } from "react-intl";

export default function SignupController(props) {
  return (
    <div>
      <AnnouncementBar />
      <BackButton />
      <div className="col-sm-12">
        <div className="signup-team__container">
          <img
            alt={"signup team logo"}
            className="signup-team-logo"
            src={logoImage}
          />
          <div className="signup__content">
            <h1>{props.siteName}</h1>
            <h4 className="color--light">
              <FormattedMessage id="web.root.signup_info" />
            </h4>
            <div className="mt-8">
              <h5>
                <strong>
                  <FormattedMessage
                    id="signup.title"
                    defaultMessage="Create an account with:"
                  />
                </strong>
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
