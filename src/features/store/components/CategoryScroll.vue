<script setup lang="ts">
import CategoryCard from './CategoryCard.vue'
import { categoryCards } from '../types'
</script>

<template>
  <div class="category-scroll">
    <div class="category-scroll__container">
      <CategoryCard
        v-for="category in categoryCards"
        :key="category.id"
        :name="category.name"
        :image="category.image"
        :link="category.link"
      />
    </div>
  </div>
</template>

<style scoped>
.category-scroll {
  width: 100%;
  background-color: #ffffff;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.category-scroll__container {
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 12px 48px;
  overflow-x: auto;
  overflow-y: hidden;
  scrollbar-width: thin;
  scrollbar-color: rgba(0, 0, 0, 0.2) transparent;
}

.category-scroll__container::-webkit-scrollbar {
  height: 6px;
}

.category-scroll__container::-webkit-scrollbar-track {
  background: transparent;
}

.category-scroll__container::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.category-scroll__container::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.3);
}

.category-scroll__container {
  scroll-behavior: smooth;
}

.category-scroll__container {
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}
</style>
