import { useRef, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logoImage from "../../../assets/images/logo.png";
import { useCreateUserMutation } from "../../../store/reducer/api";
import { receivedProfiles } from "../../../store/reducer/users";
import Constants from "../../../utils/constants";
import BackButton from "../../common/back_button";
import SiteNameAndDescription from "../../common/site_name_and_description";
import FormattedMarkdownMessage from "../../formatted_markdown_message";

export default function SignupEmail(props) {
  const { customDescriptionText, siteName, hasAccounts, location } = props;

  const dispatch = useDispatch();

  const enableSignUpWithEmail = useSelector((state) => {
    return state.general.config.enableSignUpWithEmail;
  });

  const emailRef = useRef(null);
  const nameRef = useRef(null);
  const passwordRef = useRef(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [token, setToken] = useState("");
  const [inviteId, setInviteId] = useState("");

  const [createUser, { isLoading }] = useCreateUserMutation();

  const isUserValid = function () {
    const providedEmail = emailRef.current?.value.trim();
    if (!providedEmail) {
      setEmailError(<FormattedMessage id="signup_user_completed.validEmail" />);
      return false;
    }

    return true;
  };

  const handleSignupSuccess = (user, data) => {
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (isUserValid()) {
      setNameError(null);
      setEmailError(null);
      setPasswordError(null);
      setIsSubmitting(true);

      const user = {
        email: emailRef.current?.value.trim(),
        username: nameRef.current?.value.trim(),
        password: passwordRef.current?.value.trim(),
      };
      const redirectTo = new URLSearchParams(location?.search).get(
        "redirect_to"
      );

      try {
        let result = await createUser({
          user,
          token,
          inviteId,
          redirectTo,
        }).unwrap();

        console.log("====", result);

        dispatch(
          receivedProfiles({
            [result.id]: result,
          })
        );
        handleSignupSuccess(user, result);
      } catch (err) {
        setIsSubmitting(false);
      }
    }
  };

  const renderEmailSignup = () => {
    let nameErrorLabel = null;
    let nameHelpText = (
      <span id="valid_name" className="help-block">
        <FormattedMessage
          id="signup_user_completed.userHelp"
          defaultMessage="You can use lowercase letters, numbers, periods, dashes, and underscores."
        />
      </span>
    );
    let nameDivStyle = "form-group";
    if (nameError) {
      nameErrorLabel = <label className="control-label">{nameError}</label>;
      nameHelpText = "";
      nameDivStyle += " has-error";
    }

    let passwordErrorLabel = null;
    let passwordDivStyle = "form-group";
    if (passwordError) {
      passwordErrorLabel = (
        <label className="control-label">{passwordError}</label>
      );
      passwordDivStyle += " has-error";
    }

    let emailErrorLable = null;
    let emailHelpText = (
      <span id="valid_email" className="help-block">
        <FormattedMessage
          id="signup_user_completed.emailHelp"
          defaultMessage="Valid email required for sign-up"
        />
      </span>
    );
    let emailDivStyle = "form-group";
    if (emailError) {
      emailErrorLable = <label className="control-label">{emailError}</label>;
      emailHelpText = "";
      emailDivStyle += " has-error";
    }
    let yourEmailIs = null;
    if (email) {
      yourEmailIs = (
        <FormattedMarkdownMessage
          id="signup_user_completed.emailIs"
          defaultMessage="Your email address is **{email}**. You'll use this address to sign in to {siteName}."
          values={{
            email: this.state.email,
            siteName: this.props.siteName,
          }}
        />
      );
    }

    let emailContainerStyle = "mt-8";
    if (email) {
      emailContainerStyle = "hidden";
    }

    return (
      <form>
        <div className="inner__content">
          <div className={emailContainerStyle}>
            <h5 id="email_label">
              <strong>
                <FormattedMessage
                  id="signup_user_completed.whatis"
                  defaultMessage="What's your email address?"
                />
              </strong>
            </h5>
            <div className={emailDivStyle}>
              <input
                id="email"
                type="email"
                ref={emailRef}
                className="form-control"
                defaultValue={email}
                placeholder=""
                maxLength={128}
                autoFocus={true}
                spellCheck="false"
                autoCapitalize="off"
              />
              {emailError}
              {emailHelpText}
            </div>
          </div>
          {yourEmailIs}
        </div>

        <div className="mt-8">
          <h5 id="name_label">
            <strong>
              <FormattedMessage
                id="signup_user_completed.chooseUser"
                defaultMessage="Choose your username"
              />
            </strong>
          </h5>
          <div className={nameDivStyle}>
            <input
              id="name"
              type="text"
              ref={nameRef}
              className="form-control"
              placeholder=""
              maxLength={Constants.MAX_USERNAME_LENGTH}
              spellCheck="false"
              autoCapitalize="off"
            />
            {nameError}
            {nameHelpText}
          </div>
        </div>

        <div className="mt-8">
          <h5 id="password_label">
            <strong>
              <FormattedMessage
                id="signup_user_completed.choosePwd"
                defaultMessage="Choose your password"
              />
            </strong>
          </h5>
          <div className={passwordDivStyle}>
            <input
              id="password"
              type="password"
              ref={passwordRef}
              className="form-control"
              placeholder=""
              maxLength={128}
              spellCheck="false"
            />
            {passwordError}
          </div>
        </div>

        <p className="mt-5">
          <button
            id="createAccountButton"
            type="submit"
            onClick={handleSubmit}
            className="btn-primary btn"
            disabled={isSubmitting}
          >
            <FormattedMessage
              id="signup_user_completed.create"
              defaultMessage="Create Account"
            />
          </button>
        </p>
      </form>
    );
  };

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
