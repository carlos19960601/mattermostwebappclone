import { IntlProvider as BaseIntlProvider } from 'react-intl';
export default function IntlProvider(props) {
  return <BaseIntlProvider>
    { props.children }
    </BaseIntlProvider>
}