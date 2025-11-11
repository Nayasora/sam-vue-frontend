import { defineStore } from 'pinia'
import { ref } from 'vue'
import { i18n, LOCALE_STORAGE_KEY, DEFAULT_LOCALE } from '@common/locale'
import { type Locale, isValid } from '@common/locale/types'

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref<Locale>(DEFAULT_LOCALE)

  function setLocale(locale: Locale): void {
    currentLocale.value = locale
    i18n.global.locale = locale
    localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }

  function getLocale(): Locale {
      const locale = localStorage.getItem(LOCALE_STORAGE_KEY)

      if (locale && isValid(locale)) {
          return locale
      }

      return DEFAULT_LOCALE
  }

  function initializeLocales(): void {
      setLocale(getLocale())
  }

  return {
      currentLocale,
      setLocale,
      initializeLocales,
  }
})
