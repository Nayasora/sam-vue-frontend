<script setup lang="ts">
import NavMenuItem from './NavMenuItem.vue'
import type { NavItem } from './types'

const navItems: NavItem[] = [
  {
    icon: '/mavbar-main/icons/progress-navbar-item-heart.svg',
    label: 'Избранное',
    key: 'favorites'
  },
  {
    icon: '/mavbar-main/icons/progress-navbar-item-box-iso.svg',
    label: 'Заказы',
    key: 'orders'
  },
  {
    icon: '/mavbar-main/icons/progress-navbar-item-shopping-bag.svg',
    label: 'Корзина',
    key: 'cart'
  }
]
</script>

<template>
  <nav class="flex items-center gap-6">
    <NavMenuItem
      v-for="item in navItems"
      :key="item.key"
      :icon="item.icon"
      :label="item.label"
    />
  </nav>
</template>
