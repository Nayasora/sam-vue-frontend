<script setup lang="ts">
import { ref } from 'vue'
import { Menu, X } from 'lucide-vue-next'
import CatalogMenu from './CatalogMenu.vue'

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function closeMenu() {
  isMenuOpen.value = false
}
</script>

<template>
  <div class="relative">
    <button
      class="flex h-10 cursor-pointer items-center gap-3 whitespace-nowrap rounded-lg border-none bg-[#1677ff] px-4 text-base text-white shadow-sm transition-colors hover:bg-[#4096ff] active:bg-[#0958d9]"
      @click="toggleMenu"
    >
      <Menu v-if="!isMenuOpen" :size="18" />
      <X v-else :size="18" />
      <span>{{ $t('header.catalog') }}</span>
    </button>

    <CatalogMenu :is-open="isMenuOpen" @close="closeMenu" />
  </div>
</template>
