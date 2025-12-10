<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useAuthStore } from '@common/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleClick() {
  if (authStore.isAuthenticated) {
    router.push('/account')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <button
    @click="handleClick"
    class="flex h-10 cursor-pointer items-center justify-center whitespace-nowrap rounded-lg border border-primary bg-transparent px-4 text-base text-primary transition-all hover:border-blue-500 hover:text-blue-500 active:border-blue-600 active:text-blue-600"
  >
    <template v-if="authStore.isAuthenticated">
      {{ authStore.fullName || $t('account.title') }}
    </template>
    <template v-else>
      {{ $t('header.login') }}
    </template>
  </button>
</template>
