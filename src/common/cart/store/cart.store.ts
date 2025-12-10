import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { cartService } from '@common/api/services/cart.service'
import type { Cart, CartItem } from '@common/api/bagisto.types'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const items = computed<CartItem[]>(() => cart.value?.items || [])
  const itemsCount = computed(() => cart.value?.items_count || 0)
  const itemsQty = computed(() => cart.value?.items_qty || 0)
  const subtotal = computed(() => cart.value?.sub_total || 0)
  const grandTotal = computed(() => cart.value?.grand_total || 0)
  const formattedSubtotal = computed(() => cart.value?.formatted_sub_total || '$0.00')
  const formattedGrandTotal = computed(() => cart.value?.formatted_grand_total || '$0.00')
  const isEmpty = computed(() => itemsCount.value === 0)
  const couponCode = computed(() => cart.value?.coupon_code)
  const discountAmount = computed(() => cart.value?.discount_amount || 0)
  const formattedDiscount = computed(() => cart.value?.formatted_discount_amount || '$0.00')

  async function fetchCart(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      cart.value = await cartService.getCart()
    } catch (err: any) {
      if (err.status !== 401) {
        error.value = err.message || 'Failed to load cart'
      }
      cart.value = null
    } finally {
      loading.value = false
    }
  }

  async function addItem(productId: number | string, quantity: number = 1, options?: any): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      cart.value = await cartService.addToCart(productId, quantity, options)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to add item to cart'
      return false
    } finally {
      loading.value = false
    }
  }

  async function updateItemQuantity(cartItemId: number | string, quantity: number): Promise<boolean> {
    if (quantity < 1) {
      return removeItem(cartItemId)
    }

    loading.value = true
    error.value = null

    try {
      const quantities: Record<string, number> = { [String(cartItemId)]: quantity }
      cart.value = await cartService.updateCart(quantities)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to update cart'
      return false
    } finally {
      loading.value = false
    }
  }

  async function removeItem(cartItemId: number | string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      cart.value = await cartService.removeItem(cartItemId)
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to remove item'
      return false
    } finally {
      loading.value = false
    }
  }

  async function clearCart(): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      await cartService.clearCart()
      cart.value = null
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to clear cart'
      return false
    } finally {
      loading.value = false
    }
  }

  async function applyCoupon(code: string): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      cart.value = await cartService.applyCoupon(code)
      return true
    } catch (err: any) {
      error.value = err.message || 'Invalid coupon code'
      return false
    } finally {
      loading.value = false
    }
  }

  async function removeCoupon(): Promise<boolean> {
    loading.value = true
    error.value = null

    try {
      cart.value = await cartService.removeCoupon()
      return true
    } catch (err: any) {
      error.value = err.message || 'Failed to remove coupon'
      return false
    } finally {
      loading.value = false
    }
  }

  function getItemById(cartItemId: number | string): CartItem | undefined {
    return items.value.find(item => item.id === Number(cartItemId))
  }

  function isProductInCart(productId: number | string): boolean {
    return items.value.some(item => item.product_id === Number(productId))
  }

  function clearError(): void {
    error.value = null
  }

  return {
    cart,
    items,
    loading,
    error,
    itemsCount,
    itemsQty,
    subtotal,
    grandTotal,
    formattedSubtotal,
    formattedGrandTotal,
    isEmpty,
    couponCode,
    discountAmount,
    formattedDiscount,
    fetchCart,
    addItem,
    updateItemQuantity,
    removeItem,
    clearCart,
    applyCoupon,
    removeCoupon,
    getItemById,
    isProductInCart,
    clearError
  }
})
