import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { categoriesService } from '@common/api/services/categories.service'
import type { Category } from '@common/api/bagisto.types'

export const useCategoriesStore = defineStore('categories', () => {
  const categories = ref<Category[]>([])
  const rootCategories = ref<Category[]>([])
  const currentCategory = ref<Category | null>(null)
  const loading = ref(false)
  const error = ref<string | null>(null)

  const categoryTree = computed(() => {
    return buildTree(categories.value)
  })

  function buildTree(items: Category[], parentId: number | null = null): Category[] {
    return items
      .filter(item => {
        if (parentId === null) {
          return !item.parent_id || item.parent_id === 1
        }
        return item.parent_id === parentId
      })
      .map(item => ({
        ...item,
        children: buildTree(items, item.id)
      }))
  }

  async function fetchCategories(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      const response = await categoriesService.getList({ limit: 100 })
      categories.value = response.data
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки категорий'
    } finally {
      loading.value = false
    }
  }

  async function fetchRootCategories(): Promise<void> {
    loading.value = true
    error.value = null

    try {
      rootCategories.value = await categoriesService.getRootCategories()
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки категорий'
    } finally {
      loading.value = false
    }
  }

  async function fetchCategoryById(id: number | string): Promise<Category | null> {
    loading.value = true
    error.value = null

    try {
      currentCategory.value = await categoriesService.getById(id)
      return currentCategory.value
    } catch (err: any) {
      error.value = err.message || 'Ошибка загрузки категории'
      return null
    } finally {
      loading.value = false
    }
  }

  async function fetchDescendants(parentId?: number | string): Promise<Category[]> {
    try {
      return await categoriesService.getDescendants(parentId)
    } catch (err: any) {
      console.error('Error fetching descendants:', err)
      return []
    }
  }

  function getCategoryById(id: number): Category | undefined {
    return categories.value.find(c => c.id === id)
  }

  function clearCurrentCategory(): void {
    currentCategory.value = null
  }

  function clearError(): void {
    error.value = null
  }

  return {
    categories,
    rootCategories,
    currentCategory,
    categoryTree,
    loading,
    error,
    fetchCategories,
    fetchRootCategories,
    fetchCategoryById,
    fetchDescendants,
    getCategoryById,
    clearCurrentCategory,
    clearError
  }
})
