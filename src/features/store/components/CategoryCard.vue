<script setup lang="ts">
interface Props {
  name: string
  image: string
  link: string
}

defineProps<Props>()
</script>

<template>
  <router-link
    :to="link"
    class="relative flex min-h-[76px] flex-shrink-0 cursor-pointer items-center gap-4 overflow-hidden rounded-xl bg-blue-50 px-4 py-2 transition-shadow hover:shadow-md"
  >
    <div class="flex h-full items-center">
      <p class="whitespace-nowrap text-sm font-semibold text-gray-900">{{ $t(name) }}</p>
    </div>
    <div class="flex w-[70px] flex-shrink-0 items-center justify-center">
      <img :src="image" :alt="$t(name)" class="max-h-[60px] max-w-full object-contain" />
    </div>
  </router-link>
</template>
