<script setup lang="ts">
import type { PromoBanner } from '../types'

interface Props {
  banner: PromoBanner
}

defineProps<Props>()
</script>

<template>
  <router-link
    :to="banner.link"
    class="relative block h-[320px] w-full flex-shrink-0 overflow-hidden rounded-[24px]"
  >
    <div class="absolute inset-0">
      <img
        :src="banner.image"
        :alt="banner.title"
        class="size-full object-cover"
      />
    </div>
  </router-link>
</template>
