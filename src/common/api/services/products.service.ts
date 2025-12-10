import { bagistoClient } from '../bagisto'
import { ENDPOINTS } from '../endpoints'
import type { Product } from '../bagisto.types'

export interface ProductsListParams {
  page?: number
  limit?: number
  category_id?: number | string
  search?: string
  sort?: string
  order?: 'asc' | 'desc'
  new?: boolean
  featured?: boolean
  brand?: string | number
}

export interface ProductsListResponse {
  data: Product[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
  links?: {
    first: string
    last: string
    prev: string | null
    next: string | null
  }
}

export interface ProductDetailResponse {
  data: Product
}

export interface ProductAdditionalInfo {
  id: number
  code: string
  label: string
  value: string | string[]
  admin_name: string
}

export interface ProductConfigurableConfig {
  attributes: Array<{
    id: number
    code: string
    label: string
    options: Array<{
      id: number
      label: string
      products: number[]
    }>
  }>
  variant_prices: Record<string, {
    regular_price: { price: number; formatted_price: string }
    final_price: { price: number; formatted_price: string }
  }>
  variant_images: Record<string, string[]>
}

class ProductsService {
  async getList(params: ProductsListParams = {}): Promise<ProductsListResponse> {
    const queryParams: Record<string, string | number | boolean> = {}

    if (params.page) queryParams.page = params.page
    if (params.limit) queryParams.limit = params.limit
    if (params.category_id) queryParams.category_id = params.category_id
    if (params.search) queryParams.search = params.search
    if (params.sort) queryParams.sort = params.sort
    if (params.order) queryParams.order = params.order
    if (params.new) queryParams.new = 1
    if (params.featured) queryParams.featured = 1
    if (params.brand) queryParams['attribute_25'] = params.brand

    const response = await bagistoClient.get<ProductsListResponse>(
      ENDPOINTS.PRODUCTS.LIST,
      { params: queryParams }
    )

    return response
  }

  async getById(id: number | string): Promise<Product> {
    const response = await bagistoClient.get<ProductDetailResponse>(
      ENDPOINTS.PRODUCTS.DETAIL(id)
    )
    return response.data
  }

  async getAdditionalInfo(id: number | string): Promise<ProductAdditionalInfo[]> {
    const response = await bagistoClient.get<{ data: ProductAdditionalInfo[] }>(
      ENDPOINTS.PRODUCTS.ADDITIONAL_INFO(id)
    )
    return response.data
  }

  async getConfigurableConfig(id: number | string): Promise<ProductConfigurableConfig> {
    const response = await bagistoClient.get<{ data: ProductConfigurableConfig }>(
      ENDPOINTS.PRODUCTS.CONFIGURABLE_CONFIG(id)
    )
    return response.data
  }

  async getFeatured(limit: number = 8): Promise<Product[]> {
    const response = await this.getList({ featured: true, limit })
    return response.data
  }

  async getNew(limit: number = 8): Promise<Product[]> {
    const response = await this.getList({ new: true, limit })
    return response.data
  }

  async getByCategory(categoryId: number | string, params: ProductsListParams = {}): Promise<ProductsListResponse> {
    return this.getList({ ...params, category_id: categoryId })
  }

  async search(query: string, params: ProductsListParams = {}): Promise<ProductsListResponse> {
    return this.getList({ ...params, search: query })
  }
}

export const productsService = new ProductsService()
