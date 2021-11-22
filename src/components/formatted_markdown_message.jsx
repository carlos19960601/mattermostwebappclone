import marked, { Renderer } from 'marked';
import { useIntl } from "react-intl";

const TARGET_BLANK_URL_PREFIX = '!';


export class CustomRenderer extends Renderer {
  constructor(disableLinks = false) {
    super();
    this.disableLinks = disableLinks;
  }

  link(href, title, text) {
      if (this.disableLinks) {
          return text;
      }
      if (href[0] === TARGET_BLANK_URL_PREFIX) {
          return `<a href="${href.substring(1, href.length)}" rel="noopener noreferrer" target="_blank">${text}</a>`;
      }
      return `<a href="${href}">${text}</a>`;
  }

  paragraph(text) {
      return text;
  }
}


const FormattedMarkdownMessage = function (props) {
  const {
    id,
    defaultMessage,
    values,
    disableLinks,
} = props;

  const { formatMessage } = useIntl();

  const origMsg = formatMessage({ id, defaultMessage }, values);
  
  const markedUpMessage = marked(origMsg, {
    breaks: true,
    sanitize: true,
    renderer: new CustomRenderer(disableLinks),
});
  return (<span dangerouslySetInnerHTML={{__html: markedUpMessage}}/>);
 }

export default FormattedMarkdownMessage;