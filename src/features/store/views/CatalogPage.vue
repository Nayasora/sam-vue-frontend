<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { SlidersHorizontal, X } from 'lucide-vue-next'
import { useProductsStore, useCategoriesStore } from '@common/catalog'
import { ProductCard } from '../components'
import { mapApiProductsToLocal } from '../utils/product-mapper'
import { attributesService, type AttributeOption } from '@common/api/services/attributes.service'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const productsStore = useProductsStore()
const categoriesStore = useCategoriesStore()

const showMobileFilters = ref(false)
const priceFrom = ref('')
const priceTo = ref('')
const inStockOnly = ref(false)
const selectedBrands = ref<string[]>([])
const selectedFormFactors = ref<string[]>([])

const categorySlug = computed(() => route.params.category as string | undefined)
const searchQuery = computed(() => route.query.q as string | undefined)
const brandFilter = computed(() => route.query.brand as string | undefined)
const currentPage = computed(() => Number(route.query.page) || 1)

const products = computed(() => mapApiProductsToLocal(productsStore.products))
const loading = computed(() => productsStore.loading)
const pagination = computed(() => productsStore.pagination)

const categories = computed(() => categoriesStore.categories)

const currentCategory = computed(() => {
  if (!categorySlug.value) return null
  return categories.value.find(c => c.slug === categorySlug.value)
})

const selectedBrandName = computed(() => {
  if (!brandFilter.value) return null
  const brand = brands.value.find(b => String(b.id) === brandFilter.value)
  return brand?.name || null
})

const pageTitle = computed(() => {
  if (searchQuery.value) return `${t('catalog.searchResults')}: "${searchQuery.value}"`
  if (selectedBrandName.value) return selectedBrandName.value
  if (currentCategory.value) return currentCategory.value.name
  return t('catalog.allProducts')
})

const apiBrands = ref<AttributeOption[]>([])

const brands = computed(() => {
  if (apiBrands.value.length > 0) {
    return apiBrands.value.map(b => ({
      id: b.id,
      name: b.label || b.admin_name
    }))
  }
  return [
    { id: 'dell', name: 'DELL' },
    { id: 'hp', name: 'HP' },
    { id: 'ibm', name: 'IBM' },
    { id: 'lenovo', name: 'Lenovo' },
    { id: 'cisco', name: 'Cisco' },
    { id: 'brocade', name: 'BROCADE' },
  ]
})

const formFactors = [
  { id: 'power', name: 'Power' },
  { id: '1u-rack', name: '1U Rack' },
  { id: '2u-rack', name: '2U Rack' },
]

async function loadBrands() {
  try {
    apiBrands.value = await attributesService.getBrands()
  } catch (error) {
    console.error('Error loading brands:', error)
  }
}

async function loadProducts() {
  const params: Record<string, any> = {
    page: currentPage.value,
    limit: 12
  }

  if (brandFilter.value) {
    params.brand = brandFilter.value
  }

  if (selectedBrands.value.length > 0 && !brandFilter.value) {
    params.brand = selectedBrands.value.join(',')
  }

  if (searchQuery.value) {
    await productsStore.searchProducts(searchQuery.value, params)
  } else if (currentCategory.value) {
    await productsStore.fetchByCategory(currentCategory.value.id, params)
  } else {
    await productsStore.fetchProducts(params)
  }
}

function goToPage(page: number) {
  router.push({
    query: { ...route.query, page: page > 1 ? page : undefined }
  })
}

function toggleBrand(brandId: string | number) {
  const id = String(brandId)
  const index = selectedBrands.value.indexOf(id)
  if (index > -1) {
    selectedBrands.value.splice(index, 1)
  } else {
    selectedBrands.value.push(id)
  }
  updateBrandFilter()
}

function updateBrandFilter() {
  if (selectedBrands.value.length === 1) {
    router.push({ query: { ...route.query, brand: selectedBrands.value[0] } })
  } else if (selectedBrands.value.length === 0) {
    const { brand, ...rest } = route.query
    router.push({ query: rest })
  }
}

function toggleFormFactor(factorId: string) {
  const index = selectedFormFactors.value.indexOf(factorId)
  if (index > -1) {
    selectedFormFactors.value.splice(index, 1)
  } else {
    selectedFormFactors.value.push(factorId)
  }
}

onMounted(async () => {
  await Promise.all([
    categoriesStore.fetchCategories(),
    loadBrands()
  ])

  if (brandFilter.value) {
    selectedBrands.value = [brandFilter.value]
  }

  await loadProducts()
})

