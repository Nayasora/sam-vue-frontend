<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import NavMenuItem from './NavMenuItem.vue'
import CartDrawer from '@common/cart/components/CartDrawer.vue'
import { useCartStore } from '@common/cart/store/cart.store'
import { useAuthStore } from '@common/auth'
import type { NavItem } from './types'

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()

const isCartOpen = ref(false)

const cartItemsCount = computed(() => cartStore.itemsCount)

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

function handleItemClick(key: string) {
  if (key === 'cart') {
    isCartOpen.value = true
  } else if (key === 'favorites') {
    if (authStore.isAuthenticated) {
      router.push('/account/wishlist')
    } else {
      router.push('/login')
    }
  } else if (key === 'orders') {
    if (authStore.isAuthenticated) {
      router.push('/account/orders')
    } else {
      router.push('/login')
    }
  }
}

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<template>
  <nav class="flex items-center gap-6">
    <NavMenuItem
      v-for="item in navItems"
      :key="item.key"
      :icon="item.icon"
      :label="item.label"
      :badge="item.key === 'cart' ? cartItemsCount : undefined"
      @click="handleItemClick(item.key)"
    />
  </nav>

  <CartDrawer :is-open="isCartOpen" @close="isCartOpen = false" />
</template>
