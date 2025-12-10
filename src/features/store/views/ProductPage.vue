<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { Heart, MapPin, Star, ChevronRight } from 'lucide-vue-next'
import { useProductsStore } from '@common/catalog'
import { useCartStore } from '@common/cart'
import { ProductCard } from '../components'
import { mapApiProductsToLocal } from '../utils/product-mapper'
import type { Product } from '@common/api/bagisto.types'

const { t } = useI18n()
const route = useRoute()
const productsStore = useProductsStore()
const cartStore = useCartStore()

const product = computed(() => productsStore.currentProduct)
const loading = computed(() => productsStore.loading)
const selectedImage = ref(0)
const activeTab = ref<'specs' | 'description' | 'reviews'>('specs')

const productId = computed(() => route.params.id as string)

const relatedProducts = computed(() => mapApiProductsToLocal(productsStore.featuredProducts.slice(0, 5)))

const mainImage = computed(() => {
  if (!product.value) return '/store/images/product-placeholder.png'
  if (product.value.images?.length > 0) {
    return product.value.images[selectedImage.value]?.large_image_url || product.value.images[selectedImage.value]?.url
  }
  return product.value.base_image?.large_image_url || '/store/images/product-placeholder.png'
})

const thumbnails = computed(() => {
  if (!product.value?.images?.length) return []
  return product.value.images.slice(0, 6)
})

const hasDiscount = computed(() => {
  if (!product.value) return false
  const special = parseFloat(String(product.value.special_price || 0))
  const regular = parseFloat(String(product.value.price || 0))
  return special > 0 && special < regular
})

const currentPrice = computed(() => {
  if (!product.value) return 0
  if (hasDiscount.value) {
    return parseFloat(String(product.value.special_price))
  }
  return parseFloat(String(product.value.price))
})

const originalPrice = computed(() => {
  if (!product.value) return 0
  return parseFloat(String(product.value.price))
})

