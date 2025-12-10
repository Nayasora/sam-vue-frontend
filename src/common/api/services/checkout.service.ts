import { bagistoClient } from '../bagisto'
import { ENDPOINTS } from '../endpoints'
import type {
  Cart,
  ShippingMethod,
  PaymentMethod,
  Order,
  CheckoutAddressRequest,
  CheckoutShippingRequest,
  CheckoutPaymentRequest
} from '../bagisto.types'

export interface SaveAddressResponse {
  data: {
    cart: Cart
    shippingMethods: ShippingMethod[]
  }
}

export interface SaveShippingResponse {
  data: {
    cart: Cart
    paymentMethods: PaymentMethod[]
  }
}

export interface SavePaymentResponse {
  data: {
    cart: Cart
  }
}

export interface SaveOrderResponse {
  data: {
    order: Order
  }
}

export interface MinimumOrderResponse {
  data: {
    status: boolean
    message: string
  }
}

class CheckoutService {
  async saveAddress(addressData: CheckoutAddressRequest): Promise<SaveAddressResponse['data']> {
    const response = await bagistoClient.post<CheckoutAddressRequest, SaveAddressResponse>(
      ENDPOINTS.CHECKOUT.SAVE_ADDRESS,
      addressData
    )
    return response.data
  }

  async saveShipping(shippingData: CheckoutShippingRequest): Promise<SaveShippingResponse['data']> {
    const response = await bagistoClient.post<CheckoutShippingRequest, SaveShippingResponse>(
      ENDPOINTS.CHECKOUT.SAVE_SHIPPING,
      shippingData
    )
    return response.data
  }

  async savePayment(paymentData: CheckoutPaymentRequest): Promise<SavePaymentResponse['data']> {
    const response = await bagistoClient.post<CheckoutPaymentRequest, SavePaymentResponse>(
      ENDPOINTS.CHECKOUT.SAVE_PAYMENT,
      paymentData
    )
    return response.data
  }

  async saveOrder(): Promise<Order> {
    const response = await bagistoClient.post<undefined, SaveOrderResponse>(
      ENDPOINTS.CHECKOUT.SAVE_ORDER
    )
    return response.data.order
  }

  async checkMinimumOrder(): Promise<MinimumOrderResponse['data']> {
    const response = await bagistoClient.get<MinimumOrderResponse>(
      ENDPOINTS.CHECKOUT.CHECK_MINIMUM_ORDER
    )
    return response.data
  }
}

export const checkoutService = new CheckoutService()
