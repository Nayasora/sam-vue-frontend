<script setup lang="ts">
import { Heart, ShieldCheck } from 'lucide-vue-next'
import { useCartStore } from '@common/cart'
import type { Product } from '../types'

interface Props {
  product: Product
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const formatPrice = (price: number): string => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

async function addToCart() {
  await cartStore.addItem(props.product.id, 1)
}
</script>

<template>
  <RouterLink :to="product.link" class="flex h-full w-full flex-col rounded-md border border-transparent bg-white transition-shadow hover:shadow-lg">
    <div class="relative flex h-[240px] items-center justify-center overflow-hidden rounded-xl">
      <img
        v-if="product.isBestseller"
        src="/store/images/product-card-badge-bestseller.png"
        :alt="$t('store.bestseller')"
        class="absolute right-[-8px] top-[8px] z-10 h-auto w-auto"
      />
      <img
        :src="product.image"
        :alt="product.name"
        class="h-full w-full object-contain p-4"
      />
    </div>

    <div class="flex flex-1 flex-col gap-4 pt-4">
      <div class="flex flex-1 flex-col gap-2">
        <div class="flex items-center gap-1">
          <p class="text-xl font-semibold leading-7 text-[rgba(0,0,0,0.88)]">
            {{ formatPrice(product.price) }} ₸
          </p>
          <p v-if="product.originalPrice" class="text-sm leading-[22px] text-[rgba(0,0,0,0.45)] line-through">
            {{ formatPrice(product.originalPrice) }}
          </p>
        </div>

        <div class="h-11 max-h-11">
          <p class="line-clamp-2 text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">
            {{ product.name }}
          </p>
        </div>

        <div class="flex items-center text-xs leading-5 text-[rgba(0,0,0,0.65)]">
          <div class="flex items-center gap-1.5 pr-1.5">
            <ShieldCheck :size="16" />
            <span>{{ $t('store.warranty') }}</span>
          </div>
          <div class="mx-2 h-3 w-px bg-[rgba(0,0,0,0.06)]"></div>
          <span>{{ product.warranty ? $t(product.warranty) : '3 года' }}</span>
        </div>
      </div>

      <div class="flex gap-2">
        <button
          class="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#1677ff] text-base text-white shadow-[0px_2px_0px_0px_rgba(0,0,0,0.02)] transition-opacity hover:opacity-90"
          @click.prevent="addToCart"
        >
          {{ $t('store.addToCart') }}
        </button>
        <button
          class="flex size-10 items-center justify-center rounded-lg border border-[rgba(0,0,0,0.15)] bg-white transition-colors hover:border-[#1677ff] hover:text-[#1677ff]"
          @click.prevent
        >
          <Heart :size="18" />
        </button>
      </div>
    </div>
  </RouterLink>
</template>
