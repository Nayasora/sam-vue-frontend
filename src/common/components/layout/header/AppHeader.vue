<script setup lang="ts">
import Logo from './Logo.vue'
import CatalogButton from './CatalogButton.vue'
import SearchInput from './SearchInput.vue'
import NavMenu from './NavMenu.vue'
import LoginButton from './LoginButton.vue'
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <div class="header-logo">
        <Logo />
      </div>

      <div class="header-center">
        <CatalogButton />
        <SearchInput />
      </div>

      <div class="header-right">
        <NavMenu />
        <LoginButton />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  width: 100%;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.header-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 48px;
  gap: 24px;
  max-width: 100%;
  margin: 0 auto;
}

.header-logo {
  flex-shrink: 0;
}

.header-center {
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 1;
  max-width: 700px;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
}
</style>
