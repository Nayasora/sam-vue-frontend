import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { citiesService, type City } from '@common/api/services/cities.service'

const STORAGE_KEY = 'sam_selected_city'

export const useCityStore = defineStore('city', () => {
  const cities = ref<City[]>([])
  const selectedCityId = ref<number | null>(null)
  const loading = ref(false)

  const selectedCity = computed(() => {
    if (!selectedCityId.value) return null
    return cities.value.find(c => c.id === selectedCityId.value) || null
  })

  const selectedCityName = computed(() => {
    return selectedCity.value?.name || ''
  })

  function loadFromStorage(): number | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return parseInt(stored, 10)
      }
    } catch (e) {
      console.error('Error reading city from storage:', e)
    }
    return null
  }

  function saveToStorage(cityId: number | null) {
    try {
      if (cityId) {
        localStorage.setItem(STORAGE_KEY, String(cityId))
      } else {
        localStorage.removeItem(STORAGE_KEY)
      }
    } catch (e) {
      console.error('Error saving city to storage:', e)
    }
  }

  async function fetchCities() {
    loading.value = true
    try {
      cities.value = await citiesService.getList()

      const storedCityId = loadFromStorage()
      if (storedCityId && cities.value.some(c => c.id === storedCityId)) {
        selectedCityId.value = storedCityId
      } else {
        const defaultCity = cities.value.find(c => c.is_default)
        if (defaultCity) {
          selectedCityId.value = defaultCity.id
        } else {
          const firstCity = cities.value[0]
          if (firstCity) {
            selectedCityId.value = firstCity.id
          }
        }
      }
    } catch (error) {
      console.error('Error fetching cities:', error)
    } finally {
      loading.value = false
    }
  }

  function selectCity(cityId: number) {
    selectedCityId.value = cityId
    saveToStorage(cityId)
  }

  watch(selectedCityId, (newId) => {
    if (newId) {
      saveToStorage(newId)
    }
  })

  return {
    cities,
    selectedCityId,
    selectedCity,
    selectedCityName,
    loading,
    fetchCities,
    selectCity
  }
})
