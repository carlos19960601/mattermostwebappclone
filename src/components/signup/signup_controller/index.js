import { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/logo.png";
import { selectConfig } from "../../../store/reducer/general";
import { t } from "../../../utils/i18n";
import AnnouncementBar from "../../announcement_bar/announcement_bar_controller";
import BackButton from "../../common/back_button";
import LocalizedIcon from "../../localized_icon";

export default function SignupController(props) {
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");
  const [noOpenServerError] = useState(false);
  const [usedBefore, setUsedBefore] = useState(false);

  const enableSignUpWithEmail = useSelector(selectConfig).EnableSignUpWithEmail;
  const enableSignUpWithGitLab =
    useSelector(selectConfig).EnableSignUpWithGitLab;

  const renderSignupControls = () => {
    let signupControls = [];
    if (enableSignUpWithEmail) {
      signupControls.push(
        <Link to={"/signup_email" + window.location.search}>
          <span>
            <LocalizedIcon
              className="icon fa fa-envelope"
              component="span"
              title={{
                id: t("signup.email.icon"),
                defaultMessage: "Email Icon",
              }}
            />
            <FormattedMessage
              id="signup.email"
              defaultMessage="Email and Password"
            />
          </span>
        </Link>
      );
    }

    if (enableSignUpWithGitLab) {
      signupControls.push(
        <a
          className="btn btn-custom-login btn--full gitlab"
          key="gitlab"
          href={""}
        >
          <span>
            <span className="icon" />
            <span>
              <FormattedMessage
                id="signup.gitlab"
                defaultMessage="GitLab Single Sign-On"
              />
            </span>
          </span>
        </a>
      );
    }

    if (props.isLicensed && props.enableSignUpWithGoogle) {
    }

    if (props.isLicensed && props.enableSignUpWithOffice365) {
    }

    if (props.isLicensed && props.enableSignUpWithOpenId) {
    }

    if (props.isLicensed && props.enableLDAP) {
    }

    if (props.isLicensed && props.enableSAML) {
    }
    if (signupControls.length === 0) {
      // const signupDisabledError = (
      //   <FormattedMessage
      //     id="signup_user_completed.none"
      //     defaultMessage="No user creation method has been enabled. Please contact an administrator for access."
      //   />
      // );
      // signupControls = <FormError error={signupDisabledError} margin={true} />;
    }

    return signupControls;
  };

  let signupControls;
  if (noOpenServerError || usedBefore) {
    signupControls = null;
  } else {
    signupControls = renderSignupControls();
  }

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
            {signupControls}
            {serverError}
          </div>
          <span className="color--light">
            <FormattedMessage
              id="signup_user_completed.haveAccount"
              defaultMessage="Already have an account?"
            />{" "}
            <Link to={"/login"}>
              <FormattedMessage
                id="signup_user_completed.signIn"
                defaultMessage="Click here to sign in."
              />
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
}
