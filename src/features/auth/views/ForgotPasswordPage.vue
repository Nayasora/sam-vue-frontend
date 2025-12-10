<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@common/auth'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const successMessage = ref('')

const isFormValid = computed(() => email.value.trim() !== '')

async function handleSubmit() {
  if (!isFormValid.value) return

  const success = await authStore.forgotPassword(email.value)

  if (success) {
    successMessage.value = 'Письмо с инструкциями отправлено на вашу почту.'
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
          {{ $t('auth.forgotPassword.title') }}
        </h1>
        <p class="mb-8 text-center text-gray-500">
          {{ $t('auth.forgotPassword.subtitle') }}
        </p>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div v-if="successMessage" class="rounded-lg bg-green-50 p-4 text-sm text-green-600">
            {{ successMessage }}
          </div>

          <div v-if="authStore.error" class="rounded-lg bg-red-50 p-4 text-sm text-red-600">
            {{ authStore.error }}
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

          <button
            type="submit"
            :disabled="!isFormValid || authStore.loading"
            class="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 text-base font-medium text-white transition-colors hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <svg v-if="authStore.loading" class="mr-2 h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            {{ authStore.loading ? $t('auth.sending') : $t('auth.sendResetLink') }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <button
            @click="goToLogin"
            class="font-medium text-primary hover:text-blue-600"
          >
            {{ $t('auth.backToLogin') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
