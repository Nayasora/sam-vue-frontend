<script setup lang="ts">
const promo = new URL('../assets/promo-sections/promo-single.png', import.meta.url).href
</script>

<template>
  <div class="bg-white px-[5%] py-12">
    <div class="flex gap-6 w-full">
      <div class="flex-1 aspect-[16/9] rounded-[24px] overflow-hidden">
        <img :src="promo" alt="" class="w-full object-cover" />
      </div>
    </div>
  </div>
</template>
