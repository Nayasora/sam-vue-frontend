<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@common/auth'

const router = useRouter()
const authStore = useAuthStore()

const firstName = ref('')
const lastName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const showPassword = ref(false)
const showPasswordConfirmation = ref(false)
const successMessage = ref('')

const passwordsMatch = computed(() => password.value === passwordConfirmation.value)

const isFormValid = computed(() => {
  return (
    firstName.value.trim() !== '' &&
    lastName.value.trim() !== '' &&
    email.value.trim() !== '' &&
    password.value.length >= 6 &&
    passwordsMatch.value
  )
})

async function handleSubmit() {
  if (!isFormValid.value) return

  const success = await authStore.register({
    first_name: firstName.value,
    last_name: lastName.value,
    email: email.value,
    password: password.value,
    password_confirmation: passwordConfirmation.value
  })

  if (success) {
    successMessage.value = 'Регистрация успешна! Войдите в систему.'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
}

function goToLogin() {
  router.push('/login')
}
</script>

<template>
  <div class="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12">
    <div class="w-full max-w-md">
      <div class="rounded-2xl bg-white p-8 shadow-lg">
        <h1 class="mb-2 text-center text-2xl font-bold text-gray-900">
          {{ $t('auth.register.title') }}
        </h1>
        <p class="mb-8 text-center text-gray-500">
          {{ $t('auth.register.subtitle') }}
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-5">
          <div v-if="successMessage" class="rounded-lg bg-green-50 p-4 text-sm text-green-600">
            {{ successMessage }}
          </div>

          <div v-if="authStore.error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {{ authStore.error }}
          </div>

          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="firstName" class="mb-2 block text-sm font-medium text-gray-700">
                {{ $t('auth.firstName') }}
              </label>
              <input
                id="firstName"
                v-model="firstName"
                type="text"
                autocomplete="given-name"
                required
                class="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                :placeholder="$t('auth.firstNamePlaceholder')"
              />
            </div>

            <div>
              <label for="lastName" class="mb-2 block text-sm font-medium text-gray-700">
                {{ $t('auth.lastName') }}
              </label>
              <input
                id="lastName"
                v-model="lastName"
                type="text"
                autocomplete="family-name"
                required
                class="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                :placeholder="$t('auth.lastNamePlaceholder')"
              />
            </div>
          </div>

          <div>
            <label for="email" class="mb-2 block text-sm font-medium text-gray-700">
              {{ $t('auth.email') }}
            </label>
            <input
              id="email"
              v-model="email"
              type="email"
              autocomplete="email"
              required
              class="block w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              :placeholder="$t('auth.emailPlaceholder')"
            />
          </div>

          <div>
            <label for="password" class="mb-2 block text-sm font-medium text-gray-700">
              {{ $t('auth.password') }}
            </label>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                :placeholder="$t('auth.passwordPlaceholder')"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showPassword" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p class="mt-1 text-xs text-gray-500">{{ $t('auth.passwordHint') }}</p>
          </div>

          <div>
            <label for="passwordConfirmation" class="mb-2 block text-sm font-medium text-gray-700">
              {{ $t('auth.confirmPassword') }}
            </label>
            <div class="relative">
              <input
                id="passwordConfirmation"
                v-model="passwordConfirmation"
                :type="showPasswordConfirmation ? 'text' : 'password'"
                autocomplete="new-password"
                required
                class="block w-full rounded-lg border border-gray-300 px-4 py-3 pr-12 text-gray-900 placeholder-gray-400 transition-colors focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                :class="{ 'border-red-300': passwordConfirmation && !passwordsMatch }"
                :placeholder="$t('auth.confirmPasswordPlaceholder')"
              />
              <button
                type="button"
                @click="showPasswordConfirmation = !showPasswordConfirmation"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg v-if="showPasswordConfirmation" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
                <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="passwordConfirmation && !passwordsMatch" class="mt-1 text-xs text-red-500">
              {{ $t('auth.passwordsMismatch') }}
            </p>
          </div>

          <button
            type="submit"
            :disabled="!isFormValid || authStore.loading"
            class="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-base font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg v-if="authStore.loading" class="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {{ authStore.loading ? $t('auth.registering') : $t('auth.registerButton') }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <span class="text-gray-500">{{ $t('auth.haveAccount') }}</span>
          <button
            @click="goToLogin"
            class="ml-1 font-medium text-primary hover:text-blue-600"
          >
            {{ $t('auth.loginLink') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
