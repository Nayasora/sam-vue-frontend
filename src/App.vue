<script setup lang="ts">
import { AppHeader } from '@common/components/layout/header'
</script>

<template>
  <div class="min-h-screen bg-background">
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
