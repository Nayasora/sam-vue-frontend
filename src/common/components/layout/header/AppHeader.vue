<script setup lang="ts">
import Logo from './Logo.vue'
import CatalogButton from './CatalogButton.vue'
import SearchInput from './SearchInput.vue'
import NavMenu from './NavMenu.vue'
import LoginButton from './LoginButton.vue'
</script>

<template>
  <header class="w-full border-b border-gray-100 bg-white">
    <div class="mx-auto max-w-[1440px] px-6">
      <div class="flex items-center justify-between gap-6 py-3">
        <div class="flex-shrink-0">
          <Logo />
        </div>

        <div class="flex flex-1 max-w-[700px] items-center gap-4">
          <CatalogButton />
          <SearchInput />
        </div>

        <div class="flex flex-shrink-0 items-center gap-6">
          <NavMenu />
          <LoginButton />
        </div>
      </div>
    </div>
  </header>
</template>
