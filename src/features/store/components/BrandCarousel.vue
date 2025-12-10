<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import emblaCarouselVue from 'embla-carousel-vue'
import { ChevronRight } from 'lucide-vue-next'
import { attributesService, type AttributeOption } from '@common/api/services/attributes.service'
import { brands as defaultBrands } from '../types'
import type { Brand } from '../types'

const [emblaRef, emblaApi] = emblaCarouselVue({
  loop: true,
  align: 'start',
  slidesToScroll: 1,
  containScroll: 'trimSnaps'
})

const apiBrands = ref<AttributeOption[]>([])
const loading = ref(true)

const brands = computed<Brand[]>(() => {
  if (apiBrands.value.length > 0) {
    return apiBrands.value.map(brand => ({
      id: String(brand.id),
      name: brand.label || brand.admin_name,
      image: brand.swatch_value || `/brands/${brand.admin_name.toLowerCase()}.png`,
      link: `/catalog?brand=${brand.id}`
    }))
  }
  return defaultBrands
})

const canScrollNext = ref(true)

const onSelect = () => {
  if (!emblaApi.value) return
  canScrollNext.value = emblaApi.value.canScrollNext()
}

const scrollNext = () => {
  if (emblaApi.value) emblaApi.value.scrollNext()
}

async function loadBrands() {
  loading.value = true
  try {
    apiBrands.value = await attributesService.getBrands()
  } catch (error) {
    console.error('Error loading brands:', error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  loadBrands()

  if (emblaApi.value) {
    emblaApi.value.on('select', onSelect)
    emblaApi.value.on('init', onSelect)
    onSelect()
  }
})
</script>

<template>
  <div class="w-full py-8">
    <h2 class="mb-8 px-12 text-2xl font-semibold text-gray-900">{{ $t('store.brands') }}</h2>

    <div class="relative w-full px-12">
      <div ref="emblaRef" class="overflow-hidden">
        <div class="flex gap-4">
          <RouterLink
            v-for="brand in brands"
            :key="brand.id"
            :to="brand.link"
            class="min-w-0 w-[calc(20%-0.8rem)] flex-shrink-0 flex-grow-0"
          >
            <div class="flex h-[100px] items-center justify-center rounded-xl bg-blue-50 px-4 py-2">
              <img :src="brand.image" :alt="brand.name" class="h-auto max-h-[60px] w-auto max-w-full object-contain" />
            </div>
          </RouterLink>
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
