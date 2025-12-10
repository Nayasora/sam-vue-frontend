<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { useCityStore } from '@common/stores/city.store'

const cityStore = useCityStore()
const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectCity(cityId: number) {
  cityStore.selectCity(cityId)
  isOpen.value = false
}

function handleClickOutside(event: MouseEvent) {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  cityStore.fetchCities()
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<template>
  <div ref="dropdownRef" class="relative">
    <button
      type="button"
      class="flex cursor-pointer items-center gap-1"
      @click="toggleDropdown"
    >
      <span class="whitespace-nowrap text-sm text-white">{{ cityStore.selectedCityName || 'Выберите город' }}</span>
      <ChevronDown
        :size="12"
        class="text-white transition-transform"
        :class="{ 'rotate-180': isOpen }"
      />
    </button>

    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="absolute left-0 top-full z-50 mt-2 min-w-[160px] rounded-lg bg-white py-2 shadow-lg"
      >
        <button
          v-for="city in cityStore.cities"
          :key="city.id"
          type="button"
          class="flex w-full items-center gap-2 px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
          :class="{ 'bg-blue-50 text-blue-600': city.id === cityStore.selectedCityId }"
          @click="selectCity(city.id)"
        >
          <span
            v-if="city.id === cityStore.selectedCityId"
            class="size-1.5 rounded-full bg-blue-600"
          ></span>
          <span :class="{ 'ml-3.5': city.id !== cityStore.selectedCityId }">{{ city.name }}</span>
        </button>
      </div>
    </Transition>
  </div>
</template>
