<script setup lang="ts">
import { ref } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { ChevronLeft, ChevronRight } from 'lucide-vue-next'
import { ProductCard } from './'
import { saleProducts } from '../types'

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  align: 'start',
  slidesToScroll: 1,
  containScroll: 'trimSnaps'
})

const canScrollPrev = ref(true)
const canScrollNext = ref(true)

const onSelect = () => {
  if (!emblaApi.value) return
  canScrollPrev.value = emblaApi.value.canScrollPrev()
  canScrollNext.value = emblaApi.value.canScrollNext()
}

const scrollPrev = () => {
  if (emblaApi.value) emblaApi.value.scrollPrev()
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
  <div class="w-full py-10">
    <div class="mb-8 flex items-center justify-between px-12">
      <h2 class="text-3xl font-bold text-gray-900">{{ $t('store.saleProducts') }}</h2>
      <button
        class="flex h-8 items-center justify-center rounded-md border border-primary px-4 text-sm text-primary transition-opacity hover:opacity-80"
      >
        {{ $t('store.viewAll') }}
      </button>
    </div>

    <div class="relative w-full px-12">
      <div ref="emblaRef" class="overflow-hidden">
        <div class="flex gap-4">
          <div
            v-for="product in saleProducts"
            :key="product.id"
            class="min-w-0 w-[calc(20%-0.8rem)] flex-shrink-0 flex-grow-0"
          >
            <ProductCard :product="product" />
          </div>
        </div>
      </div>

      <button
        type="button"
        :disabled="!canScrollPrev"
        class="absolute left-7 top-1/2 z-10 flex size-10 -translate-y-1/2 items-center justify-center rounded-full border border-gray-200 bg-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
        @click="scrollPrev"
      >
        <ChevronLeft :size="18" class="text-black" />
      </button>

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
