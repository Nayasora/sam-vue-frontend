import { bagistoClient } from '../bagisto'
import { ENDPOINTS } from '../endpoints'
import type { Cart, AddToCartRequest, UpdateCartRequest } from '../bagisto.types'

export interface CartResponse {
  data: Cart
  message?: string
}

class CartService {
  async getCart(): Promise<Cart> {
    const response = await bagistoClient.get<CartResponse>(ENDPOINTS.CART.GET)
    return response.data
  }

  async addToCart(productId: number | string, quantity: number = 1, options?: Partial<AddToCartRequest>): Promise<Cart> {
    const payload: AddToCartRequest = {
      product_id: Number(productId),
      quantity,
      ...options
    }

    const response = await bagistoClient.post<AddToCartRequest, CartResponse>(
      ENDPOINTS.CART.ADD(productId),
      payload
    )
    return response.data
  }

  async updateCart(quantities: Record<string, number>): Promise<Cart> {
    const payload: UpdateCartRequest = { qty: quantities }
    const response = await bagistoClient.put<UpdateCartRequest, CartResponse>(
      ENDPOINTS.CART.UPDATE,
      payload
    )
    return response.data
  }

  async removeItem(cartItemId: number | string): Promise<Cart> {
    const response = await bagistoClient.delete<CartResponse>(
      ENDPOINTS.CART.REMOVE_ITEM(cartItemId)
    )
    return response.data
  }

  async clearCart(): Promise<void> {
    await bagistoClient.delete(ENDPOINTS.CART.CLEAR)
  }

  async applyCoupon(code: string): Promise<Cart> {
    const response = await bagistoClient.post<{ code: string }, CartResponse>(
      ENDPOINTS.CART.APPLY_COUPON,
      { code }
    )
    return response.data
  }

  async removeCoupon(): Promise<Cart> {
    const response = await bagistoClient.delete<CartResponse>(ENDPOINTS.CART.REMOVE_COUPON)
    return response.data
  }

  async moveToWishlist(cartItemId: number | string): Promise<void> {
    await bagistoClient.post(ENDPOINTS.CART.MOVE_TO_WISHLIST(cartItemId), {})
  }
}

export const cartService = new CartService()
