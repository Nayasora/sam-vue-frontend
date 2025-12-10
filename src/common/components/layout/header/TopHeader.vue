<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import LanguageSwitcher from './LanguageSwitcher.vue'
import CitySelector from './CitySelector.vue'

const { t } = useI18n()
</script>

<template>
  <div class="relative h-[38px] w-full overflow-visible bg-primary before:absolute before:inset-0 before:bg-[url('/top-bar/images/top-bar-background.png')] before:bg-cover before:bg-center before:pointer-events-none">
    <div class="relative mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 py-2">
      <div class="relative z-10 flex items-center gap-0">
        <CitySelector />

        <div class="mx-3 h-4 w-px bg-gray-100"></div>

        <LanguageSwitcher />
      </div>

      <div class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span class="whitespace-nowrap text-sm text-white">{{ t('header.promo') }}</span>
      </div>

      <div class="relative z-10 flex items-center gap-0">
        <div class="flex items-center">
          <span class="whitespace-nowrap text-sm text-white">{{ t('header.returnPolicy') }}</span>
        </div>

        <div class="mx-3 h-4 w-px bg-gray-100"></div>

        <div class="flex items-center">
          <span class="whitespace-nowrap text-sm text-white">{{ t('header.help') }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
