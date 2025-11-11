<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed, type Component } from 'vue'
import { Heart, Package, ShoppingBag } from 'lucide-vue-next'

interface NavMenuItemProps {
  icon: 'heart' | 'package' | 'shopping-bag'
  label: string
  to?: string
  badge?: number
  onClick?: () => void
}

const props = withDefaults(defineProps<NavMenuItemProps>(), {
  to: '#',
  badge: 0
})

const emit = defineEmits<{
  click: []
}>()

const iconComponent = computed<Component>(() => {
  const icons = {
    heart: Heart,
    package: Package,
    'shopping-bag': ShoppingBag
  }
  return icons[props.icon]
})

const hasBadge = computed(() => props.badge > 0)

const handleClick = () => {
  if (props.onClick) {
    props.onClick()
  }
  emit('click')
}
</script>

<template>
  <component
    :is="to !== '#' ? RouterLink : 'button'"
    :to="to !== '#' ? to : undefined"
    class="group relative flex flex-col items-center gap-1 transition-colors hover:text-primary"
    @click="handleClick"
  >
    <!-- Icon with Badge -->
    <div class="relative">
      <component
        :is="iconComponent"
        :size="24"
        class="transition-transform group-hover:scale-110"
      />

      <!-- Badge -->
      <span
        v-if="hasBadge"
        class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground"
      >
        {{ badge > 99 ? '99+' : badge }}
      </span>
    </div>

    <!-- Label -->
    <span class="text-xs font-medium leading-tight">
      {{ label }}
    </span>
  </component>
</template>
