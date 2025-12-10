export { useProductsStore } from './store/products.store'
export { useCategoriesStore } from './store/categories.store'
export { productsService } from '@common/api/services/products.service'
export { categoriesService } from '@common/api/services/categories.service'
export type {
  ProductsListParams,
  ProductsListResponse,
  ProductAdditionalInfo,
  ProductConfigurableConfig
} from '@common/api/services/products.service'
export type {
  CategoriesListParams,
  CategoriesListResponse
} from '@common/api/services/categories.service'
