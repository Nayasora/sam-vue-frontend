import type { Product as ApiProduct } from '@common/api/bagisto.types'
import type { Product as LocalProduct } from '../types'

const DEFAULT_PRODUCT_IMAGE = '/store/images/product-placeholder.png'

function parsePrice(price: string | number | null | undefined): number {
  if (price === null || price === undefined) return 0
  if (typeof price === 'number') return price
  return parseFloat(price) || 0
}

export function mapApiProductToLocal(apiProduct: ApiProduct): LocalProduct {
  const imageUrl = apiProduct.images?.[0]?.url
    || apiProduct.base_image?.medium_image_url
    || DEFAULT_PRODUCT_IMAGE

  const price = parsePrice(apiProduct.price)
  const specialPrice = parsePrice(apiProduct.special_price)
  const hasSpecialPrice = specialPrice > 0 && specialPrice < price

  return {
    id: String(apiProduct.id),
    name: apiProduct.name,
    image: imageUrl,
    price: hasSpecialPrice ? specialPrice : price,
    originalPrice: hasSpecialPrice ? price : undefined,
    link: `/products/${apiProduct.id}`,
    warranty: undefined,
    isBestseller: (apiProduct as any).is_featured || false
  }
}

export function mapApiProductsToLocal(apiProducts: ApiProduct[]): LocalProduct[] {
  return apiProducts.map(mapApiProductToLocal)
}
