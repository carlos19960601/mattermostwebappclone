import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/logo.png";
import BackButton from "../../common/back_button";
import SiteNameAndDescription from "../../common/site_name_and_description";

export default function SignupEmail(props) {
  const { customDescriptionText, siteName, hasAccounts, location } = props;
  const enableSignUpWithEmail = useSelector((state) => {
    return state.general.config.enableSignUpWithEmail;
  });
  const renderEmailSignup = () => {};

  let emailSignup;
  if (enableSignUpWithEmail) {
    emailSignup = renderEmailSignup();
  } else {
    return null;
  }

  return (
    <div>
      {hasAccounts && <BackButton onclick={() => {}} />}
      <div id="signup_email_section" className="col-sm-12">
        <div className="signup-team__container padding--less">
          <img
            alt={"signup team logo"}
            className="signup-team-logo"
            src={logoImage}
          />
          <SiteNameAndDescription
            customDescriptionText={customDescriptionText}
            siteName={siteName}
          />
          <h4 id="create_account" className="color--light">
            <FormattedMessage
              id="signup_user_completed.lets"
              defaultMessage="Let's create your account"
            />
          </h4>
          <span id="signin_account" className="color--light">
            <FormattedMessage
              id="signup_user_completed.haveAccount"
              defaultMessage="Already have an account?"
            />
            <Link id="signin_account_link" onClick={() => {}}>
              <FormattedMessage
                id="signup_user_completed.signIn"
                defaultMessage="Click here to sign in."
              />
            </Link>
          </span>
          {emailSignup}
        </div>
      </div>
    </div>
  );
}
