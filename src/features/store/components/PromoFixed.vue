<script setup lang="ts">
const promo1 = new URL('../assets/promo-sections/promo-1.png', import.meta.url).href
const promo2 = new URL('../assets/promo-sections/promo-2.png', import.meta.url).href
const promo3 = new URL('../assets/promo-sections/promo-3.png', import.meta.url).href
</script>

<template>
  <div class="bg-white px-12 py-8">
    <div class="flex gap-6 w-full">
      <div class="flex-1 aspect-[16/9] rounded-[24px] overflow-hidden">
        <img :src="promo1" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 aspect-[16/9] rounded-[24px] overflow-hidden">
        <img :src="promo2" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="flex-1 aspect-[16/9] rounded-[24px] overflow-hidden">
        <img :src="promo3" alt="" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>
