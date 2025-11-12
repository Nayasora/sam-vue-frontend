<script setup lang="ts">
import { CategoryScroll, PromoCarousel, PopularProducts } from '../components'
</script>

<template>
  <div class="store-main">
    <CategoryScroll />
    <PromoCarousel />
    <PopularProducts />
  </div>
</template>

<style scoped>
.store-main {
  width: 100%;
  min-height: 100vh;
}
</style>