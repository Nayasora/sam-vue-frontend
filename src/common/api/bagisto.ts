import { createApiClient } from './client'
import {
  requestIdMiddleware,
  createAuthMiddleware,
  createLocaleMiddleware,
  createLoggerMiddleware
} from './middleware'
import { useLocaleStore } from '../locale/store/locale.store'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

function getAuthToken(): string | null {
  return localStorage.getItem('auth_token')
}

function getCurrentLocale(): string {
  try {
    const localeStore = useLocaleStore()
    return localeStore.currentLocale
  } catch {
    return import.meta.env.VITE_DEFAULT_LOCALE || 'ru'
  }
}

export const bagistoClient = createApiClient({
  baseURL: API_URL,
  timeout: 30000,
  credentials: 'include',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  middleware: [
    requestIdMiddleware,
    createAuthMiddleware(getAuthToken),
    createLocaleMiddleware(getCurrentLocale),
    ...(import.meta.env.DEV
      ? [createLoggerMiddleware({ log: console.log, error: console.error })]
      : [])
  ]
})

export function setAuthToken(token: string | null): void {
  if (token) {
    localStorage.setItem('auth_token', token)
  } else {
    localStorage.removeItem('auth_token')
  }
}

export function getStoredAuthToken(): string | null {
  return localStorage.getItem('auth_token')
}

export function clearAuthToken(): void {
  localStorage.removeItem('auth_token')
}

export default bagistoClient
