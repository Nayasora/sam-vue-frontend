import { bagistoClient } from '../bagisto'
import { ENDPOINTS } from '../endpoints'

export interface AttributeOption {
  id: number
  admin_name: string
  label: string
  swatch_value: string | null
  sort_order?: number
}

export interface Attribute {
  id: number
  code: string
  type: string
  name: string
  swatch_type: string | null
  options: AttributeOption[]
  created_at?: string
  updated_at?: string
}

export interface AttributesListResponse {
  data: Attribute[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

export interface AttributeDetailResponse {
  data: Attribute
}

class AttributesService {
  async getList(params: { limit?: number; page?: number } = {}): Promise<Attribute[]> {
    try {
      const queryParams: Record<string, string | number> = {}
      if (params.limit) queryParams.limit = params.limit
      if (params.page) queryParams.page = params.page

      const response = await bagistoClient.get<AttributesListResponse>(
        ENDPOINTS.ATTRIBUTES.LIST,
        { params: queryParams }
      )
      return response.data
    } catch (error) {
      console.error('Error fetching attributes:', error)
      return []
    }
  }

  async getById(id: number | string): Promise<Attribute | null> {
    try {
      const response = await bagistoClient.get<AttributeDetailResponse>(
        ENDPOINTS.ATTRIBUTES.DETAIL(id)
      )
      return response.data
    } catch (error) {
      console.error('Error fetching attribute:', error)
      return null
    }
  }

  async getByCode(code: string): Promise<Attribute | null> {
    try {
      const attributes = await this.getList({ limit: 100 })
      return attributes.find(attr => attr.code === code) || null
    } catch (error) {
      console.error('Error fetching attribute by code:', error)
      return null
    }
  }

  async getBrands(): Promise<AttributeOption[]> {
    try {
      const brandAttribute = await this.getById(25)
      if (brandAttribute && brandAttribute.options) {
        return brandAttribute.options
      }
      return []
    } catch (error) {
      console.error('Error fetching brands:', error)
      return []
    }
  }
}

export const attributesService = new AttributesService()
