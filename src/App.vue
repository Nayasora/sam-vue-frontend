<script setup lang="ts">
import { AppHeader, TopHeader } from '@common/components/layout/header'
</script>

<template>
  <div class="min-h-screen bg-background">
    <TopHeader />
    <AppHeader />
    <main>
      <router-view />
    </main>
  </div>
</template>

<style scoped></style>
