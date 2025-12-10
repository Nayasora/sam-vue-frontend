import { bagistoClient } from '../bagisto'
import { ENDPOINTS } from '../endpoints'

export interface Slider {
  id: number
  title: string
  path: string
  image_url: string
  content: string
  slider_path?: string
  channel_id?: number
  locale?: string
  expired_at?: string
  sort_order?: number
  created_at?: string
  updated_at?: string
}

export interface SlidersListResponse {
  data: Slider[]
  meta?: {
    current_page: number
    last_page: number
    per_page: number
    total: number
  }
}

class SlidersService {
  async getList(): Promise<Slider[]> {
    try {
      const response = await bagistoClient.get<SlidersListResponse>(
        ENDPOINTS.CORE.SLIDERS
      )
      return response.data
    } catch (error) {
      console.error('Error fetching sliders:', error)
      return []
    }
  }
}

export const slidersService = new SlidersService()
