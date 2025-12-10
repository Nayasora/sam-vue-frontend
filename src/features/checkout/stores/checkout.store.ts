import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { checkoutService } from '@common/api/services/checkout.service'
import type {
  ShippingMethod,
  PaymentMethod,
  Order,
  CheckoutAddressRequest
} from '@common/api/bagisto.types'

export type CheckoutStep = 'address' | 'shipping' | 'payment' | 'review'

export interface AddressFormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  address1: string
  city: string
  state: string
  postcode: string
  country: string
  use_for_shipping: boolean
  save_as_address: boolean
}

export const useCheckoutStore = defineStore('checkout', () => {
  const currentStep = ref<CheckoutStep>('address')
  const loading = ref(false)
  const error = ref<string | null>(null)

  const shippingMethods = ref<ShippingMethod[]>([])
  const paymentMethods = ref<PaymentMethod[]>([])
  const selectedShippingMethod = ref<string | null>(null)
  const selectedPaymentMethod = ref<string | null>(null)
  const order = ref<Order | null>(null)

  const billingAddress = ref<AddressFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'KZ',
    use_for_shipping: true,
    save_as_address: false
  })

  const shippingAddress = ref<AddressFormData>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    address1: '',
    city: '',
    state: '',
    postcode: '',
    country: 'KZ',
    use_for_shipping: true,
    save_as_address: false
  })

  const stepNumber = computed(() => {
    switch (currentStep.value) {
      case 'address': return 1
      case 'shipping': return 2
      case 'payment': return 3
      case 'review': return 4
      default: return 1
    }
  })

  function resetCheckout() {
    currentStep.value = 'address'
    shippingMethods.value = []
    paymentMethods.value = []
    selectedShippingMethod.value = null
    selectedPaymentMethod.value = null
    order.value = null
    error.value = null
    billingAddress.value = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address1: '',
      city: '',
      state: '',
      postcode: '',
      country: 'KZ',
      use_for_shipping: true,
      save_as_address: false
    }
    shippingAddress.value = {
      first_name: '',
      last_name: '',
      email: '',
      phone: '',
      address1: '',
      city: '',
      state: '',
      postcode: '',
      country: 'KZ',
      use_for_shipping: true,
      save_as_address: false
    }
  }

  async function saveAddress(): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      const addressData: CheckoutAddressRequest = {
        billing: {
          first_name: billingAddress.value.first_name,
          last_name: billingAddress.value.last_name,
          email: billingAddress.value.email,
          phone: billingAddress.value.phone,
          address1: [billingAddress.value.address1],
          city: billingAddress.value.city,
          state: billingAddress.value.state,
          postcode: billingAddress.value.postcode,
          country: billingAddress.value.country,
          use_for_shipping: billingAddress.value.use_for_shipping,
          save_as_address: billingAddress.value.save_as_address
        }
      }

      if (!billingAddress.value.use_for_shipping) {
        addressData.shipping = {
          first_name: shippingAddress.value.first_name,
          last_name: shippingAddress.value.last_name,
          email: shippingAddress.value.email,
          phone: shippingAddress.value.phone,
          address1: [shippingAddress.value.address1],
          city: shippingAddress.value.city,
          state: shippingAddress.value.state,
          postcode: shippingAddress.value.postcode,
          country: shippingAddress.value.country,
          save_as_address: shippingAddress.value.save_as_address
        }
      }

      const result = await checkoutService.saveAddress(addressData)
      shippingMethods.value = result.shippingMethods || []
      currentStep.value = 'shipping'
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to save address'
      return false
    } finally {
      loading.value = false
    }
  }

  async function saveShipping(): Promise<boolean> {
    if (!selectedShippingMethod.value) {
      error.value = 'Please select a shipping method'
      return false
    }

    loading.value = true
    error.value = null

    try {
      const result = await checkoutService.saveShipping({
        shipping_method: selectedShippingMethod.value
      })
      paymentMethods.value = result.paymentMethods || []
      currentStep.value = 'payment'
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to save shipping method'
      return false
    } finally {
      loading.value = false
    }
  }

  async function savePayment(): Promise<boolean> {
    if (!selectedPaymentMethod.value) {
      error.value = 'Please select a payment method'
      return false
    }

    loading.value = true
    error.value = null

    try {
      await checkoutService.savePayment({
        payment: { method: selectedPaymentMethod.value }
      })
      currentStep.value = 'review'
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to save payment method'
      return false
    } finally {
      loading.value = false
    }
  }

  async function placeOrder(): Promise<Order | null> {
    loading.value = true
    error.value = null

    try {
      const createdOrder = await checkoutService.saveOrder()
      order.value = createdOrder
      return createdOrder
    } catch (err: any) {
      error.value = err.message || 'Failed to place order'
      return null
    } finally {
      loading.value = false
    }
  }

  function goToStep(step: CheckoutStep) {
    currentStep.value = step
  }

  function goBack() {
    switch (currentStep.value) {
      case 'shipping':
        currentStep.value = 'address'
        break
      case 'payment':
        currentStep.value = 'shipping'
        break
      case 'review':
        currentStep.value = 'payment'
        break
    }
  }

  return {
    currentStep,
    stepNumber,
    loading,
    error,
    billingAddress,
    shippingAddress,
    shippingMethods,
    paymentMethods,
    selectedShippingMethod,
    selectedPaymentMethod,
    order,
    resetCheckout,
    saveAddress,
    saveShipping,
    savePayment,
    placeOrder,
    goToStep,
    goBack
  }
})
