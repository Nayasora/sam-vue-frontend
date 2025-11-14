<script setup lang="ts">
</script>

<template>
  <div class="relative h-[38px] w-full overflow-hidden bg-primary before:absolute before:inset-0 before:bg-[url('/top-bar/images/top-bar-background.png')] before:bg-cover before:bg-center before:pointer-events-none">
    <div class="relative mx-auto flex h-full max-w-[1440px] items-center justify-between px-6 py-2">
      <div class="relative z-10 flex items-center gap-0">
        <div class="flex cursor-pointer items-center gap-1">
          <span class="whitespace-nowrap text-sm text-white">Алматы</span>
          <img
            src="/top-bar/icons/chevron-down.svg"
            alt=""
            class="block size-3 flex-shrink-0"
          />
        </div>

        <div class="mx-3 h-4 w-px bg-gray-100"></div>

        <div class="flex cursor-pointer items-center gap-1">
          <span class="whitespace-nowrap text-sm text-white">Русский</span>
          <img
            src="/top-bar/icons/chevron-down.svg"
            alt=""
            class="block size-3 flex-shrink-0"
          />
        </div>
      </div>

      <div class="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
        <span class="whitespace-nowrap text-sm text-white">Бесплатная доставка от 50 000 ₸</span>
      </div>

      <div class="relative z-10 flex items-center gap-0">
        <div class="flex items-center">
          <span class="whitespace-nowrap text-sm text-white">Политика возврата товаров</span>
        </div>

        <div class="mx-3 h-4 w-px bg-gray-100"></div>

        <div class="flex items-center">
          <span class="whitespace-nowrap text-sm text-white">Помощь</span>
        </div>
      </div>
    </div>
  </div>
</template>
