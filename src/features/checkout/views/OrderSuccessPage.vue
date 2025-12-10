<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { CheckCircle, Package, ArrowRight } from 'lucide-vue-next'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const orderId = computed(() => route.params.id as string)
const orderNumber = ref('')
const loading = ref(true)

function goToOrders() {
  router.push('/account/orders')
}

function continueShopping() {
  router.push('/catalog')
}

onMounted(() => {
  orderNumber.value = `#${orderId.value}`
  loading.value = false
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="mx-auto max-w-lg px-6">
      <div class="rounded-xl bg-white p-8 text-center shadow-sm">
        <div class="mb-6 flex justify-center">
          <div class="flex size-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle :size="40" class="text-green-500" />
          </div>
        </div>

        <h1 class="mb-2 text-2xl font-bold text-gray-900">{{ t('order.success') }}</h1>
        <p class="mb-6 text-gray-500">{{ t('order.thankYou') }}</p>

        <div class="mb-6 rounded-lg bg-gray-50 p-4">
          <div class="flex items-center justify-center gap-2">
            <Package :size="20" class="text-gray-400" />
            <span class="text-sm text-gray-500">{{ t('order.orderNumber') }}:</span>
            <span class="font-semibold text-gray-900">{{ orderNumber }}</span>
          </div>
        </div>

        <p class="mb-8 text-sm text-gray-500">{{ t('order.emailConfirmation') }}</p>

        <div class="flex flex-col gap-3">
          <button
            type="button"
            class="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-white transition-colors hover:bg-primary/90"
            @click="goToOrders"
          >
            {{ t('order.viewOrder') }}
            <ArrowRight :size="18" />
          </button>

          <button
            type="button"
            class="w-full rounded-lg border border-gray-200 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            @click="continueShopping"
          >
            {{ t('order.continueShopping') }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
