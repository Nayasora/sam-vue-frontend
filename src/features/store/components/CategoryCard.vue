<script setup lang="ts">
interface Props {
  name: string
  image: string
  link: string
}

defineProps<Props>()
</script>

<template>
  <router-link
    :to="link"
    class="category-card"
  >
    <div class="category-card__text">
      <p>{{ name }}</p>
    </div>
    <div class="category-card__image">
      <img :src="image" :alt="name" />
    </div>
  </router-link>
</template>

<style scoped>
.category-card {
  position: relative;
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px 16px;
  background-color: #e6f4ff;
  border-radius: 12px;
  overflow: hidden;
  flex-shrink: 0;
  min-height: 76px;
  cursor: pointer;
  text-decoration: none;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.category-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.category-card__text {
  display: flex;
  align-items: center;
  height: 100%;
}

.category-card__text p {
  font-family: 'SF Pro Text', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 22px;
  color: rgba(0, 0, 0, 0.88);
  white-space: nowrap;
  margin: 0;
}

.category-card__image {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70px;
  flex-shrink: 0;
}

.category-card__image img {
  max-width: 100%;
  max-height: 60px;
  object-fit: contain;
}
</style>
