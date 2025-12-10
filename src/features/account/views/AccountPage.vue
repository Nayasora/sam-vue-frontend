<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@common/auth'

const router = useRouter()
const authStore = useAuthStore()

async function handleLogout() {
  await authStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="mx-auto max-w-[1440px] px-4 py-8">
    <div class="rounded-2xl bg-white p-8 shadow-lg">
      <div class="mb-8 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-gray-900">
          {{ $t('account.title') }}
        </h1>
        <button
          @click="handleLogout"
          class="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          {{ $t('account.logout') }}
        </button>
      </div>

      <div v-if="authStore.user" class="space-y-6">
        <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div class="rounded-lg border border-gray-200 p-4">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              {{ $t('account.personalInfo') }}
            </h3>
            <div class="space-y-3">
              <div>
                <span class="text-sm text-gray-500">{{ $t('auth.firstName') }}:</span>
                <p class="font-medium text-gray-900">{{ authStore.user.first_name }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-500">{{ $t('auth.lastName') }}:</span>
                <p class="font-medium text-gray-900">{{ authStore.user.last_name }}</p>
              </div>
              <div>
                <span class="text-sm text-gray-500">{{ $t('auth.email') }}:</span>
                <p class="font-medium text-gray-900">{{ authStore.user.email }}</p>
              </div>
            </div>
          </div>

          <div class="rounded-lg border border-gray-200 p-4">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">
              {{ $t('account.quickLinks') }}
            </h3>
            <div class="space-y-2">
              <router-link
                to="/account/orders"
                class="block rounded-lg px-4 py-2 text-primary transition-colors hover:bg-gray-50"
              >
                {{ $t('account.orders') }}
              </router-link>
              <router-link
                to="/account/addresses"
                class="block rounded-lg px-4 py-2 text-primary transition-colors hover:bg-gray-50"
              >
                {{ $t('account.addresses') }}
              </router-link>
              <router-link
                to="/account/wishlist"
                class="block rounded-lg px-4 py-2 text-primary transition-colors hover:bg-gray-50"
              >
                {{ $t('account.wishlist') }}
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="py-8 text-center text-gray-500">
        {{ $t('account.loading') }}
      </div>
    </div>
  </div>
</template>
