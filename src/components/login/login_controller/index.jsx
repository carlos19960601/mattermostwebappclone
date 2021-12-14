import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import logoImage from "../../../assets/images/logo.png";
import { useLoginMutation } from "../../../store/reducer/api";
import { selectConfig } from "../../../store/reducer/general";
import { t } from "../../../utils/i18n";
import * as Utils from "../../../utils/utils";
import AnnouncementBar from "../../announcement_bar/announcement_bar_controller";
import SiteNameAndDescription from "../../common/site_name_and_description";
import FormError from "../../form_error";
import LocalizedInput from "../../localized_input";
import LoadingWrapper from "../../widgets/loading/loading_wrapper";

const LoginController = (props) => {
  const { location } = props;
  // Store
  const config = useSelector(selectConfig);
  const emailSigninEnabled = config.EnableSignInWithEmail;

  // State
  const [showMfa, setShowMfa] = useState(false);
  const [serverError, setServerError] = useState(null);
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Ref
  const loginIdInput = useRef(null);
  const passwordInput = useRef(null);

  // API
  const [loginAPI] = useLoginMutation();

  const preSubmit = (e) => {
    e.preventDefault();

    if (loginIdInput.current) {
      const inputLoginId = loginIdInput.current.value;
      if (inputLoginId !== loginId) {
        setLoginId(inputLoginId.trim().toLowerCase());
      }
    }

    if (passwordInput.current) {
      const inputPassword = passwordInput.current.value;
      if (inputPassword !== password) {
        setPassword(inputPassword.trim());
      }
    }

    if (!loginId) {
      let msgId = "login.no";
      if (emailSigninEnabled) {
        msgId += "Email";
      }

      setServerError(
        <FormattedMessage
          id={msgId}
          values={{
            ldapUsername:
              props.ldapLoginFieldName ||
              Utils.localizeMessage(
                "login.ldapUsernameLower",
                "AD/LDAP username"
              ),
          }}
        />
      );
    }

    if (!password) {
      setServerError(
        <FormattedMessage
          id="login.noPassword"
          defaultMessage="Please enter your password"
        />
      );
    }

    submit(loginId, password, "");
  };

  const submit = (loginId, password, token) => {
    setLoading(true);
    setServerError(null);

    try {
      loginAPI({
        loginId,
        password,
        token,
      }).unwrap();

      finishSignin();
    } catch (error) {
      if (error.server_error_id === "api.user.login.not_verified.app_error") {
      } else if (
        error.server_error_id === "store.sql_user.get_for_login.app_error" ||
        error.server_error_id ===
          "ent.ldap.do_login.user_not_registered.app_error"
      ) {
        setLoading(false);
        setServerError(
          <FormattedMessage
            id="login.userNotFound"
            defaultMessage="We couldn't find an account matching your login credentials."
          />
        );
      } else if (
        error.server_error_id ===
          "api.user.check_user_password.invalid.app_error" ||
        error.server_error_id === "ent.ldap.do_login.invalid_password.app_error"
      ) {
        setLoading(false);
        setServerError(
          <FormattedMessage
            id="login.invalidPassword"
            defaultMessage="Your password is incorrect."
          />
        );
      } else {
        setLoading(false);
        setServerError(error.message);
      }

      return;
    }
  };

  const finishSignin = (team) => {
    
  };

  const handleLoginIdChange = (e) => {
    setLoginId(e.target.value);
  };

  const createLoginPlaceholder = () => {
    const loginPlaceholders = [];
    if (emailSigninEnabled) {
      loginPlaceholders.push(Utils.localizeMessage("login.email", "Email"));
    }

    if (loginPlaceholders.length >= 2) {
    } else if (loginPlaceholders.length === 1) {
      return loginPlaceholders[0];
    }

    return "";
  };

  const createExtraText = () => {
    return null;
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const createLoginOptions = () => {
    const loginControls = [];

    if (emailSigninEnabled) {
      let errorClass = "";
      if (serverError) {
        errorClass = " has-error";
      }
      loginControls.push(
        <form key="loginBoxes" onSubmit={preSubmit}>
          <div className="signup__email-container">
            <div className={"form-group" + errorClass}>
              <FormError error={serverError} margin={true} />
              <input
                id="loginId"
                className="form-control"
                ref={loginIdInput}
                name="loginId"
                value={loginId}
                onChange={handleLoginIdChange}
                placeholder={createLoginPlaceholder()}
                spellCheck="false"
                autoCapitalize="off"
                autoFocus={true}
              />
            </div>
            <div className={"form-group" + errorClass}>
              <LocalizedInput
                id="loginPassword"
                type="password"
                className="form-control"
                ref={passwordInput}
                name="password"
                value={password}
                onChange={handlePasswordChange}
                placeholder={{
                  id: t("login.password"),
                  defaultMessage: "Password",
                }}
                spellCheck="false"
              />
            </div>
            <div className="form-group">
              <button
                id="loginButton"
                type="submit"
                className="btn btn-primary"
              >
                <LoadingWrapper
                  id="login_button_signing"
                  loading={loading}
                  text={Utils.localizeMessage(
                    "login.signInLoading",
                    "Signing in..."
                  )}
                >
                  <FormattedMessage
                    id="login.signIn"
                    defaultMessage="Sign in"
                  />
                </LoadingWrapper>
              </button>
            </div>
          </div>
        </form>
      );
    }

    return (
      <div>
        {createExtraText()}
        {loginControls}
      </div>
    );
  };

  const createCustomLogin = () => {
    return null;
  };

  let content;
  let customContent;
  let customClass;
  let backButton;

  if (showMfa) {
  } else {
    content = createLoginOptions();
    customContent = createCustomLogin();
    if (customContent) {
      customClass = "branded";
    }
  }

  return (
    <div>
      <AnnouncementBar />
      {backButton}
      <div id="login_section" className="col-sm-12">
        <div className={"signup-team__container " + customClass}>
          <div className="signup__markdown">{customContent}</div>
          <img
            alt={"signup team logo"}
            className="signup-team-logo"
            src={logoImage}
          />
          <div className="signup__content">
            <SiteNameAndDescription
              customDescriptionText={config.CustomDescriptionText}
              siteName={config.SiteName}
            />
            {content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginController;
