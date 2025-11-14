<script setup lang="ts">
import { Heart, ShieldCheck } from 'lucide-vue-next'
import type { Product } from '../types'

interface Props {
  product: Product
}

defineProps<Props>()

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
</script>

<template>
  <div class="flex w-full min-w-[240px] max-w-[280px] flex-shrink-0 flex-col rounded-[6px] bg-white">
    <div class="relative flex h-[240px] items-center justify-center rounded-[12px] bg-gray-100">
      <img
        v-if="product.isBestseller"
        src="/store/images/product-card-badge-bestseller.png"
        alt="Бестселлер"
        class="absolute right-[-8px] top-[8px] z-10 h-auto w-auto"
      />
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-auto object-contain p-4"
      />
    </div>

    <div class="flex w-full flex-col gap-4 pt-4">
      <div class="flex w-full flex-col gap-2">
        <div class="flex items-center gap-1">
          <p class="text-xl font-semibold leading-7 text-gray-900">
            {{ formatPrice(product.price) }} ₸
          </p>
          <p v-if="product.originalPrice" class="text-sm font-normal leading-[22px] text-gray-400 line-through">
            {{ formatPrice(product.originalPrice) }}
          </p>
        </div>

        <div class="h-11 max-h-11">
          <p class="line-clamp-2 text-sm font-normal leading-[22px] text-gray-900">
            {{ product.name }}
          </p>
        </div>

        <div v-if="product.warranty" class="flex items-center">
          <div class="flex items-center gap-1.5">
            <ShieldCheck :size="16" class="text-gray-600" />
            <p class="text-xs font-normal leading-5 text-gray-600">
              Гарантия
            </p>
          </div>
          <div class="px-2">
            <div class="h-3 w-0 border-l border-gray-200" />
          </div>
          <p class="text-xs font-normal leading-5 text-gray-600">
            {{ product.warranty }}
          </p>
        </div>
      </div>

      <div class="flex w-full gap-2">
        <button
          class="flex h-10 flex-1 items-center justify-center rounded-lg bg-primary px-4 text-base font-normal leading-6 text-white shadow-sm"
          @click.prevent
        >
          В корзину
        </button>
        <button
          class="flex size-10 items-center justify-center rounded-lg border border-gray-200 bg-white"
          @click.prevent
        >
          <Heart :size="18" class="text-gray-600" />
        </button>
      </div>
    </div>
  </div>
</template>
