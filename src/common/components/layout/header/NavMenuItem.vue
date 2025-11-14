<script setup lang="ts">
interface Props {
  icon: string
  label: string
}

defineProps<Props>()
</script>

<template>
  <button class="flex cursor-pointer flex-col items-center gap-1 border-none bg-transparent p-1 transition-opacity hover:opacity-70">
    <img :src="icon" :alt="label" class="block size-6" />
    <span class="whitespace-nowrap text-sm text-gray-900">{{ label }}</span>
  </button>
</template>
