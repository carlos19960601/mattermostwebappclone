import store from "../store";
import { selectTranslations } from "../store/reducer/i18n";

export function localizeMessage(id, defaultMessage) {
  const state = store.getState();
  const translations = selectTranslations(state);

  if (!translations || !(id in translations)) {
    return defaultMessage || id;
  }

  return translations[id];
}
