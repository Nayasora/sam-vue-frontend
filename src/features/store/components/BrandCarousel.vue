<script setup lang="ts">
import { ref } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { ChevronRight } from 'lucide-vue-next'
import { brands } from '../types'

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  align: 'start',
  slidesToScroll: 1,
  containScroll: 'trimSnaps'
})

const canScrollNext = ref(true)

const onSelect = () => {
  if (!emblaApi.value) return
  canScrollNext.value = emblaApi.value.canScrollNext()
}

const scrollNext = () => {
  if (emblaApi.value) emblaApi.value.scrollNext()
}

if (emblaApi.value) {
  emblaApi.value.on('select', onSelect)
  emblaApi.value.on('init', onSelect)
  onSelect()
}
</script>

<template>
  <div class="w-full py-8">
    <h2 class="mb-8 px-12 text-2xl font-semibold text-gray-900">{{ $t('store.brands') }}</h2>

    <div class="relative w-full px-12">
      <div ref="emblaRef" class="overflow-hidden">
        <div class="flex gap-4">
          <a
            v-for="brand in brands"
            :key="brand.id"
            :href="brand.link"
            class="min-w-0 w-[calc(20%-0.8rem)] flex-shrink-0 flex-grow-0"
          >
            <div class="flex h-[100px] items-center justify-center rounded-xl bg-blue-50 px-4 py-2">
              <img :src="brand.image" :alt="brand.name" class="h-auto max-h-[60px] w-auto max-w-full object-contain" />
            </div>
          </a>
        </div>
      </div>

      <button
        type="button"
        :disabled="!canScrollNext"
        class="absolute right-7 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        @click="scrollNext"
      >
        <ChevronRight :size="18" class="text-black" />
      </button>
    </div>
  </div>
</template>
