<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Logo from './Logo.vue'
import SearchInput from './SearchInput.vue'
import NavMenu from './NavMenu.vue'
import MobileMenu from './MobileMenu.vue'
import { Button } from '@common/components/ui/button'
import { LayoutGrid } from 'lucide-vue-next'

interface MainNavbarProps {
  favoritesCount?: number
  ordersCount?: number
  cartCount?: number
}

withDefaults(defineProps<MainNavbarProps>(), {
  favoritesCount: 0,
  ordersCount: 0,
  cartCount: 0
})

const { t } = useI18n()

const handleSearch = (query: string) => {
  console.log('Search:', query)
}
</script>

<template>
  <div class="border-b border-border bg-background">
    <div class="container mx-auto px-4 lg:px-12">
      <div class="flex h-[72px] items-center justify-between gap-4">
        <!-- Left: Mobile Menu + Logo -->
        <div class="flex items-center gap-3">
          <MobileMenu
            :favorites-count="favoritesCount"
            :orders-count="ordersCount"
            :cart-count="cartCount"
          />
          <Logo />
        </div>

        <!-- Center: Catalog Button + Search (Desktop) -->
        <div class="hidden flex-1 items-center gap-3 lg:flex">
          <Button
            variant="default"
            class="h-10 gap-2 whitespace-nowrap"
          >
            <LayoutGrid :size="20" />
            <span class="hidden xl:inline">{{ t('header.catalog') }}</span>
          </Button>

          <div class="w-full max-w-[500px]">
            <SearchInput @submit="handleSearch" />
          </div>
        </div>

        <!-- Right: Nav Menu + Login Button (Desktop) -->
        <div class="flex items-center gap-4">
          <div class="hidden lg:block">
            <NavMenu
              :favorites-count="favoritesCount"
              :orders-count="ordersCount"
              :cart-count="cartCount"
            />
          </div>

          <Button
            variant="default"
            class="hidden h-10 lg:flex"
          >
            {{ t('header.login') }}
          </Button>
        </div>
      </div>

      <!-- Mobile Search Bar -->
      <div class="pb-3 lg:hidden">
        <SearchInput @submit="handleSearch" />
      </div>
    </div>
  </div>
</template>
