<script setup lang="ts">
import { ref } from 'vue'
import { AppHeader } from '@common/components/layout/header'

// Mock data for header badges
// TODO: Replace with real data from Pinia stores when implemented
const favoritesCount = ref(5)
const ordersCount = ref(1)
const cartCount = ref(3)
</script>

<template>
  <div class="min-h-screen bg-background">
    <AppHeader
      :favorites-count="favoritesCount"
      :orders-count="ordersCount"
      :cart-count="cartCount"
      sticky
    />

    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
