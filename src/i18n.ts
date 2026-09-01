import { createI18n, LocaleMessages, VueMessageType } from 'vue-i18n'
import localesList from './locales/locales.json'
import useLanguage from './useLanguage'
import pluralizationPolishRule from '@/shared/utils/pluralizationPolishRule'

// `keyof any` is short for "string | number | symbol"
// since an object key can be any of those types, our key can too
// in TS 3.0+, putting just "string" raises an error
function hasKey<O> (obj: O, key: string | number | symbol): key is keyof O {
  return key in obj
}

// Ready translated locale messages
// The structure of the locale message is the hierarchical object structure with each locale as the top property
function loadLocaleMessages () {
  const locales = require.context(
    './locales',
    true,
    /locale-[A-Za-z\s]{2}\.json$/i
  )
  const messages: LocaleMessages<VueMessageType> = {}
  locales.keys().forEach(key => {
    const matched = key.match(/(locale-)([A-Za-z]{2})/i)
    if (matched && matched.length > 1) {
      const locale = matched[2].toLowerCase()
      if (hasKey(localesList, locale)) {
        messages[locale] = locales(key)
      }
    }
  })
  return messages
}

function getsupportedLocales () {
  const locales = require.context(
    './locales',
    true,
    /locale-[A-Za-z\s]{2}\.json$/i
  )
  const supportedLocales: { code: string, name: string, nativeName: string }[] = []
  locales.keys().forEach(key => {
    const matched = key.match(/(locale-)([A-Za-z]{2})/i)
    if (matched && matched.length > 1) {
      const locale = matched[2].toLowerCase()
      if (hasKey(localesList, locale)) {
        supportedLocales.push({
          code: locale,
          name: localesList[locale].name,
          nativeName: localesList[locale].nativeName
        })
      }
    }
  })
  return supportedLocales
}

function supportedLocalesInclude (locale: string) {
  const supportedLocales = getsupportedLocales()
  return supportedLocales.some(l => l.code === locale)
}

function getBrowserLocale () {
  const navigatorLocale = navigator.languages !== undefined ? navigator.languages[0] : navigator.language
  if (!navigatorLocale) {
    return undefined
  }
  const trimmedLocale = navigatorLocale.trim().split(/-|_/)[0]
  return trimmedLocale
}

function getStartingLocale () {
  let locale = 'en'
  const localLocale = localStorage.getItem('locale')
  if (localLocale) locale = localLocale
  else {
    const browserLocale = getBrowserLocale()
    if (browserLocale && supportedLocalesInclude(browserLocale)) {
      locale = browserLocale
    } else {
      locale = process.env.VUE_APP_I18N_LOCALE || 'en'
    }
  }
  setDocumentLang(locale)
  setDocumentDirectionPerLocale(locale)
  return locale
}

function setDocumentDirectionPerLocale (locale: string) {
  const rtlLangsConfig: string = process.env.VUE_APP_I18N_RTL_LOCALES || 'ar,az,he,ku,fa,ur'
  const rtlLangs: string[] = rtlLangsConfig.split(',').map(function (item: string) { return item.trim().toLowerCase() })
  const isRTL = rtlLangs.some(l => l === locale.trim().toLowerCase())
  document.documentElement.dir = isRTL ? 'rtl' : 'ltr'
  const { setRTL } = useLanguage()
  setRTL(isRTL)
}

function setDocumentLang (locale: string) {
  document.documentElement.lang = locale
  const { setLanguage } = useLanguage()
  setLanguage(locale)
}

const i18n = createI18n({
  locale: getStartingLocale(),
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages(),
  pluralizationRules: {
    pl: pluralizationPolishRule
  }
})

export const locales = getsupportedLocales()

export function changeLocale (locale: string): void {
  i18n.global.locale = locale
  localStorage.setItem('locale', locale)
  setDocumentLang(locale)
  setDocumentDirectionPerLocale(locale)
}

// Create i18n instance with options
export default i18n
