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

    <div class="flex w-full flex-col gap-[16px] pt-[16px]">
      <div class="flex w-full flex-col gap-[8px]">
        <div class="flex items-center gap-[4px]">
          <p class="text-[20px] font-semibold leading-[28px]" style="color: rgba(0, 0, 0, 0.88)">
            {{ formatPrice(product.price) }} ₸
          </p>
          <p v-if="product.originalPrice" class="text-[14px] font-normal leading-[22px] line-through" style="color: rgba(0, 0, 0, 0.45)">
            {{ formatPrice(product.originalPrice) }}
          </p>
        </div>

        <div class="h-[44px] max-h-[44px]">
          <p class="line-clamp-2 text-[14px] font-normal leading-[22px]" style="color: rgba(0, 0, 0, 0.88)">
            {{ product.name }}
          </p>
        </div>

        <div v-if="product.warranty" class="flex items-center">
          <div class="flex items-center gap-[6px]">
            <ShieldCheck :size="16" style="color: rgba(0, 0, 0, 0.65)" />
            <p class="text-[12px] font-normal leading-[20px]" style="color: rgba(0, 0, 0, 0.65)">
              Гарантия
            </p>
          </div>
          <div class="px-[8px]">
            <div class="h-[12px] w-0 border-l border-[rgba(0,0,0,0.15)]" />
          </div>
          <p class="text-[12px] font-normal leading-[20px]" style="color: rgba(0, 0, 0, 0.65)">
            {{ product.warranty }}
          </p>
        </div>
      </div>

      <div class="flex w-full gap-[8px]">
        <button
          class="flex h-[40px] flex-1 items-center justify-center rounded-[8px] bg-[#1677ff] px-[16px]"
          style="box-shadow: 0px 2px 0px 0px rgba(0, 0, 0, 0.02)"
          @click.prevent
        >
          <p class="text-[16px] font-normal leading-[24px] text-white">
            В корзину
          </p>
        </button>
        <button
          class="flex size-[40px] items-center justify-center rounded-[8px] border border-[rgba(0,0,0,0.15)] bg-white"
          @click.prevent
        >
          <Heart :size="18" style="color: rgba(0, 0, 0, 0.65)" />
        </button>
      </div>
    </div>
  </div>
</template>
