export const SUPPORTED_LOCALES = [
    'en',
    'ru',
    'kz'
] as const

export type Locale = (typeof SUPPORTED_LOCALES)[number]

export function isValid(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale)
}
