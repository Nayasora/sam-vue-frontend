<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import NavMenuItem from './NavMenuItem.vue'
import type { NavItem } from './types'

const { t } = useI18n()

const navItems = computed<NavItem[]>(() => [
  {
    icon: '/mavbar-main/icons/progress-navbar-item-heart.svg',
    label: t('header.favorites'),
    key: 'favorites'
  },
  {
    icon: '/mavbar-main/icons/progress-navbar-item-box-iso.svg',
    label: t('header.orders'),
    key: 'orders'
  },
  {
    icon: '/mavbar-main/icons/progress-navbar-item-shopping-bag.svg',
    label: t('header.cart'),
    key: 'cart'
  }
])
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
