<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Menu, X, Heart, Package, ShoppingBag, User } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import SearchInput from './SearchInput.vue'

interface MobileMenuProps {
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

withDefaults(defineProps<MobileMenuProps>(), {
  favoritesCount: 0,
  ordersCount: 0,
  cartCount: 0
})

const { t } = useI18n()
const isOpen = ref(false)

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

const closeMenu = () => {
  isOpen.value = false
}
</script>

<template>
  <div class="lg:hidden">
    <!-- Menu Button -->
    <button
      class="flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-muted"
      :aria-label="t('header.menu')"
      @click="toggleMenu"
    >
      <Menu :size="24" />
    </button>

    <!-- Overlay -->
    <Transition
      enter-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-300"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isOpen"
        class="fixed inset-0 z-40 bg-black/50"
        @click="closeMenu"
      />
    </Transition>

    <!-- Drawer -->
    <Transition
      enter-active-class="transition-transform duration-300"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-300"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="isOpen"
        class="fixed left-0 top-0 z-50 h-full w-[280px] bg-background shadow-lg"
      >
        <!-- Header -->
        <div class="flex items-center justify-between border-b border-border p-4">
          <h2 class="text-lg font-semibold">
            {{ t('header.menu') }}
          </h2>
          <button
            class="flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-muted"
            :aria-label="t('header.close')"
            @click="closeMenu"
          >
            <X :size="20" />
          </button>
        </div>

        <!-- Content -->
        <div class="flex h-[calc(100%-65px)] flex-col gap-4 overflow-y-auto p-4">
          <!-- Search -->
          <div class="w-full">
            <SearchInput @submit="closeMenu" />
          </div>

          <!-- Divider -->
          <div class="h-px bg-border" />

          <!-- Menu Items -->
          <nav class="flex flex-col gap-2">
            <RouterLink
              to="/favorites"
              class="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
              @click="closeMenu"
            >
              <div class="flex items-center gap-3">
                <Heart :size="20" />
                <span class="font-medium">{{ t('header.favorites') }}</span>
              </div>
              <span
                v-if="favoritesCount > 0"
                class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
              >
                {{ favoritesCount }}
              </span>
            </RouterLink>

            <RouterLink
              to="/orders"
              class="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
              @click="closeMenu"
            >
              <div class="flex items-center gap-3">
                <Package :size="20" />
                <span class="font-medium">{{ t('header.orders') }}</span>
              </div>
              <span
                v-if="ordersCount > 0"
                class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
              >
                {{ ordersCount }}
              </span>
            </RouterLink>

            <RouterLink
              to="/cart"
              class="flex items-center justify-between rounded-lg p-3 transition-colors hover:bg-muted"
              @click="closeMenu"
            >
              <div class="flex items-center gap-3">
                <ShoppingBag :size="20" />
                <span class="font-medium">{{ t('header.cart') }}</span>
              </div>
              <span
                v-if="cartCount > 0"
                class="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
              >
                {{ cartCount }}
              </span>
            </RouterLink>
          </nav>

          <!-- Divider -->
          <div class="h-px bg-border" />

          <!-- Login Button -->
          <RouterLink
            to="/login"
            class="flex items-center gap-3 rounded-lg bg-primary p-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            @click="closeMenu"
          >
            <User :size="20" />
            <span>{{ t('header.login') }}</span>
          </RouterLink>
        </div>
      </div>
    </Transition>
  </div>
</template>
