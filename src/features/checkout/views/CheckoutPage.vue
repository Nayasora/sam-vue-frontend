<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { ArrowLeft, Check, ChevronRight } from 'lucide-vue-next'
import { useCartStore } from '@common/cart/store/cart.store'
import { useCheckoutStore } from '../stores/checkout.store'

const { t } = useI18n()
const router = useRouter()
const cartStore = useCartStore()
const checkoutStore = useCheckoutStore()

const currentStep = computed(() => checkoutStore.currentStep)
const stepNumber = computed(() => checkoutStore.stepNumber)
const loading = computed(() => checkoutStore.loading)
const error = computed(() => checkoutStore.error)
const billingAddress = computed(() => checkoutStore.billingAddress)
const shippingMethods = computed(() => checkoutStore.shippingMethods)
const paymentMethods = computed(() => checkoutStore.paymentMethods)
const selectedShippingMethod = computed({
  get: () => checkoutStore.selectedShippingMethod,
  set: (val) => { checkoutStore.selectedShippingMethod = val }
})
const selectedPaymentMethod = computed({
  get: () => checkoutStore.selectedPaymentMethod,
  set: (val) => { checkoutStore.selectedPaymentMethod = val }
})

const cartItems = computed(() => cartStore.items)
const formattedGrandTotal = computed(() => cartStore.formattedGrandTotal)
const formattedSubtotal = computed(() => cartStore.formattedSubtotal)

const steps = [
  { key: 'address', label: t('checkout.step1') },
  { key: 'shipping', label: t('checkout.step2') },
  { key: 'payment', label: t('checkout.step3') },
  { key: 'review', label: t('checkout.step4') }
]

function isStepComplete(stepKey: string): boolean {
  const stepOrder = ['address', 'shipping', 'payment', 'review']
  const currentIndex = stepOrder.indexOf(currentStep.value)
  const stepIndex = stepOrder.indexOf(stepKey)
  return stepIndex < currentIndex
}

function isStepActive(stepKey: string): boolean {
  return currentStep.value === stepKey
}

async function handleAddressSubmit() {
  await checkoutStore.saveAddress()
}

async function handleShippingSubmit() {
  await checkoutStore.saveShipping()
}

async function handlePaymentSubmit() {
  await checkoutStore.savePayment()
}

async function handlePlaceOrder() {
  const order = await checkoutStore.placeOrder()
  if (order) {
    cartStore.fetchCart()
    router.push(`/order/success/${order.id}`)
  }
}

function goBack() {
  if (currentStep.value === 'address') {
    router.push('/cart')
  } else {
    checkoutStore.goBack()
  }
}

function getProductImage(item: any): string {
  return item.product?.base_image?.small_image_url || '/placeholder-product.png'
}

onMounted(() => {
  if (cartStore.isEmpty) {
    router.push('/cart')
    return
  }
  checkoutStore.resetCheckout()
})

