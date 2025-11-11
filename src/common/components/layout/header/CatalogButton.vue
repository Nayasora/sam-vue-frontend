<script setup lang="ts"></script>

<template>
  <button class="catalog-button">
    <img
      src="/mavbar-main/icons/progress-menu.svg"
      alt=""
      class="h-[14px] w-[18px]"
    />
    <span>Каталог</span>
  </button>
</template>

<style scoped>
.catalog-button {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #1677ff;
  color: white;
  border-radius: 8px;
  padding: 0 16px;
  height: 40px;
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  border: none;
  cursor: pointer;
  box-shadow: 0px 2px 0px rgba(0, 0, 0, 0.02);
  white-space: nowrap;
  transition: background-color 0.2s;
}

.catalog-button:hover {
  background: #4096ff;
}

.catalog-button:active {
  background: #0958d9;
}
</style>
