<script setup lang="ts">
interface Props {
  icon: string
  label: string
  badge?: number
}

defineProps<Props>()

const emit = defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    class="relative flex cursor-pointer flex-col items-center gap-1 border-none bg-transparent p-1 transition-opacity hover:opacity-70"
    @click="emit('click')"
  >
    <div class="relative">
      <img :src="icon" :alt="label" class="block size-6" />
      <span
        v-if="badge && badge > 0"
        class="absolute -right-2 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white"
      >
        {{ badge > 99 ? '99+' : badge }}
      </span>
    </div>
    <span class="whitespace-nowrap text-sm text-gray-900">{{ label }}</span>
  </button>
</template>