watch([categorySlug, searchQuery, currentPage, brandFilter], () => {
  if (brandFilter.value) {
    selectedBrands.value = [brandFilter.value]
  }
  loadProducts()
})
</script>

<template>
  <div class="min-h-screen bg-[#f5f5f5]">
    <div class="mx-auto max-w-[1440px] px-12 py-12">
      <div class="flex gap-6">
        <aside class="hidden w-[253px] flex-shrink-0 lg:block">
          <div class="rounded-md bg-white">
            <div class="p-4">
              <h2 class="text-xl font-semibold leading-7 text-[rgba(0,0,0,0.88)]">{{ $t('catalog.filter') }}</h2>
            </div>

            <div class="mx-4 h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div class="p-4">
              <p class="mb-4 text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ $t('catalog.price') }}</p>
              <div class="flex items-center gap-2">
                <input
                  v-model="priceFrom"
                  type="text"
                  :placeholder="$t('catalog.priceFrom')"
                  class="h-8 w-full rounded-md border border-[rgba(0,0,0,0.15)] bg-white px-3 text-sm outline-none focus:border-[#1677ff]"
                />
                <span class="text-sm text-[rgba(0,0,0,0.45)]">-</span>
                <input
                  v-model="priceTo"
                  type="text"
                  :placeholder="$t('catalog.priceTo')"
                  class="h-8 w-full rounded-md border border-[rgba(0,0,0,0.15)] bg-white px-3 text-sm outline-none focus:border-[#1677ff]"
                />
              </div>
            </div>

            <div class="mx-4 h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div class="flex items-center gap-2 p-4">
              <button
                class="relative h-[22px] w-11 rounded-full transition-colors"
                :class="inStockOnly ? 'bg-[#1677ff]' : 'bg-[rgba(0,0,0,0.25)]'"
                @click="inStockOnly = !inStockOnly"
              >
                <span
                  class="absolute top-[2px] size-[18px] rounded-full bg-white shadow transition-all"
                  :class="inStockOnly ? 'left-[22px]' : 'left-[2px]'"
                ></span>
              </button>
              <span class="text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ $t('catalog.inStock') }}</span>
            </div>

            <div class="mx-4 h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div class="p-4">
              <p class="mb-4 text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ $t('catalog.brand') }}</p>
              <div class="flex flex-col gap-2">
                <label
                  v-for="brand in brands"
                  :key="brand.id"
                  class="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    :checked="selectedBrands.includes(String(brand.id))"
                    class="size-4 cursor-pointer accent-[#1677ff]"
                    @change="toggleBrand(brand.id)"
                  />
                  <span class="text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ brand.name }}</span>
                </label>
              </div>
            </div>

            <div class="mx-4 h-px bg-[rgba(0,0,0,0.06)]"></div>

            <div class="p-4">
              <p class="mb-4 text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ $t('catalog.formFactor') }}</p>
              <div class="flex flex-col gap-2">
                <label
                  v-for="factor in formFactors"
                  :key="factor.id"
                  class="flex cursor-pointer items-center gap-2"
                >
                  <input
                    type="checkbox"
                    :checked="selectedFormFactors.includes(factor.id)"
                    class="size-4 cursor-pointer accent-[#1677ff]"
                    @change="toggleFormFactor(factor.id)"
                  />
                  <span class="text-sm leading-[22px] text-[rgba(0,0,0,0.88)]">{{ factor.name }}</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        <div class="flex-1">
          <div class="mb-6 flex items-center justify-between lg:hidden">
            <h1 class="text-xl font-semibold text-[rgba(0,0,0,0.88)]">{{ pageTitle }}</h1>
            <button
              class="flex items-center gap-2 rounded-lg border border-[rgba(0,0,0,0.15)] bg-white px-4 py-2 text-sm"
              @click="showMobileFilters = true"
            >
              <SlidersHorizontal :size="18" />
              {{ $t('catalog.filter') }}
            </button>
          </div>

          <div v-if="loading" class="flex items-center justify-center py-20">
            <div class="size-12 animate-spin rounded-full border-4 border-[#1677ff] border-t-transparent"></div>
          </div>

          <div v-else-if="products.length === 0" class="py-20 text-center">
            <p class="text-xl text-[rgba(0,0,0,0.45)]">{{ $t('catalog.noProducts') }}</p>
          </div>

          <template v-else>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <ProductCard
                v-for="product in products"
                :key="product.id"
                :product="product"
              />
            </div>

            <div v-if="pagination.lastPage > 1" class="mt-8 flex items-center justify-center gap-2">
              <button
                class="rounded-lg border border-[rgba(0,0,0,0.15)] bg-white px-4 py-2 text-sm text-[rgba(0,0,0,0.88)] transition-colors hover:border-[#1677ff] disabled:opacity-50"
                :disabled="currentPage <= 1"
                @click="goToPage(currentPage - 1)"
              >
                {{ $t('common.prev') }}
              </button>

              <template v-for="page in pagination.lastPage" :key="page">
                <button
                  v-if="page === 1 || page === pagination.lastPage || (page >= currentPage - 1 && page <= currentPage + 1)"
                  class="rounded-lg border px-4 py-2 text-sm transition-colors"
                  :class="page === currentPage
                    ? 'border-[#1677ff] bg-[#1677ff] text-white'
                    : 'border-[rgba(0,0,0,0.15)] bg-white text-[rgba(0,0,0,0.88)] hover:border-[#1677ff]'"
                  @click="goToPage(page)"
                >
                  {{ page }}
                </button>
                <span
                  v-else-if="page === currentPage - 2 || page === currentPage + 2"
                  class="px-2 text-[rgba(0,0,0,0.45)]"
                >...</span>
              </template>

              <button
                class="rounded-lg border border-[rgba(0,0,0,0.15)] bg-white px-4 py-2 text-sm text-[rgba(0,0,0,0.88)] transition-colors hover:border-[#1677ff] disabled:opacity-50"
                :disabled="currentPage >= pagination.lastPage"
                @click="goToPage(currentPage + 1)"
              >
                {{ $t('common.next') }}
              </button>
            </div>
          </template>
        </div>
      </div>
    </div>

    <Teleport to="body">
      <div
        v-if="showMobileFilters"
        class="fixed inset-0 z-50 lg:hidden"
      >
        <div class="absolute inset-0 bg-black/50" @click="showMobileFilters = false"></div>
        <div class="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto rounded-t-2xl bg-white p-6">
          <div class="mb-4 flex items-center justify-between">
            <h3 class="text-lg font-semibold">{{ $t('catalog.filter') }}</h3>
            <button class="text-[rgba(0,0,0,0.45)]" @click="showMobileFilters = false">
              <X :size="24" />
            </button>
          </div>

          <div class="mb-4">
            <p class="mb-3 text-sm font-medium text-[rgba(0,0,0,0.88)]">{{ $t('catalog.price') }}</p>
            <div class="flex items-center gap-2">
              <input
                v-model="priceFrom"
                type="text"
                :placeholder="$t('catalog.priceFrom')"
                class="h-10 w-full rounded-md border border-[rgba(0,0,0,0.15)] bg-white px-3 text-sm outline-none focus:border-[#1677ff]"
              />
              <span class="text-[rgba(0,0,0,0.45)]">-</span>
              <input
                v-model="priceTo"
                type="text"
                :placeholder="$t('catalog.priceTo')"
                class="h-10 w-full rounded-md border border-[rgba(0,0,0,0.15)] bg-white px-3 text-sm outline-none focus:border-[#1677ff]"
              />
            </div>
          </div>

          <div class="mb-4 flex items-center gap-2">
            <button
              class="relative h-6 w-12 rounded-full transition-colors"
              :class="inStockOnly ? 'bg-[#1677ff]' : 'bg-[rgba(0,0,0,0.25)]'"
              @click="inStockOnly = !inStockOnly"
            >
              <span
                class="absolute top-1 size-4 rounded-full bg-white shadow transition-all"
                :class="inStockOnly ? 'left-7' : 'left-1'"
              ></span>
            </button>
            <span class="text-sm text-[rgba(0,0,0,0.88)]">{{ $t('catalog.inStock') }}</span>
          </div>

          <div class="mb-4">
            <p class="mb-3 text-sm font-medium text-[rgba(0,0,0,0.88)]">{{ $t('catalog.brand') }}</p>
            <div class="flex flex-col gap-3">
              <label
                v-for="brand in brands"
                :key="brand.id"
                class="flex cursor-pointer items-center gap-2"
              >
                <input
                  type="checkbox"
                  :checked="selectedBrands.includes(String(brand.id))"
                  class="size-5 cursor-pointer accent-[#1677ff]"
                  @change="toggleBrand(brand.id)"
                />
                <span class="text-sm text-[rgba(0,0,0,0.88)]">{{ brand.name }}</span>
              </label>
            </div>
          </div>

          <button
            class="mt-4 h-10 w-full rounded-lg bg-[#1677ff] text-white"
            @click="showMobileFilters = false"
          >
            {{ $t('catalog.applyFilters') }}
          </button>
        </div>
      </div>
    </Teleport>
  </div>
</template>
