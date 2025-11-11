import { createI18n } from 'vue-i18n'
import en from './locales/en.ts'
import ru from './locales/ru.ts'
import kz from './locales/kz.ts'
import { type Locale } from './types'

export const LOCALE_STORAGE_KEY = 'app_locale'
export const DEFAULT_LOCALE: Locale = 'ru'

type MessageSchema = typeof en

export const i18n = createI18n<[MessageSchema], Locale>({
    locale: DEFAULT_LOCALE,
    fallbackLocale: 'ru',
    messages: {
        en,
        ru,
        kz,
    },
})
