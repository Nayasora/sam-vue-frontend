import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { authService, type LoginCredentials, type RegisterData, type UpdateProfileData } from '@common/api/services/auth.service'
import type { Customer } from '@common/api/bagisto.types'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<Customer | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const isAuthenticated = computed(() => !!user.value)
  const fullName = computed(() => {
    if (!user.value) return ''
    return `${user.value.first_name} ${user.value.last_name}`.trim()
  })

  async function login(credentials: LoginCredentials): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const response = await authService.login(credentials)
      user.value = response.data
      return true
    } catch (err: any) {
      error.value = err.message || 'Ошибка входа'
      return false
    } finally {
      loading.value = false
    }
  }

  async function register(data: RegisterData): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      await authService.register(data)
      return true
    } catch (err: any) {
      error.value = err.message || 'Ошибка регистрации'
      return false
    } finally {
      loading.value = false
    }
  }

  async function logout(): Promise<void> {
    loading.value = true

    try {
      await authService.logout()
    } catch (err) {
    } finally {
      user.value = null
      loading.value = false
    }
  }

  async function fetchProfile(): Promise<void> {
    if (!authService.isAuthenticated()) return

    loading.value = true
    error.value = null

    try {
      user.value = await authService.getProfile()
    } catch (err: any) {
      user.value = null
      error.value = err.message || 'Ошибка загрузки профиля'
    } finally {
      loading.value = false
    }
  }

  async function updateProfile(data: UpdateProfileData): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      user.value = await authService.updateProfile(data)
      return true
    } catch (err: any) {
      error.value = err.message || 'Ошибка обновления профиля'
      return false
    } finally {
      loading.value = false
    }
  }

  async function forgotPassword(email: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      await authService.forgotPassword({ email })
      return true
    } catch (err: any) {
      error.value = err.message || 'Ошибка отправки письма'
      return false
    } finally {
      loading.value = false
    }
  }

  function initialize(): void {
    if (authService.isAuthenticated()) {
      fetchProfile()
    }
  }

  function clearError(): void {
    error.value = null
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    fullName,
    login,
    register,
    logout,
    fetchProfile,
    updateProfile,
    forgotPassword,
    initialize,
    clearError
  }
})
