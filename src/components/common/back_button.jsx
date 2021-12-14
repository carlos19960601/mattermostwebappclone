import { FormattedMessage, useIntl } from 'react-intl';
import { Link } from 'react-router-dom';

export default function BackButton(props) {
  const {formatMessage} = useIntl();
  return <div
  id='back_button'
  className='signup-header'>
<Link
                onClick={props.onClick}
                to={props.url}
            >
                <span
                    id='back_button_icon'
                    className='fa fa-1x fa-angle-left'
                    title={formatMessage({id: 'generic_icons.back', defaultMessage: 'Back Icon'})}
                />
                <FormattedMessage
                    id='web.header.back'
                    defaultMessage='Back'
                />
            </Link>
  </div>
}