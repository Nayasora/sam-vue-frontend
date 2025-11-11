<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import TopBar from './TopBar.vue'
import MainNavbar from './MainNavbar.vue'

interface AppHeaderProps {
  sticky?: boolean
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

const props = withDefaults(defineProps<AppHeaderProps>(), {
  sticky: true,
  favoritesCount: 0,
  ordersCount: 0,
  cartCount: 0
})

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0
}

onMounted(() => {
  if (props.sticky) {
    window.addEventListener('scroll', handleScroll)
  }
})

onUnmounted(() => {
  if (props.sticky) {
    window.removeEventListener('scroll', handleScroll)
  }
})
</script>

<template>
  <header
    :class="[
      'w-full',
      sticky && 'sticky top-0 z-30',
      isScrolled && sticky && 'shadow-md'
    ]"
  >
    <TopBar />
    <MainNavbar
      :favorites-count="favoritesCount"
      :orders-count="ordersCount"
      :cart-count="cartCount"
    />
  </header>
</template>
