import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import es from './locales/es.json'

export const languages = ['en', 'es'] as const
export type Language = (typeof languages)[number]

export const resources = {
  en: { translation: en },
  es: { translation: es },
} as const

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    supportedLngs: languages,
    nonExplicitSupportedLngs: true,
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
    detection: {
      order: ['querystring', 'localStorage', 'navigator'],
      lookupQuerystring: 'lang',
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

const syncDocument = (lng: string) => {
  document.documentElement.lang = lng
  document.title = i18n.t('meta.title')
}

syncDocument(i18n.resolvedLanguage ?? 'en')
i18n.on('languageChanged', syncDocument)

export default i18n
