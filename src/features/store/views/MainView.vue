<script setup lang="ts">
import { CategoryScroll, PromoCarousel, PopularProducts, SaleProducts, StorefrontCollection } from '../components'
import PromoSingle from "@features/store/components/PromoSingle.vue";
import RecentProducts from "@features/store/components/RecentProducts.vue";
</script>

<template>
  <div class="store-main">
    <CategoryScroll />
    <PromoCarousel />
    <PopularProducts />
    <StorefrontCollection />
    <SaleProducts />
    <PromoSingle />
    <RecentProducts />
  </div>
</template>

<style scoped>
.store-main {
  width: 100%;
  min-height: 100vh;
}
</style>