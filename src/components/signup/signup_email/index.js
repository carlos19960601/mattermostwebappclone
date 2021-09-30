import logoImage from "@/assets/images/logo.png";
import SiteNameAndDescription from "@/components/common/site_name_and_description";

export default function SignupEmail(props) {
  const { customDescriptionText, siteName } = props;

  return (
    <div>
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
        </div>
      </div>
    </div>
  );
}
