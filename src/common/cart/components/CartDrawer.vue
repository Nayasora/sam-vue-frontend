<script setup lang="ts">
import { computed, watch } from 'vue'
import { X, Minus, Plus, Trash2, ShoppingCart } from 'lucide-vue-next'
import { useCartStore } from '../store/cart.store'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()

const items = computed(() => cartStore.items)
const isEmpty = computed(() => cartStore.isEmpty)
const formattedSubtotal = computed(() => cartStore.formattedSubtotal)
const formattedGrandTotal = computed(() => cartStore.formattedGrandTotal)
const loading = computed(() => cartStore.loading)
const itemsCount = computed(() => cartStore.itemsCount)

watch(() => props.isOpen, (isOpen) => {
  if (isOpen) {
    cartStore.fetchCart()
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})

function getProductImage(item: any): string {
  return item.product?.base_image?.small_image_url || '/placeholder-product.png'
}

async function incrementQuantity(itemId: number, currentQty: number) {
  await cartStore.updateItemQuantity(itemId, currentQty + 1)
}

async function decrementQuantity(itemId: number, currentQty: number) {
  if (currentQty > 1) {
    await cartStore.updateItemQuantity(itemId, currentQty - 1)
  }
}

async function removeItem(itemId: number) {
  await cartStore.removeItem(itemId)
}

function goToCheckout() {
  emit('close')
  router.push('/checkout')
}

function goToCart() {
  emit('close')
  router.push('/cart')
}
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 bg-black/50"
        @click="emit('close')"
      ></div>
    </Transition>

    <Transition name="slide-right">
      <div
        v-if="isOpen"
        class="fixed right-0 top-0 z-50 flex h-full w-full max-w-[420px] flex-col bg-white shadow-2xl"
      >
        <div class="flex items-center justify-between border-b border-gray-100 p-4">
          <h2 class="text-lg font-semibold text-gray-900">
            {{ t('cart.title') }}
            <span v-if="itemsCount > 0" class="text-gray-500">({{ itemsCount }})</span>
          </h2>
          <button
            type="button"
            class="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
            @click="emit('close')"
          >
            <X :size="20" class="text-gray-500" />
          </button>
        </div>

        <div v-if="loading && isEmpty" class="flex flex-1 items-center justify-center">
          <div class="size-8 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
        </div>

        <div v-else-if="isEmpty" class="flex flex-1 flex-col items-center justify-center gap-4 px-6">
          <div class="flex size-20 items-center justify-center rounded-full bg-gray-100">
            <ShoppingCart :size="32" class="text-gray-400" />
          </div>
          <p class="text-center text-gray-500">{{ t('cart.empty') }}</p>
          <button
            type="button"
            class="rounded-lg bg-primary px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            @click="emit('close')"
          >
            {{ t('cart.continueShopping') }}
          </button>
        </div>

        <template v-else>
          <div class="flex-1 overflow-y-auto p-4">
            <div class="flex flex-col gap-4">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex gap-3 rounded-lg border border-gray-100 p-3"
              >
                <RouterLink
                  :to="`/products/${item.product_id}`"
                  class="flex-shrink-0"
                  @click="emit('close')"
                >
                  <img
                    :src="getProductImage(item)"
                    :alt="item.name"
                    class="size-20 rounded-lg object-contain"
                  />
                </RouterLink>

                <div class="flex flex-1 flex-col gap-2">
                  <RouterLink
                    :to="`/products/${item.product_id}`"
                    class="line-clamp-2 text-sm font-medium text-gray-900 transition-colors hover:text-primary"
                    @click="emit('close')"
                  >
                    {{ item.name }}
                  </RouterLink>

                  <div class="flex items-center justify-between">
                    <span class="text-sm font-semibold text-primary">{{ item.formatted_total }}</span>

                    <div class="flex items-center gap-1">
                      <button
                        type="button"
                        class="flex size-7 items-center justify-center rounded-md border border-gray-200 transition-colors hover:bg-gray-50 disabled:opacity-50"
                        :disabled="loading || item.quantity <= 1"
                        @click="decrementQuantity(item.id, item.quantity)"
                      >
                        <Minus :size="14" class="text-gray-600" />
                      </button>

                      <span class="w-8 text-center text-sm font-medium">{{ item.quantity }}</span>

                      <button
                        type="button"
                        class="flex size-7 items-center justify-center rounded-md border border-gray-200 transition-colors hover:bg-gray-50 disabled:opacity-50"
                        :disabled="loading"
                        @click="incrementQuantity(item.id, item.quantity)"
                      >
                        <Plus :size="14" class="text-gray-600" />
                      </button>

                      <button
                        type="button"
                        class="ml-2 flex size-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                        :disabled="loading"
                        @click="removeItem(item.id)"
                      >
                        <Trash2 :size="14" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="border-t border-gray-100 p-4">
            <div class="mb-4 flex flex-col gap-2">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">{{ t('cart.subtotal') }}</span>
                <span class="font-medium text-gray-900">{{ formattedSubtotal }}</span>
              </div>
              <div class="flex items-center justify-between">
                <span class="font-medium text-gray-900">{{ t('cart.total') }}</span>
                <span class="text-lg font-bold text-primary">{{ formattedGrandTotal }}</span>
              </div>
            </div>

            <div class="flex flex-col gap-2">
              <button
                type="button"
                class="w-full rounded-lg bg-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                :disabled="loading"
                @click="goToCheckout"
              >
                {{ t('cart.checkout') }}
              </button>
              <button
                type="button"
                class="w-full rounded-lg border border-gray-200 py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                @click="goToCart"
              >
                {{ t('cart.viewCart') }}
              </button>
            </div>
          </div>
        </template>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-right-enter-active,
.slide-right-leave-active {
  transition: transform 0.3s ease;
}

.slide-right-enter-from,
.slide-right-leave-to {
  transform: translateX(100%);
}
</style>
