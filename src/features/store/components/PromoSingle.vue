<script setup lang="ts">
const promo = new URL('../assets/promo-sections/promo-single.png', import.meta.url).href
</script>

<template>
  <div class="bg-white px-[10%] py-8">
    <div class="flex w-full gap-6">
      <div class="aspect-[16/4] flex-1 overflow-hidden rounded-3xl">
        <img :src="promo" alt="" class="size-full object-contain" />
      </div>
    </div>
  </div>
</template>
