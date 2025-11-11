<script setup lang="ts">
interface Props {
  icon: string
  label: string
}

defineProps<Props>()
</script>

<template>
  <button class="nav-item">
    <img :src="icon" :alt="label" class="nav-icon" />
    <span class="nav-label">{{ label }}</span>
  </button>
</template>

<style scoped>
.nav-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 4px;
  transition: opacity 0.2s;
}

.nav-item:hover {
  opacity: 0.7;
}

.nav-icon {
  width: 24px;
  height: 24px;
  display: block;
}

.nav-label {
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.88);
  font-weight: 400;
  white-space: nowrap;
}
</style>
