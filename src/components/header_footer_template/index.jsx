import { FormattedMessage } from "react-intl";
import { useSelector } from "react-redux";
import { selectConfig } from "../../store/reducer/general";

const NotLoggedIn = (props) => {
  const content = [];

  const config = useSelector(selectConfig);

  if (!config) {
    return null;
  }

  if (config.AboutLink) {
    content.push(
      <a
        key="about_link"
        id="about_link"
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
        href={config.AboutLink}
      >
        <FormattedMessage id="web.footer.about" />
      </a>
    );
  }

  if (config.PrivacyPolicyLink) {
    content.push(
      <a
        key="privacy_link"
        id="privacy_link"
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
        href={config.PrivacyPolicyLink}
      >
        <FormattedMessage id="web.footer.privacy" />
      </a>
    );
  }

  if (config.TermsOfServiceLink) {
    content.push(
      <a
        key="terms_link"
        id="terms_link"
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
        href={config.TermsOfServiceLink}
      >
        <FormattedMessage id="web.footer.terms" />
      </a>
    );
  }

  if (config.HelpLink) {
    content.push(
      <a
        key="help_link"
        id="help_link"
        className="footer-link"
        target="_blank"
        rel="noopener noreferrer"
        href={config.HelpLink}
      >
        <FormattedMessage id="web.footer.help" />
      </a>
    );
  }

  return (
    <div className="inner-wrap">
      <div className="row content">{props.children}</div>
      <div className="row footer">
        <div id="footer_section" className="footer-pane col-xs-12">
          <div className="col-xs-12">
            <span id="company_name" className="pull-right footer-site-name">
              {"Mattermost"}
            </span>
          </div>
          <div className="col-xs-12">
            <span id="copyright" className="pull-right footer-link copyright">
              {`© 2015-${new Date().getFullYear()} Mattermost, Inc.`}
            </span>
            <span className="pull-right">{content}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
