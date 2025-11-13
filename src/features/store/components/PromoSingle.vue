<script setup lang="ts">
const promo = new URL('../assets/promo-sections/promo-single.png', import.meta.url).href
</script>

<template>
  <div class="bg-white px-12 py-8 px-[10%]">
    <div class="flex gap-6 w-full">
      <div class="flex-1 aspect-[16/4] rounded-[24px] overflow-hidden">
        <img :src="promo" alt="" class="w-full h-full object-contain" />
      </div>
    </div>
  </div>
</template>
