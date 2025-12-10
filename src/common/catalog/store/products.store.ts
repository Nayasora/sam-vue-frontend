import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { productsService, type ProductsListParams } from '@common/api/services/products.service'
import type { Product } from '@common/api/bagisto.types'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Product[]>([])
  const featuredProducts = ref<Product[]>([])
  const newProducts = ref<Product[]>([])
  const currentProduct = ref<Product | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const pagination = ref({
    currentPage: 1,
    lastPage: 1,
    perPage: 12,
    total: 0
  })

  const hasMore = computed(() => pagination.value.currentPage < pagination.value.lastPage)

  async function fetchProducts(params: ProductsListParams = {}): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await productsService.getList(params)
      products.value = response.data

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          perPage: response.meta.per_page,
          total: response.meta.total
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки товаров'
    } finally {
      loading.value = false
    }
  }

  async function fetchFeaturedProducts(limit: number = 8): Promise<void> {
    try {
      let products = await productsService.getFeatured(limit)
      if (products.length === 0) {
        const response = await productsService.getList({ limit })
        products = response.data
      }
      featuredProducts.value = products
    } catch (err: any) {
      console.error('Error fetching featured products:', err)
    }
  }

  async function fetchNewProducts(limit: number = 8): Promise<void> {
    try {
      let products = await productsService.getNew(limit)
      if (products.length === 0) {
        const response = await productsService.getList({ limit })
        products = response.data
      }
      newProducts.value = products
    } catch (err: any) {
      console.error('Error fetching new products:', err)
    }
  }

  async function fetchProductById(id: number | string): Promise<Product | null> {
    loading.value = true
    error.value = null

    try {
      currentProduct.value = await productsService.getById(id)
      return currentProduct.value
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки товара'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchByCategory(categoryId: number | string, params: ProductsListParams = {}): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await productsService.getByCategory(categoryId, params)
      products.value = response.data

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          perPage: response.meta.per_page,
          total: response.meta.total
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки товаров категории'
    } finally {
      loading.value = false
    }
  }

  async function searchProducts(query: string, params: ProductsListParams = {}): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await productsService.search(query, params)
      products.value = response.data

      if (response.meta) {
        pagination.value = {
          currentPage: response.meta.current_page,
          lastPage: response.meta.last_page,
          perPage: response.meta.per_page,
          total: response.meta.total
        }
      }
    } catch (err: any) {
      error.value = err.message || 'Ошибка поиска товаров'
    } finally {
      loading.value = false
    }
  }

  function clearCurrentProduct(): void {
    currentProduct.value = null
  }

  function clearError(): void {
    error.value = null
  }

  return {
    products,
    featuredProducts,
    newProducts,
    currentProduct,
    loading,
    error,
    pagination,
    hasMore,
    fetchProducts,
    fetchFeaturedProducts,
    fetchNewProducts,
    fetchProductById,
    fetchByCategory,
    searchProducts,
    clearCurrentProduct,
    clearError
  }
})
