export interface BagistoResponse<T> {
  data: T
  message?: string
}

export interface BagistoPaginatedResponse<T> {
  data: T[]
  links: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
  meta: {
    current_page: number
    from: number
    last_page: number
    path: string
    per_page: number
    to: number
    total: number
  }
}

export interface LoginResponse {
  data: Customer
  message: string
  token: string
}

export interface Customer {
  id: number
  email: string
  first_name: string
  last_name: string
  name: string
  gender: string | null
  date_of_birth: string | null
  phone: string | null
  image_url: string | null
  status: boolean
  is_verified: boolean
  subscribed_to_news_letter: boolean
  created_at: string
  updated_at: string
}

export interface LoginRequest {
  email: string
  password: string
  device_name?: string
}

export interface RegisterRequest {
  first_name: string
  last_name: string
  email: string
  password: string
  password_confirmation: string
}

export interface Product {
  id: number
  sku: string
  type: ProductType
  name: string
  url_key: string
  price: number
  formatted_price: string
  short_description: string
  description: string
  images: ProductImage[]
  base_image: ProductImage
  videos: ProductVideo[]
  in_stock: boolean
  is_saved: boolean
  is_new: boolean
  is_featured: boolean
  special_price: number | null
  formatted_special_price: string | null
  special_price_from: string | null
  special_price_to: string | null
  reviews: {
    total: number
    total_rating: number
    average_rating: number
  }
  categories: Category[]
  super_attributes?: SuperAttribute[]
  variants?: ProductVariant[]
}

export type ProductType =
  | 'simple'
  | 'configurable'
  | 'bundle'
  | 'grouped'
  | 'downloadable'
  | 'virtual'
  | 'booking'

export interface ProductImage {
  id: number
  path: string
  url: string
  original_image_url: string
  small_image_url: string
  medium_image_url: string
  large_image_url: string
}

export interface ProductVideo {
  id: number
  type: string
  url: string
}

export interface SuperAttribute {
  id: number
  code: string
  label: string
  swatch_type: string | null
  options: AttributeOption[]
}

export interface AttributeOption {
  id: number
  label: string
  swatch_value: string | null
  products: number[]
}

export interface ProductVariant {
  id: number
  sku: string
  name: string
  price: number
  formatted_price: string
  in_stock: boolean
  images: ProductImage[]
}

export interface Category {
  id: number
  name: string
  slug: string
  description: string | null
  image_url: string | null
  meta_title: string | null
  meta_description: string | null
  meta_keywords: string | null
  position: number
  status: boolean
  display_mode: string
  parent_id: number | null
  children?: Category[]
  category_icon_path: string | null
}

export interface Cart {
  id: number
  customer_email: string | null
  customer_first_name: string | null
  customer_last_name: string | null
  shipping_method: string | null
  coupon_code: string | null
  is_gift: boolean
  items_count: number
  items_qty: number
  base_currency_code: string
  channel_currency_code: string
  cart_currency_code: string
  grand_total: number
  formatted_grand_total: string
  base_grand_total: number
  formatted_base_grand_total: string
  sub_total: number
  formatted_sub_total: string
  base_sub_total: number
  formatted_base_sub_total: string
  tax_total: number
  formatted_tax_total: string
  base_tax_total: number
  formatted_base_tax_total: string
  discount_amount: number
  formatted_discount_amount: string
  base_discount_amount: number
  formatted_base_discount_amount: string
  items: CartItem[]
  billing_address: Address | null
  shipping_address: Address | null
  selected_shipping_rate: ShippingRate | null
  payment: Payment | null
}

export interface CartItem {
  id: number
  quantity: number
  sku: string
  type: string
  name: string
  coupon_code: string | null
  weight: number
  total_weight: number
  base_total_weight: number
  price: number
  formatted_price: string
  base_price: number
  formatted_base_price: string
  total: number
  formatted_total: string
  base_total: number
  formatted_base_total: string
  tax_percent: number
  tax_amount: number
  formatted_tax_amount: string
  base_tax_amount: number
  formatted_base_tax_amount: string
  discount_percent: number
  discount_amount: number
  formatted_discount_amount: string
  base_discount_amount: number
  formatted_base_discount_amount: string
  product_id: number
  product: Product
  additional: Record<string, unknown>
}

export interface Address {
  id?: number
  customer_id?: number
  first_name: string
  last_name: string
  email: string
  company_name?: string
  vat_id?: string
  address1: string[]
  address2?: string
  city: string
  state: string
  country: string
  postcode: string
  phone: string
  is_default?: boolean
  default_address?: boolean
}

export interface ShippingMethod {
  method: string
  method_title: string
  rates: ShippingRate[]
}

export interface ShippingRate {
  carrier: string
  carrier_title: string
  method: string
  method_title: string
  method_description: string
  price: number
  formatted_price: string
  base_price: number
  formatted_base_price: string
}

export interface PaymentMethod {
  method: string
  method_title: string
  description: string
  sort: number
}

export interface Payment {
  id: number
  method: string
  method_title: string
}

export interface Order {
  id: number
  increment_id: string
  status: string
  status_label: string
  channel_name: string
  is_guest: boolean
  customer_email: string
  customer_first_name: string
  customer_last_name: string
  shipping_method: string
  shipping_title: string
  shipping_description: string
  coupon_code: string | null
  is_gift: boolean
  total_item_count: number
  total_qty_ordered: number
  base_currency_code: string
  channel_currency_code: string
  order_currency_code: string
  grand_total: number
  formatted_grand_total: string
  base_grand_total: number
  formatted_base_grand_total: string
  sub_total: number
  formatted_sub_total: string
  base_sub_total: number
  formatted_base_sub_total: string
  tax_amount: number
  formatted_tax_amount: string
  base_tax_amount: number
  formatted_base_tax_amount: string
  discount_amount: number
  formatted_discount_amount: string
  base_discount_amount: number
  formatted_base_discount_amount: string
  shipping_amount: number
  formatted_shipping_amount: string
  base_shipping_amount: number
  formatted_base_shipping_amount: string
  shipping_address: Address
  billing_address: Address
  items: OrderItem[]
  invoices: Invoice[]
  shipments: Shipment[]
  payment: OrderPayment
  created_at: string
  updated_at: string
}

