import { bagistoClient } from '../bagisto'
import { ENDPOINTS } from '../endpoints'
import type { Category } from '../bagisto.types'

export interface CategoriesListParams {
  page?: number
  limit?: number
  parent_id?: number | string
}

export interface CategoriesListResponse {
  data: Category[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface CategoryDetailResponse {
  data: Category
}

export interface DescendantCategoriesResponse {
  data: Category[]
}

class CategoriesService {
  async getList(params: CategoriesListParams = {}): Promise<CategoriesListResponse> {
    const queryParams: Record<string, string | number> = {}

    if (params.page) queryParams.page = params.page
    if (params.limit) queryParams.limit = params.limit
    if (params.parent_id) queryParams.parent_id = params.parent_id

    const response = await bagistoClient.get<CategoriesListResponse>(
      ENDPOINTS.CATEGORIES.LIST,
      { params: queryParams }
    )

    return response
  }

  async getById(id: number | string): Promise<Category> {
    const response = await bagistoClient.get<CategoryDetailResponse>(
      ENDPOINTS.CATEGORIES.DETAIL(id)
    )
    return response.data
  }

  async getDescendants(parentId?: number | string): Promise<Category[]> {
    const params: Record<string, string | number> = {}
    if (parentId) params.parent_id = parentId

    const response = await bagistoClient.get<DescendantCategoriesResponse>(
      ENDPOINTS.CATEGORIES.DESCENDANTS,
      { params }
    )

    return response.data
  }

  async getRootCategories(): Promise<Category[]> {
    const response = await this.getList({ parent_id: 1 })
    return response.data
  }

  async getTree(): Promise<Category[]> {
    return this.getDescendants()
  }
}

export const categoriesService = new CategoriesService()
