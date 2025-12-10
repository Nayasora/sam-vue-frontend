import { bagistoClient } from '../bagisto'
import { ENDPOINTS } from '../endpoints'

export interface City {
  id: number
  name: string
  code: string
  is_default: boolean
}

export interface CitiesListResponse {
  data: City[]
}

export interface CityDetailResponse {
  data: City | null
}

class CitiesService {
  async getList(): Promise<City[]> {
    try {
      const response = await bagistoClient.get<CitiesListResponse>(
        ENDPOINTS.CORE.CITIES
      )
      return response.data
    } catch (error) {
      console.error('Error fetching cities:', error)
      return []
    }
  }

  async getDefault(): Promise<City | null> {
    try {
      const response = await bagistoClient.get<CityDetailResponse>(
        ENDPOINTS.CORE.CITIES_DEFAULT
      )
      return response.data
    } catch (error) {
      console.error('Error fetching default city:', error)
      return null
    }
  }
}

export const citiesService = new CitiesService()
