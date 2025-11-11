<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import NavMenuItem from './NavMenuItem.vue'

interface NavMenuProps {
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

withDefaults(defineProps<NavMenuProps>(), {
  favoritesCount: 0,
  ordersCount: 0,
  cartCount: 0
})

const { t } = useI18n()
</script>

<template>
  <nav class="flex items-center gap-6">
    <NavMenuItem
      icon="heart"
      :label="t('header.favorites')"
      :badge="favoritesCount"
      to="/favorites"
    />

    <NavMenuItem
      icon="package"
      :label="t('header.orders')"
      :badge="ordersCount"
      to="/orders"
    />

    <NavMenuItem
      icon="shopping-bag"
      :label="t('header.cart')"
      :badge="cartCount"
      to="/cart"
    />
  </nav>
</template>
