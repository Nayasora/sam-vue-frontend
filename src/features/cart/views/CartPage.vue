<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft, Tag } from 'lucide-vue-next'
import { useCartStore } from '@common/cart/store/cart.store'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()

const couponCode = ref('')
const couponLoading = ref(false)
const couponError = ref('')

const items = computed(() => cartStore.items)
const isEmpty = computed(() => cartStore.isEmpty)
const formattedSubtotal = computed(() => cartStore.formattedSubtotal)
const formattedGrandTotal = computed(() => cartStore.formattedGrandTotal)
const formattedDiscount = computed(() => cartStore.formattedDiscount)
const discountAmount = computed(() => cartStore.discountAmount)
const appliedCoupon = computed(() => cartStore.couponCode)
const loading = computed(() => cartStore.loading)
const itemsCount = computed(() => cartStore.itemsCount)

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

async function clearCart() {
  await cartStore.clearCart()
}

async function applyCoupon() {
  if (!couponCode.value.trim()) return

  couponLoading.value = true
  couponError.value = ''

  const success = await cartStore.applyCoupon(couponCode.value.trim())
  if (success) {
    couponCode.value = ''
  } else {
    couponError.value = cartStore.error || 'Invalid coupon code'
  }

  couponLoading.value = false
}

async function removeCoupon() {
  await cartStore.removeCoupon()
}

function goToCheckout() {
  router.push('/checkout')
}

function goToCatalog() {
  router.push('/catalog')
}

onMounted(() => {
  cartStore.fetchCart()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-[1440px] px-6">
      <div class="mb-6 flex items-center gap-4">
        <button
          type="button"
          class="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          @click="goToCatalog"
        >
          <ArrowLeft :size="20" />
          <span>{{ t('cart.continueShopping') }}</span>
        </button>
      </div>

      <h1 class="mb-8 text-2xl font-bold text-gray-900">
        {{ t('cart.title') }}
        <span v-if="itemsCount > 0" class="text-gray-500">({{ itemsCount }})</span>
      </h1>

      <div v-if="loading && isEmpty" class="flex items-center justify-center py-20">
        <div class="size-10 animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
      </div>

      <div v-else-if="isEmpty" class="flex flex-col items-center justify-center gap-6 rounded-xl bg-white py-20 shadow-sm">
        <div class="flex size-24 items-center justify-center rounded-full bg-gray-100">
          <ShoppingCart :size="40" class="text-gray-400" />
        </div>
        <p class="text-lg text-gray-500">{{ t('cart.empty') }}</p>
        <button
          type="button"
          class="rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
          @click="goToCatalog"
        >
          {{ t('cart.continueShopping') }}
        </button>
      </div>

      <div v-else class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="rounded-xl bg-white shadow-sm">
            <div class="flex items-center justify-between border-b border-gray-100 p-4">
              <span class="font-medium text-gray-900">{{ t('cart.title') }}</span>
              <button
                type="button"
                class="text-sm text-red-500 transition-colors hover:text-red-600"
                :disabled="loading"
                @click="clearCart"
              >
                {{ t('cart.clearCart') }}
              </button>
            </div>

            <div class="divide-y divide-gray-100">
              <div
                v-for="item in items"
                :key="item.id"
                class="flex gap-4 p-4"
              >
                <RouterLink
                  :to="`/products/${item.product_id}`"
                  class="flex-shrink-0"
                >
                  <img
                    :src="getProductImage(item)"
                    :alt="item.name"
                    class="size-24 rounded-lg object-contain"
                  />
                </RouterLink>

                <div class="flex flex-1 flex-col gap-2">
                  <RouterLink
                    :to="`/products/${item.product_id}`"
                    class="line-clamp-2 font-medium text-gray-900 transition-colors hover:text-primary"
                  >
                    {{ item.name }}
                  </RouterLink>

                  <div class="text-sm text-gray-500">
                    SKU: {{ item.sku }}
                  </div>

                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <button
                        type="button"
                        class="flex size-8 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50 disabled:opacity-50"
                        :disabled="loading || item.quantity <= 1"
                        @click="decrementQuantity(item.id, item.quantity)"
                      >
                        <Minus :size="16" class="text-gray-600" />
                      </button>

                      <span class="w-10 text-center font-medium">{{ item.quantity }}</span>

                      <button
                        type="button"
                        class="flex size-8 items-center justify-center rounded-lg border border-gray-200 transition-colors hover:bg-gray-50 disabled:opacity-50"
                        :disabled="loading"
                        @click="incrementQuantity(item.id, item.quantity)"
                      >
                        <Plus :size="16" class="text-gray-600" />
                      </button>
                    </div>

                    <div class="flex items-center gap-4">
                      <span class="text-lg font-semibold text-primary">{{ item.formatted_total }}</span>

                      <button
                        type="button"
                        class="flex size-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500 disabled:opacity-50"
                        :disabled="loading"
                        @click="removeItem(item.id)"
                      >
                        <Trash2 :size="18" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="sticky top-4 space-y-4">
            <div class="rounded-xl bg-white p-6 shadow-sm">
              <h3 class="mb-4 font-semibold text-gray-900">{{ t('cart.applyCoupon') }}</h3>

              <div v-if="appliedCoupon" class="flex items-center justify-between rounded-lg bg-green-50 p-3">
                <div class="flex items-center gap-2">
                  <Tag :size="16" class="text-green-600" />
                  <span class="font-medium text-green-600">{{ appliedCoupon }}</span>
                </div>
                <button
                  type="button"
                  class="text-sm text-red-500 transition-colors hover:text-red-600"
                  @click="removeCoupon"
                >
                  {{ t('cart.couponRemove') }}
                </button>
              </div>

              <div v-else class="flex gap-2">
                <input
                  v-model="couponCode"
                  type="text"
                  class="flex-1 rounded-lg border border-gray-200 px-4 py-2 text-sm focus:border-primary focus:outline-none"
                  :placeholder="t('cart.couponPlaceholder')"
                  @keyup.enter="applyCoupon"
                />
                <button
                  type="button"
                  class="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 disabled:opacity-50"
                  :disabled="couponLoading || !couponCode.trim()"
                  @click="applyCoupon"
                >
                  {{ t('cart.couponApply') }}
                </button>
              </div>
              <p v-if="couponError" class="mt-2 text-sm text-red-500">{{ couponError }}</p>
            </div>

            <div class="rounded-xl bg-white p-6 shadow-sm">
              <h3 class="mb-4 font-semibold text-gray-900">{{ t('checkout.orderSummary') }}</h3>

              <div class="space-y-3">
                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">{{ t('cart.subtotal') }}</span>
                  <span class="font-medium text-gray-900">{{ formattedSubtotal }}</span>
                </div>

                <div v-if="discountAmount > 0" class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">{{ t('cart.discount') }}</span>
                  <span class="font-medium text-green-600">-{{ formattedDiscount }}</span>
                </div>

                <div class="flex items-center justify-between text-sm">
                  <span class="text-gray-500">{{ t('cart.shipping') }}</span>
                  <span class="font-medium text-gray-900">{{ t('cart.freeShipping') }}</span>
                </div>

                <div class="border-t border-gray-100 pt-3">
                  <div class="flex items-center justify-between">
                    <span class="font-semibold text-gray-900">{{ t('cart.total') }}</span>
                    <span class="text-xl font-bold text-primary">{{ formattedGrandTotal }}</span>
                  </div>
                </div>
              </div>

              <button
                type="button"
                class="mt-6 w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                :disabled="loading"
                @click="goToCheckout"
              >
                {{ t('cart.checkout') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
