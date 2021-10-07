import { useEffect } from 'react';
import { IntlProvider as BaseIntlProvider } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import * as I18n from "../../i18n/i18n";
import { loadTranslations } from "../../store/reducer/i18n";


export default function IntlProvider(props) {
  const dispatch = useDispatch()

  const locale = useSelector((state) => {
    const currentUser = state.profiles[state.currentUserId]
    if (!currentUser) {
      return "zh-CN"
    }

    return currentUser.locale || "zh-CN"
  })

  const translations = useSelector((state) => {
    const localeInfo = I18n.getLanguageInfo(locale)
    let translations
    if (localeInfo) {
      translations = state.i18n.translations[locale]
    } else {
      translations = state.i18n.translations.en
    }

    translations = I18n.getAllLanguages()["zh-CN"].url
    console.log(translations)
    return translations
  })

  const handleLocaleChange = (locale) =>  loadTranslationIfNecessary(locale)
  
  const loadTranslationIfNecessary = (locale) => {
    if (translations) {
      return 
    }

    const localeInfo = I18n.getLanguageInfo(locale)
    if (!localeInfo) {
      return
    }

    dispatch(loadTranslations(locale, localeInfo.url))
  }


  useEffect(() => {
    I18n.doAddLocaleData()
    handleLocaleChange(locale)
  }, [])

  useEffect(() => {
    handleLocaleChange(locale)
  }, [locale])

  if (!translations) {
    return null
  }

  return <BaseIntlProvider locale={locale} messages={translations}>
    { props.children }
    </BaseIntlProvider>
}