export interface OrderItem {
  id: number
  sku: string
  type: string
  name: string
  coupon_code: string | null
  weight: number
  total_weight: number
  qty_ordered: number
  qty_shipped: number
  qty_invoiced: number
  qty_canceled: number
  qty_refunded: number
  price: number
  formatted_price: string
  base_price: number
  formatted_base_price: string
  total: number
  formatted_total: string
  base_total: number
  formatted_base_total: string
  tax_percent: number
  tax_amount: number
  formatted_tax_amount: string
  base_tax_amount: number
  formatted_base_tax_amount: string
  discount_percent: number
  discount_amount: number
  formatted_discount_amount: string
  base_discount_amount: number
  formatted_base_discount_amount: string
  product: Product
  additional: Record<string, unknown>
}

export interface OrderPayment {
  id: number
  method: string
  method_title: string
}

export interface Invoice {
  id: number
  increment_id: string
  state: string
  email_sent: boolean
  total_qty: number
  sub_total: number
  formatted_sub_total: string
  base_sub_total: number
  formatted_base_sub_total: string
  grand_total: number
  formatted_grand_total: string
  base_grand_total: number
  formatted_base_grand_total: string
  shipping_amount: number
  formatted_shipping_amount: string
  base_shipping_amount: number
  formatted_base_shipping_amount: string
  tax_amount: number
  formatted_tax_amount: string
  base_tax_amount: number
  formatted_base_tax_amount: string
  discount_amount: number
  formatted_discount_amount: string
  base_discount_amount: number
  formatted_base_discount_amount: string
  items: InvoiceItem[]
  created_at: string
}

export interface InvoiceItem {
  id: number
  sku: string
  type: string
  name: string
  qty: number
  price: number
  formatted_price: string
  base_price: number
  formatted_base_price: string
  total: number
  formatted_total: string
  base_total: number
  formatted_base_total: string
  tax_amount: number
  formatted_tax_amount: string
  base_tax_amount: number
  formatted_base_tax_amount: string
  discount_amount: number
  formatted_discount_amount: string
  base_discount_amount: number
  formatted_base_discount_amount: string
  product: Product
  additional: Record<string, unknown>
}

export interface Shipment {
  id: number
  status: string | null
  total_qty: number
  total_weight: number
  carrier_code: string | null
  carrier_title: string | null
  track_number: string | null
  email_sent: boolean
  items: ShipmentItem[]
  created_at: string
}

export interface ShipmentItem {
  id: number
  name: string
  sku: string
  qty: number
  weight: number
  price: number
  formatted_price: string
  base_price: number
  formatted_base_price: string
  total: number
  formatted_total: string
  base_total: number
  formatted_base_total: string
  product: Product
  additional: Record<string, unknown>
}

export interface WishlistItem {
  id: number
  product_id: number
  product: Product
  created_at: string
}

export interface Review {
  id: number
  title: string
  rating: number
  comment: string
  status: string
  name: string
  created_at: string
  product: {
    id: number
    name: string
    url_key: string
    images: ProductImage[]
  }
}

export interface ReviewRequest {
  rating: number
  title: string
  comment: string
}

export interface Locale {
  id: number
  code: string
  name: string
  direction: 'ltr' | 'rtl'
  image_url: string | null
}

export interface Currency {
  id: number
  code: string
  name: string
  symbol: string
}

export interface Country {
  id: number
  code: string
  name: string
}

export interface CountryState {
  id: number
  country_code: string
  code: string
  default_name: string
}

export interface Channel {
  id: number
  code: string
  name: string
  description: string | null
  theme: string
  home_page_content: string | null
  footer_content: string | null
  hostname: string | null
  logo_url: string | null
  favicon_url: string | null
  default_locale: Locale
  base_currency: Currency
  root_category: Category
  locales: Locale[]
  currencies: Currency[]
}

export interface ProductFilters {
  page?: number
  limit?: number
  category_id?: number
  sort?: string
  order?: 'asc' | 'desc'
  name?: string
  price?: string
  new?: 1
  featured?: 1
}

export interface AddToCartRequest {
  product_id: number
  quantity: number
  selected_configurable_option?: number
  super_attribute?: Record<string, number>
  bundle_options?: Record<string, number[]>
  bundle_option_qty?: Record<string, number>
  links?: number[]
  qty?: Record<string, number>
  booking?: Record<string, unknown>
}

export interface UpdateCartRequest {
  qty: Record<string, number>
}

export interface CheckoutAddressRequest {
  billing: {
    address1: string[]
    city: string
    state: string
    postcode: string
    country: string
    phone: string
    email: string
    first_name: string
    last_name: string
    company_name?: string
    use_for_shipping?: boolean
    save_as_address?: boolean
  }
  shipping?: {
    address1: string[]
    city: string
    state: string
    postcode: string
    country: string
    phone: string
    email: string
    first_name: string
    last_name: string
    company_name?: string
    save_as_address?: boolean
  }
}

export interface CheckoutShippingRequest {
  shipping_method: string
}

export interface CheckoutPaymentRequest {
  payment: {
    method: string
  }
}