function formatPrice(price: number): string {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

function selectImage(index: number) {
  selectedImage.value = index
}

const addingToCart = ref(false)

async function addToCart() {
  if (!product.value) return
  addingToCart.value = true
  await cartStore.addItem(product.value.id, 1)
  addingToCart.value = false
}

const mockSpecs = [
  { label: 'Платформа', value: 'P21786-421' },
  { label: 'Артикул', value: '108441' },
  { label: 'Партномер', value: 'P21786-421' },
]

const mockTechSpecs = [
  { label: 'Форм-фактор', value: 'Tower' },
  { label: 'Поколение', value: 'Xeon Bronze 3206R' },
  { label: 'Процессор (Максимальное)', value: 'до 2-х процессоров' },
  { label: 'Процессор (Установлено)', value: '1 процессор' },
  { label: 'Частота процессора', value: '2966' },
  { label: 'Блок питания', value: '350W' },
  { label: 'Гарантия', value: '3 года' },
  { label: 'Процессор (Установлено)', value: '1 процессор' },
  { label: 'Частота процессора', value: '2966' },
  { label: 'Блок питания', value: '350W' },
]

const mockReviews = [
  { id: 1, author: 'Rex Watson', date: '04 July 2021', rating: 4, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales. Donec id leo ipsum. Praesent vulputate aliquet mauris, sit blandit nulla laoreet vitae.' },
  { id: 2, author: 'Rex Watson', date: '04 July 2021', rating: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales. Donec id leo ipsum. Praesent vulputate aliquet mauris, sit blandit nulla laoreet vitae.' },
  { id: 3, author: 'Rex Watson', date: '04 July 2021', rating: 3, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales. Donec id leo ipsum. Praesent vulputate aliquet mauris, sit blandit nulla laoreet vitae.' },
  { id: 4, author: 'Rex Watson', date: '04 July 2021', rating: 5, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales. Donec id leo ipsum. Praesent vulputate aliquet mauris, sit blandit nulla laoreet vitae.' },
  { id: 5, author: 'Rex Watson', date: '04 July 2021', rating: 2, text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales. Donec id leo ipsum. Praesent vulputate aliquet mauris, sit blandit nulla laoreet vitae.' },
]

const ratingBreakdown = [
  { stars: 5, percent: 70 },
  { stars: 4, percent: 20 },
  { stars: 3, percent: 5 },
  { stars: 2, percent: 3 },
  { stars: 1, percent: 2 },
]

onMounted(async () => {
  if (productId.value) {
    await productsStore.fetchProductById(productId.value)
  }
  if (productsStore.featuredProducts.length === 0) {
    await productsStore.fetchFeaturedProducts(5)
  }
})

watch(productId, async (newId) => {
  if (newId) {
    await productsStore.fetchProductById(newId)
    selectedImage.value = 0
  }
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <div class="mx-auto max-w-[1280px] px-12 py-12">
      <div v-if="loading" class="flex items-center justify-center py-20">
        <div class="size-12 animate-spin rounded-full border-4 border-[#1677ff] border-t-transparent"></div>
      </div>

      <template v-else-if="product">
        <div class="mb-12">
          <nav class="mb-4 flex items-center gap-1 text-sm">
            <RouterLink to="/" class="text-[rgba(0,0,0,0.45)] hover:text-[#1677ff]">{{ $t('common.home') }}</RouterLink>
            <ChevronRight :size="14" class="text-[rgba(0,0,0,0.45)]" />
            <RouterLink to="/catalog" class="text-[rgba(0,0,0,0.45)] hover:text-[#1677ff]">{{ $t('catalog.title') }}</RouterLink>
            <ChevronRight :size="14" class="text-[rgba(0,0,0,0.45)]" />
            <span class="text-[rgba(0,0,0,0.45)]">{{ product.name }}</span>
          </nav>

          <div class="flex items-start justify-between">
            <div>
              <p class="mb-1 text-sm leading-[22px] text-[rgba(0,0,0,0.45)]">HPE ML350 Gen10</p>
              <h1 class="text-xl font-semibold leading-7 text-[rgba(0,0,0,0.88)]">{{ product.name }}</h1>
            </div>
            <div class="flex items-center gap-1">
              <Star :size="16" class="fill-[#fadb14] text-[#fadb14]" />
              <span class="text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">4.8</span>
              <span class="text-sm leading-[22px] text-[#1677ff]">({{ $t('product.viewAllReviews', { count: 32 }) }})</span>
            </div>
          </div>
        </div>

        <div class="flex gap-8">
          <div class="w-[480px] flex-shrink-0">
            <div class="mb-6 flex aspect-square items-center justify-center rounded-lg bg-[#f5f5f5]">
              <img
                :src="mainImage"
                :alt="product.name"
                class="max-h-full max-w-full object-contain p-8"
              />
            </div>

            <div class="flex gap-3">
              <button
                v-for="(img, index) in thumbnails"
                :key="img.id || index"
                class="size-16 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-[#f5f5f5] p-1 transition-colors"
                :class="selectedImage === index ? 'border-[#1677ff]' : 'border-transparent hover:border-[rgba(0,0,0,0.15)]'"
                @click="selectImage(index)"
              >
                <img
                  :src="img.small_image_url || img.url"
                  :alt="`${product.name} - ${index + 1}`"
                  class="size-full object-contain"
                />
              </button>
              <template v-if="thumbnails.length === 0">
                <div
                  v-for="i in 6"
                  :key="i"
                  class="size-16 flex-shrink-0 rounded-lg bg-[#f5f5f5]"
                  :class="i === 1 ? 'border-2 border-[#1677ff]' : ''"
                ></div>
              </template>
            </div>
          </div>

          <div class="w-[320px] flex-shrink-0">
            <div class="mb-6">
              <h3 class="mb-4 text-base font-medium leading-6 text-[rgba(0,0,0,0.88)]">{{ $t('product.characteristics') }}</h3>
              <div class="flex flex-col gap-2">
                <div v-for="spec in mockSpecs" :key="spec.label" class="flex">
                  <span class="w-[154px] text-sm leading-[22px] text-[rgba(0,0,0,0.45)]">{{ spec.label }}</span>
                  <span class="w-[154px] text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ spec.value }}</span>
                </div>
              </div>
            </div>

            <div class="mb-6 h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div class="mb-6">
              <h3 class="mb-4 text-base font-medium leading-6 text-[rgba(0,0,0,0.88)]">{{ $t('product.technicalSpecs') }}</h3>
              <div class="flex flex-col gap-2">
                <div v-for="spec in mockTechSpecs" :key="spec.label" class="flex">
                  <span class="w-[154px] text-sm leading-[22px] text-[rgba(0,0,0,0.45)]">{{ spec.label }}</span>
                  <span class="w-[154px] text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ spec.value }}</span>
                </div>
              </div>
            </div>

            <div class="mb-6 h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div>
              <h3 class="mb-4 text-base font-medium leading-6 text-[rgba(0,0,0,0.88)]">{{ $t('product.description') }}</h3>
              <p class="text-sm leading-[22px] text-[rgba(0,0,0,0.65)]">
                {{ product.short_description || 'Сервер HPE DL380 Gen10 P40426-B21 Hp/Hpe/0ADE99/INCl MXQ102XJF6 1x Xeon 3204/16Gb/RAID Hp smart...' }}
              </p>
            </div>
          </div>

          <div class="w-[320px] flex-shrink-0 rounded-lg border border-[rgba(0,0,0,0.06)]">
            <div class="p-4">
              <div class="mb-6 flex items-baseline gap-2">
                <span class="text-2xl font-semibold leading-8 text-[rgba(0,0,0,0.88)]">{{ formatPrice(currentPrice) }} ₸</span>
                <span v-if="hasDiscount" class="text-base leading-6 text-[rgba(0,0,0,0.45)] line-through">{{ formatPrice(originalPrice) }} ₸</span>
              </div>

              <div class="flex gap-2">
                <button
                  class="flex h-10 flex-1 items-center justify-center rounded-lg bg-[#1677ff] text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
                  :disabled="addingToCart"
                  @click="addToCart"
                >
                  {{ addingToCart ? $t('common.loading') : $t('product.addToCart') }}
                </button>
                <button class="flex size-10 items-center justify-center rounded-lg border border-[rgba(0,0,0,0.15)] bg-white transition-colors hover:border-[#1677ff] hover:text-[#1677ff]">
                  <Heart :size="18" />
                </button>
              </div>
            </div>

            <div class="h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div class="p-4">
              <h4 class="mb-4 text-base font-medium leading-6 text-[rgba(0,0,0,0.88)]">{{ $t('product.deliveryInfo') }}</h4>

              <div class="mb-3 flex gap-3">
                <MapPin :size="24" class="flex-shrink-0 text-[rgba(0,0,0,0.45)]" />
                <div>
                  <p class="text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ $t('product.deliveryAlmaty') }}</p>
                  <p class="text-sm leading-5 text-[rgba(0,0,0,0.45)]">{{ $t('product.tomorrowFree') }}</p>
                </div>
              </div>

              <div class="flex gap-3">
                <MapPin :size="24" class="flex-shrink-0 text-[rgba(0,0,0,0.45)]" />
                <div>
                  <p class="text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ $t('product.deliveryKazakhstan') }}</p>
                  <p class="text-sm leading-5 text-[rgba(0,0,0,0.45)]">{{ $t('product.tomorrowFree') }}</p>
                </div>
              </div>
            </div>

            <div class="h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div class="p-4">
              <h4 class="mb-4 text-base font-medium leading-6 text-[rgba(0,0,0,0.88)]">{{ $t('product.additionalInfo') }}</h4>
              <p class="text-sm leading-[22px] text-[rgba(0,0,0,0.65)]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus interdum hendrerit ex vitae sodales. Praesent vulputate aliquet mauris, sit blandit.
              </p>
            </div>
          </div>
        </div>

        <div class="mt-16">
          <h2 class="mb-6 text-xl font-semibold leading-7 text-[rgba(0,0,0,0.88)]">{{ $t('product.customerReviews') }}</h2>

          <div class="flex gap-8">
            <div class="flex-1">
              <div class="flex flex-col gap-6">
                <div v-for="review in mockReviews" :key="review.id" class="border-b border-[rgba(0,0,0,0.06)] pb-6">
                  <div class="mb-2 flex items-center gap-3">
                    <div class="size-10 rounded-full bg-[#f5f5f5]"></div>
                    <div>
                      <p class="text-sm font-medium leading-[22px] text-[rgba(0,0,0,0.88)]">{{ review.author }}</p>
                      <p class="text-xs leading-5 text-[rgba(0,0,0,0.45)]">{{ review.date }}</p>
                    </div>
                    <div class="ml-auto flex">
                      <Star
                        v-for="i in 5"
                        :key="i"
                        :size="16"
                        :class="i <= review.rating ? 'fill-[#fadb14] text-[#fadb14]' : 'text-[rgba(0,0,0,0.15)]'"
                      />
                    </div>
                  </div>
                  <p class="text-sm leading-[22px] text-[rgba(0,0,0,0.65)]">{{ review.text }}</p>
                </div>
              </div>
            </div>

            <div class="w-[320px] flex-shrink-0">
              <div class="rounded-lg border border-[rgba(0,0,0,0.06)] p-4">
                <div class="mb-4 flex items-center gap-2">
                  <Star :size="20" class="fill-[#fadb14] text-[#fadb14]" />
                  <span class="text-2xl font-semibold leading-8 text-[rgba(0,0,0,0.88)]">4.25</span>
                  <span class="text-sm leading-[22px] text-[rgba(0,0,0,0.45)]">(1049 {{ $t('product.reviewsCount') }})</span>
                </div>

                <div class="mb-6 flex flex-col gap-2">
                  <div v-for="item in ratingBreakdown" :key="item.stars" class="flex items-center gap-2">
                    <span class="w-3 text-sm text-[rgba(0,0,0,0.65)]">{{ item.stars }}</span>
                    <div class="h-2 flex-1 overflow-hidden rounded-full bg-[rgba(0,0,0,0.06)]">
                      <div class="h-full rounded-full bg-[#fadb14]" :style="{ width: `${item.percent}%` }"></div>
                    </div>
                    <span class="w-8 text-right text-sm text-[rgba(0,0,0,0.45)]">{{ item.percent }}%</span>
                  </div>
                </div>

                <div class="mb-4 h-px bg-[rgba(0,0,0,0.06)]"></div>

                <div class="mb-4">
                  <h4 class="mb-2 text-sm font-medium leading-[22px] text-[rgba(0,0,0,0.88)]">{{ $t('product.shareReview') }}</h4>
                  <p class="text-sm leading-[22px] text-[rgba(0,0,0,0.65)]">Lorem ipsum dolor sit amet, consectetur adipiscing elit interdum hendrerit ex vitae sodales.</p>
                </div>

                <button class="flex h-10 w-full items-center justify-center rounded-lg border border-[rgba(0,0,0,0.15)] bg-white text-sm font-medium text-[rgba(0,0,0,0.88)] transition-colors hover:border-[#1677ff] hover:text-[#1677ff]">
                  {{ $t('product.writeReview') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16">
          <div class="mb-6 flex items-center justify-between">
            <h2 class="text-xl font-semibold leading-7 text-[rgba(0,0,0,0.88)]">{{ $t('product.relatedProducts') }}</h2>
            <RouterLink to="/catalog" class="text-sm text-[#1677ff] hover:underline">{{ $t('store.viewAll') }}</RouterLink>
          </div>

          <div class="grid grid-cols-5 gap-4">
            <ProductCard
              v-for="relProduct in relatedProducts"
              :key="relProduct.id"
              :product="relProduct"
            />
          </div>
        </div>
      </template>

      <div v-else class="py-20 text-center">
        <p class="text-xl text-[rgba(0,0,0,0.45)]">{{ $t('product.notFound') }}</p>
        <RouterLink to="/catalog" class="mt-4 inline-block text-[#1677ff] hover:underline">
          {{ $t('product.backToCatalog') }}
        </RouterLink>
      </div>
    </div>
  </div>
</template>
