<script setup lang="ts">
import CategoryCard from './CategoryCard.vue'
import { categoryCards } from '../types'
</script>

<template>
  <div class="w-full border-b border-gray-100 bg-white">
    <div class="flex items-center gap-6 overflow-x-auto overflow-y-hidden px-12 py-3 [scrollbar-color:rgba(0,0,0,0.2)_transparent] [scrollbar-width:thin] [scroll-behavior:smooth] [user-select:none] [&::-webkit-scrollbar-thumb:hover]:bg-[rgba(0,0,0,0.3)] [&::-webkit-scrollbar-thumb]:rounded [&::-webkit-scrollbar-thumb]:bg-[rgba(0,0,0,0.2)] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar]:h-1.5">
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