watch(() => cartStore.isEmpty, (isEmpty) => {
  if (isEmpty && currentStep.value !== 'review') {
    router.push('/cart')
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="mx-auto max-w-[1440px] px-6">
      <div class="mb-6 flex items-center gap-4">
        <button
          type="button"
          class="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900"
          @click="goBack"
        >
          <ArrowLeft :size="20" />
          <span>{{ currentStep === 'address' ? t('checkout.backToCart') : t('checkout.back') }}</span>
        </button>
      </div>

      <h1 class="mb-8 text-2xl font-bold text-gray-900">{{ t('checkout.title') }}</h1>

      <div class="mb-8 flex items-center justify-center">
        <div class="flex items-center">
          <template v-for="(step, index) in steps" :key="step.key">
            <div class="flex items-center">
              <div
                class="flex size-10 items-center justify-center rounded-full text-sm font-medium transition-colors"
                :class="{
                  'bg-primary text-white': isStepActive(step.key),
                  'bg-green-500 text-white': isStepComplete(step.key),
                  'bg-gray-200 text-gray-500': !isStepActive(step.key) && !isStepComplete(step.key)
                }"
              >
                <Check v-if="isStepComplete(step.key)" :size="18" />
                <span v-else>{{ index + 1 }}</span>
              </div>
              <span
                class="ml-2 hidden text-sm font-medium sm:block"
                :class="{
                  'text-primary': isStepActive(step.key),
                  'text-green-500': isStepComplete(step.key),
                  'text-gray-500': !isStepActive(step.key) && !isStepComplete(step.key)
                }"
              >
                {{ step.label }}
              </span>
            </div>
            <ChevronRight
              v-if="index < steps.length - 1"
              :size="20"
              class="mx-4 text-gray-300"
            />
          </template>
        </div>
      </div>

      <div class="grid gap-8 lg:grid-cols-3">
        <div class="lg:col-span-2">
          <div class="rounded-xl bg-white p-6 shadow-sm">
            <div v-if="error" class="mb-4 rounded-lg bg-red-50 p-4 text-red-600">
              {{ error }}
            </div>

            <div v-if="currentStep === 'address'">
              <h2 class="mb-6 text-lg font-semibold text-gray-900">{{ t('checkout.shippingAddress') }}</h2>

              <form @submit.prevent="handleAddressSubmit" class="space-y-4">
                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.firstName') }}</label>
                    <input
                      v-model="billingAddress.first_name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.lastName') }}</label>
                    <input
                      v-model="billingAddress.last_name"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.email') }}</label>
                    <input
                      v-model="billingAddress.email"
                      type="email"
                      required
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.phone') }}</label>
                    <input
                      v-model="billingAddress.phone"
                      type="tel"
                      required
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.address') }}</label>
                  <input
                    v-model="billingAddress.address1"
                    type="text"
                    required
                    class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                  />
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.city') }}</label>
                    <input
                      v-model="billingAddress.city"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.state') }}</label>
                    <input
                      v-model="billingAddress.state"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>

                <div class="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.postcode') }}</label>
                    <input
                      v-model="billingAddress.postcode"
                      type="text"
                      required
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    />
                  </div>
                  <div>
                    <label class="mb-1 block text-sm font-medium text-gray-700">{{ t('checkout.country') }}</label>
                    <select
                      v-model="billingAddress.country"
                      class="w-full rounded-lg border border-gray-200 px-4 py-2 focus:border-primary focus:outline-none"
                    >
                      <option value="KZ">Казахстан</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  class="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                  :disabled="loading"
                >
                  {{ loading ? t('common.loading') : t('checkout.continue') }}
                </button>
              </form>
            </div>

            <div v-else-if="currentStep === 'shipping'">
              <h2 class="mb-6 text-lg font-semibold text-gray-900">{{ t('checkout.selectShipping') }}</h2>

              <div v-if="shippingMethods.length === 0" class="py-8 text-center text-gray-500">
                {{ t('common.loading') }}
              </div>

              <div v-else class="space-y-3">
                <label
                  v-for="method in shippingMethods"
                  :key="method.method"
                  class="flex cursor-pointer items-center justify-between rounded-lg border p-4 transition-colors"
                  :class="{
                    'border-primary bg-primary/5': selectedShippingMethod === method.method,
                    'border-gray-200 hover:border-gray-300': selectedShippingMethod !== method.method
                  }"
                >
                  <div class="flex items-center gap-3">
                    <input
                      v-model="selectedShippingMethod"
                      type="radio"
                      :value="method.method"
                      class="text-primary focus:ring-primary"
                    />
                    <div>
                      <p class="font-medium text-gray-900">{{ method.method_title }}</p>
                      <p v-if="method.rates?.[0]?.method_description" class="text-sm text-gray-500">
                        {{ method.rates[0].method_description }}
                      </p>
                    </div>
                  </div>
                  <span class="font-semibold text-primary">
                    {{ method.rates?.[0]?.formatted_price || t('cart.freeShipping') }}
                  </span>
                </label>

                <button
                  type="button"
                  class="mt-6 w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                  :disabled="loading || !selectedShippingMethod"
                  @click="handleShippingSubmit"
                >
                  {{ loading ? t('common.loading') : t('checkout.continue') }}
                </button>
              </div>
            </div>

            <div v-else-if="currentStep === 'payment'">
              <h2 class="mb-6 text-lg font-semibold text-gray-900">{{ t('checkout.selectPayment') }}</h2>

              <div v-if="paymentMethods.length === 0" class="py-8 text-center text-gray-500">
                {{ t('common.loading') }}
              </div>

              <div v-else class="space-y-3">
                <label
                  v-for="method in paymentMethods"
                  :key="method.method"
                  class="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors"
                  :class="{
                    'border-primary bg-primary/5': selectedPaymentMethod === method.method,
                    'border-gray-200 hover:border-gray-300': selectedPaymentMethod !== method.method
                  }"
                >
                  <input
                    v-model="selectedPaymentMethod"
                    type="radio"
                    :value="method.method"
                    class="text-primary focus:ring-primary"
                  />
                  <div>
                    <p class="font-medium text-gray-900">{{ method.method_title }}</p>
                    <p v-if="method.description" class="text-sm text-gray-500">{{ method.description }}</p>
                  </div>
                </label>

                <button
                  type="button"
                  class="mt-6 w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                  :disabled="loading || !selectedPaymentMethod"
                  @click="handlePaymentSubmit"
                >
                  {{ loading ? t('common.loading') : t('checkout.continue') }}
                </button>
              </div>
            </div>

            <div v-else-if="currentStep === 'review'">
              <h2 class="mb-6 text-lg font-semibold text-gray-900">{{ t('checkout.step4') }}</h2>

              <div class="space-y-6">
                <div class="rounded-lg bg-gray-50 p-4">
                  <h3 class="mb-2 font-medium text-gray-900">{{ t('checkout.shippingAddress') }}</h3>
                  <p class="text-sm text-gray-600">
                    {{ billingAddress.first_name }} {{ billingAddress.last_name }}<br />
                    {{ billingAddress.address1 }}<br />
                    {{ billingAddress.city }}, {{ billingAddress.state }} {{ billingAddress.postcode }}<br />
                    {{ billingAddress.phone }}
                  </p>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                  <h3 class="mb-2 font-medium text-gray-900">{{ t('checkout.step2') }}</h3>
                  <p class="text-sm text-gray-600">{{ selectedShippingMethod }}</p>
                </div>

                <div class="rounded-lg bg-gray-50 p-4">
                  <h3 class="mb-2 font-medium text-gray-900">{{ t('checkout.step3') }}</h3>
                  <p class="text-sm text-gray-600">{{ selectedPaymentMethod }}</p>
                </div>

                <button
                  type="button"
                  class="w-full rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-50"
                  :disabled="loading"
                  @click="handlePlaceOrder"
                >
                  {{ loading ? t('common.loading') : t('checkout.placeOrder') }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-1">
          <div class="sticky top-4 rounded-xl bg-white p-6 shadow-sm">
            <h3 class="mb-4 font-semibold text-gray-900">{{ t('checkout.orderSummary') }}</h3>

            <div class="max-h-[300px] space-y-3 overflow-y-auto">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="flex gap-3"
              >
                <img
                  :src="getProductImage(item)"
                  :alt="item.name"
                  class="size-16 rounded-lg object-contain"
                />
                <div class="flex-1">
                  <p class="line-clamp-2 text-sm font-medium text-gray-900">{{ item.name }}</p>
                  <p class="text-sm text-gray-500">x{{ item.quantity }}</p>
                  <p class="text-sm font-semibold text-primary">{{ item.formatted_total }}</p>
                </div>
              </div>
            </div>

            <div class="mt-4 space-y-2 border-t border-gray-100 pt-4">
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">{{ t('cart.subtotal') }}</span>
                <span class="font-medium text-gray-900">{{ formattedSubtotal }}</span>
              </div>
              <div class="flex items-center justify-between text-sm">
                <span class="text-gray-500">{{ t('cart.shipping') }}</span>
                <span class="font-medium text-gray-900">{{ t('cart.freeShipping') }}</span>
              </div>
              <div class="flex items-center justify-between border-t border-gray-100 pt-2">
                <span class="font-semibold text-gray-900">{{ t('cart.total') }}</span>
                <span class="text-xl font-bold text-primary">{{ formattedGrandTotal }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
