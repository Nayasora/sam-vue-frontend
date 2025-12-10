export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/customer/login',
    REGISTER: '/customer/register',
    LOGOUT: '/customer/logout',
    FORGOT_PASSWORD: '/customer/forgot-password',
    PROFILE: '/customer/get',
    UPDATE_PROFILE: '/customer/profile'
  },

  PRODUCTS: {
    LIST: '/products',
    DETAIL: (id: number | string) => `/products/${id}`,
    ADDITIONAL_INFO: (id: number | string) => `/product-additional-information/${id}`,
    CONFIGURABLE_CONFIG: (id: number | string) => `/product-configurable-config/${id}`
  },

  CATEGORIES: {
    LIST: '/categories',
    DETAIL: (id: number | string) => `/categories/${id}`,
    DESCENDANTS: '/descendant-categories'
  },

  ATTRIBUTES: {
    LIST: '/attributes',
    DETAIL: (id: number | string) => `/attributes/${id}`
  },

  ATTRIBUTE_FAMILIES: {
    LIST: '/families',
    DETAIL: (id: number | string) => `/families/${id}`
  },

  REVIEWS: {
    LIST: '/reviews',
    DETAIL: (id: number | string) => `/reviews/${id}`,
    CREATE: (productId: number | string) => `/reviews/${productId}/create`,
    DELETE: (id: number | string) => `/reviews/${id}`
  },

  CART: {
    GET: '/checkout/cart',
    ADD: (productId: number | string) => `/checkout/cart/add/${productId}`,
    UPDATE: '/checkout/cart/update',
    REMOVE_ITEM: (cartItemId: number | string) => `/checkout/cart/remove-item/${cartItemId}`,
    CLEAR: '/checkout/cart/empty',
    MOVE_TO_WISHLIST: (cartItemId: number | string) => `/checkout/cart/move-to-wishlist/${cartItemId}`,
    APPLY_COUPON: '/checkout/cart/coupon',
    REMOVE_COUPON: '/checkout/cart/coupon'
  },

  CHECKOUT: {
    SAVE_ADDRESS: '/checkout/save-address',
    SAVE_SHIPPING: '/checkout/save-shipping',
    SAVE_PAYMENT: '/checkout/save-payment',
    SAVE_ORDER: '/checkout/save-order',
    CHECK_MINIMUM_ORDER: '/checkout/check-minimum-order'
  },

  CUSTOMER: {
    DETAIL: (id: number | string) => `/customers/${id}`,
    ADDRESSES: {
      LIST: '/addresses',
      DETAIL: (id: number | string) => `/addresses/${id}`,
      CREATE: '/addresses/create',
      UPDATE: (id: number | string) => `/addresses/${id}`,
      DELETE: (id: number | string) => `/addresses/${id}`
    },
    ORDERS: {
      LIST: '/orders',
      DETAIL: (id: number | string) => `/orders/${id}`,
      CANCEL: (id: number | string) => `/orders/${id}/cancel`
    },
    INVOICES: {
      LIST: '/invoices',
      DETAIL: (id: number | string) => `/invoices/${id}`
    },
    SHIPMENTS: {
      LIST: '/shipments',
      DETAIL: (id: number | string) => `/shipments/${id}`
    },
    TRANSACTIONS: {
      LIST: '/transactions',
      DETAIL: (id: number | string) => `/transactions/${id}`
    },
    WISHLIST: {
      LIST: '/wishlist',
      ADD: (productId: number | string) => `/wishlist/add/${productId}`,
      DELETE: (id: number | string) => `/wishlist/${id}`,
      MOVE_TO_CART: (id: number | string) => `/move-to-cart/${id}`
    }
  },

  CORE: {
    CONFIG: '/config',
    SWITCH_CURRENCY: '/switch-currency',
    SWITCH_LOCALE: '/switch-locale',
    LOCALES: '/locales',
    CURRENCIES: '/currencies',
    COUNTRIES: '/countries',
    COUNTRY_STATES: '/country-states',
    CHANNELS: '/channels',
    SLIDERS: '/sliders',
    CITIES: '/cities',
    CITIES_DEFAULT: '/cities/default'
  }
} as const
