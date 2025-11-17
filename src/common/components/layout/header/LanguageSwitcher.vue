<script setup lang="ts">
import { useLocaleStore } from '@common/locale/store/locale.store'
import { computed } from 'vue'

const localeStore = useLocaleStore()

const languages = [
  { code: 'ru', label: 'RU' },
  { code: 'en', label: 'EN' },
  { code: 'kz', label: 'KZ' }
]

const currentLanguage = computed(() => {
  const lang = languages.find(l => l.code === localeStore.currentLocale)
  return lang?.label || 'RU'
})

const changeLanguage = (code: string) => {
  localeStore.setLocale(code)
}
</script>

<template>
  <div class="relative flex cursor-pointer items-center gap-1 group">
    <span class="whitespace-nowrap text-sm text-white">{{ currentLanguage }}</span>
    <img
      src="/top-bar/icons/chevron-down.svg"
      alt=""
      class="block size-3 flex-shrink-0"
    />

    <div class="absolute left-0 top-full z-[100] hidden pt-1 group-hover:block">
      <div class="w-20 overflow-hidden rounded-md bg-white shadow-lg">
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="changeLanguage(lang.code)"
          class="block w-full px-4 py-2 text-left text-sm text-gray-900 transition-colors hover:bg-blue-50"
          :class="{ 'bg-blue-50 font-semibold': localeStore.currentLocale === lang.code }"
        >
          {{ lang.label }}
        </button>
      </div>
    </div>
  </div>
</template>
