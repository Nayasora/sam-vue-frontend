<script setup lang="ts">
import { AppHeader, TopHeader } from '@common/components/layout/header'
import { Footer } from '@common/components/layout/footer'
</script>

<template>
  <div class="min-h-screen bg-background">
    <TopHeader />
    <AppHeader />
    <main>
      <router-view />
    </main>
    <Footer />
  </div>
</template>
