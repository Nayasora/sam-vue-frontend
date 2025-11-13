<script setup lang="ts">
import { CategoryScroll, PromoCarousel, PopularProducts, SaleProducts, StorefrontCollection } from '../components'
import PromoSingle from "@features/store/components/PromoSingle.vue";
import RecentProducts from "@features/store/components/RecentProducts.vue";
import {BrandCarousel} from "@features/store/components";
</script>

<template>
  <div class="store-main">
    <div class="mx-auto max-w-[1440px]">
      <CategoryScroll />
      <PromoCarousel />
      <PopularProducts />
      <StorefrontCollection />
      <SaleProducts />
      <PromoSingle />
      <RecentProducts />
      <BrandCarousel />
    </div>
  </div>
</template>

<style scoped>
.store-main {
  width: 100%;
  min-height: 100vh;
}
</style>