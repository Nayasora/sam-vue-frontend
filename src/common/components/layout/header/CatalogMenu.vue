<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ChevronRight } from 'lucide-vue-next'
import { useCategoriesStore } from '@common/catalog'

interface MenuItem {
  id: number
  name: string
  slug: string
  image: string
  children?: { id: number; name: string; slug: string; hasArrow?: boolean }[]
}

interface Props {
  isOpen: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const categoriesStore = useCategoriesStore()
const hoveredCategory = ref<number | null>(1)

const defaultMenuItems: MenuItem[] = [
  {
    id: 1,
    name: 'Серверы',
    slug: 'servers',
    image: '/catalog/5800e5af6705928628bf4b8855b40ad7445d3d1e.png',
    children: [
      { id: 101, name: 'Все сервера', slug: 'servers' },
      { id: 102, name: 'Сервера Lenovo', slug: 'servers-lenovo' },
      { id: 103, name: 'Сервера Dell', slug: 'servers-dell', hasArrow: true },
      { id: 104, name: 'Сервера HP', slug: 'servers-hp', hasArrow: true },
      { id: 105, name: 'Сервера IBM', slug: 'servers-ibm', hasArrow: true },
      { id: 106, name: 'Стоечные сервера (rack)', slug: 'rack-servers' },
      { id: 107, name: 'Power серверы (башенные)', slug: 'tower-servers' },
      { id: 108, name: 'Серверы для 1С', slug: 'servers-1c' },
      { id: 109, name: 'Б/У Серверы', slug: 'used-servers' }
    ]
  },
  {
    id: 2,
    name: 'ИБП',
    slug: 'ups',
    image: '/catalog/c26643e51be38c6e105e515f464f7be54ffb6046.png',
    children: [
      { id: 201, name: 'Все ИБП', slug: 'ups' },
      { id: 202, name: 'ИБП APC', slug: 'ups-apc' },
      { id: 203, name: 'ИБП Eaton', slug: 'ups-eaton' },
      { id: 204, name: 'ИБП Vertiv', slug: 'ups-vertiv' }
    ]
  },
  {
    id: 3,
    name: 'Конфигуратор',
    slug: 'configurator',
    image: '/catalog/e9df1b8a3e3da3ada29fbeadf3cd3cb8495c40c3.png',
    children: []
  },
  {
    id: 4,
    name: 'СХД',
    slug: 'storage',
    image: '/catalog/eaf7ece79bbc58e58c35a0c177db2a6d0c706139.png',
    children: [
      { id: 401, name: 'Все СХД', slug: 'storage' },
      { id: 402, name: 'СХД Dell EMC', slug: 'storage-dell' },
      { id: 403, name: 'СХД HPE', slug: 'storage-hpe' },
      { id: 404, name: 'СХД NetApp', slug: 'storage-netapp' }
    ]
  },
  {
    id: 5,
    name: 'Коммутаторы',
    slug: 'switches',
    image: '/catalog/711e594c888b7442a07d42b260dd0e0e33a055cf.png',
    children: [
      { id: 501, name: 'Все коммутаторы', slug: 'switches' },
      { id: 502, name: 'Cisco', slug: 'switches-cisco' },
      { id: 503, name: 'HPE Aruba', slug: 'switches-aruba' },
      { id: 504, name: 'Juniper', slug: 'switches-juniper' }
    ]
  },
  {
    id: 6,
    name: 'SAM Market',
    slug: 'sam-market',
    image: '/logo.svg',
    children: []
  },
  {
    id: 7,
    name: 'Новости',
    slug: 'news',
    image: '/catalog/news-icon.svg',
    children: []
  },
  {
    id: 8,
    name: 'Контакты',
    slug: 'contacts',
    image: '/catalog/phone-icon.svg',
    children: []
  }
]

const dellConfigurators = [
  { id: 'title', name: 'Конфигуратор DELL', slug: '', isTitle: true },
  { id: 'g17', name: 'DELL G17', slug: 'dell-g17' },
  { id: 'g16', name: 'DELL G16', slug: 'dell-g16' },
  { id: 'g15', name: 'DELL G15', slug: 'dell-g15', isActive: true },
  { id: 'g14', name: 'DELL G14', slug: 'dell-g14' },
  { id: 'g13', name: 'DELL G13', slug: 'dell-g13' },
  { id: 'g12', name: 'DELL G12', slug: 'dell-g12' }
]

function getMenuLink(item: MenuItem): string {
  if (item.slug === 'news') return '/news'
  if (item.slug === 'contacts') return '/contacts'
  if (item.slug === 'configurator') return '/configurator'
  if (item.slug === 'sam-market') return '/'
  return `/catalog/${item.slug}`
}

function getChildLink(child: { slug: string }): string {
  return `/catalog/${child.slug}`
}

const hoveredItem = computed(() => {
  return defaultMenuItems.find(item => item.id === hoveredCategory.value)
})

onMounted(() => {
  if (categoriesStore.categories.length === 0) {
    categoriesStore.fetchCategories()
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="isOpen" class="fixed inset-0 z-40" @click="emit('close')"></div>
    </Transition>

    <Transition name="slide">
      <div
        v-if="isOpen"
        class="fixed left-0 top-[110px] z-50 flex w-full justify-center"
      >
        <div class="mx-auto w-full max-w-[1440px] px-6">
          <div class="flex rounded-xl border-b border-[rgba(0,0,0,0.06)] bg-white p-12 shadow-xl">
            <div class="flex gap-8">
              <div class="flex w-[300px] flex-col gap-4">
                <template v-for="item in defaultMenuItems" :key="item.id">
                  <RouterLink
                    v-if="!item.children || item.children.length === 0"
                    :to="getMenuLink(item)"
                    class="flex items-center gap-3"
                    :class="{ 'text-[#4096ff]': hoveredCategory === item.id }"
                    @mouseenter="hoveredCategory = item.id"
                    @click="emit('close')"
                  >
                    <div class="flex size-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e6f4ff] p-2">
                      <img :src="item.image" :alt="item.name" class="max-h-8 max-w-8 object-contain" />
                    </div>
                    <div class="flex flex-1 items-center justify-between">
                      <span class="text-2xl font-semibold" :class="hoveredCategory === item.id ? 'text-[#4096ff]' : 'text-[rgba(0,0,0,0.88)]'">{{ item.name }}</span>
                      <ChevronRight :size="24" :class="hoveredCategory === item.id ? 'text-[#4096ff]' : 'text-[rgba(0,0,0,0.88)]'" />
                    </div>
                  </RouterLink>
                  <div
                    v-else
                    class="flex cursor-pointer items-center gap-3"
                    @mouseenter="hoveredCategory = item.id"
                  >
                    <div class="flex size-12 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#e6f4ff] p-2">
                      <img :src="item.image" :alt="item.name" class="max-h-8 max-w-8 object-contain" />
                    </div>
                    <div class="flex flex-1 items-center justify-between">
                      <span class="text-2xl font-semibold" :class="hoveredCategory === item.id ? 'text-[#4096ff]' : 'text-[rgba(0,0,0,0.88)]'">{{ item.name }}</span>
                      <ChevronRight :size="24" :class="hoveredCategory === item.id ? 'text-[#4096ff]' : 'text-[rgba(0,0,0,0.88)]'" />
                    </div>
                  </div>
                </template>
              </div>

              <div class="flex gap-8">
                <div class="flex w-[244px] flex-col gap-4">
                  <template v-if="hoveredItem?.children && hoveredItem.children.length > 0">
                    <div
                      v-for="child in hoveredItem.children"
                      :key="child.id"
                      class="flex items-center justify-between"
                    >
                      <RouterLink
                        :to="getChildLink(child)"
                        class="text-sm font-semibold leading-[22px] transition-colors hover:text-[#4096ff]"
                        :class="child.name.includes('Dell') && !child.name.includes('EMC') ? 'text-[#4096ff]' : 'text-[rgba(0,0,0,0.88)]'"
                        @click="emit('close')"
                      >
                        {{ child.name }}
                      </RouterLink>
                      <ChevronRight
                        v-if="child.hasArrow"
                        :size="20"
                        :class="child.name.includes('Dell') && !child.name.includes('EMC') ? 'text-[#4096ff]' : 'text-[rgba(0,0,0,0.88)]'"
                      />
                    </div>
                  </template>
                </div>

                <div class="flex w-[244px] flex-col gap-4">
                  <template v-for="config in dellConfigurators" :key="config.id">
                    <div v-if="config.isTitle" class="text-sm font-semibold leading-[22px] text-[rgba(0,0,0,0.88)]">
                      {{ config.name }}
                    </div>
                    <RouterLink
                      v-else
                      :to="`/configurator/${config.slug}`"
                      class="text-sm font-semibold leading-[22px] transition-colors hover:text-[#4096ff]"
                      :class="config.isActive ? 'text-[#4096ff]' : 'text-[rgba(0,0,0,0.88)]'"
                      @click="emit('close')"
                    >
                      {{ config.name }}
                    </RouterLink>
                  </template>
                </div>
              </div>
            </div>

            <div class="ml-auto flex flex-col gap-8">
              <div class="flex h-[320px] w-[280px] items-center justify-center rounded-3xl bg-gradient-to-b from-[#4096ff] to-[#265a99] px-6">
                <p class="text-center text-2xl font-semibold leading-8 text-white">
                  Рекламный, акционный, товарный банер
                </p>
              </div>

              <div class="flex gap-6">
                <a href="#" class="text-[#1677ff] transition-colors hover:text-[#4096ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"/>
                  </svg>
                </a>
                <a href="#" class="text-[#1677ff] transition-colors hover:text-[#4096ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C14.717 2 15.056 2.01 16.122 2.06C17.187 2.11 17.912 2.277 18.55 2.525C19.21 2.779 19.766 3.123 20.322 3.678C20.8305 4.1779 21.224 4.78259 21.475 5.45C21.722 6.087 21.89 6.813 21.94 7.878C21.987 8.944 22 9.283 22 12C22 14.717 21.99 15.056 21.94 16.122C21.89 17.187 21.722 17.912 21.475 18.55C21.2247 19.2178 20.8311 19.8226 20.322 20.322C19.822 20.8303 19.2173 21.2238 18.55 21.475C17.913 21.722 17.187 21.89 16.122 21.94C15.056 21.987 14.717 22 12 22C9.283 22 8.944 21.99 7.878 21.94C6.813 21.89 6.088 21.722 5.45 21.475C4.78233 21.2245 4.17753 20.8309 3.678 20.322C3.16941 19.8222 2.77593 19.2175 2.525 18.55C2.277 17.913 2.11 17.187 2.06 16.122C2.013 15.056 2 14.717 2 12C2 9.283 2.01 8.944 2.06 7.878C2.11 6.812 2.277 6.088 2.525 5.45C2.77524 4.78218 3.1688 4.17732 3.678 3.678C4.17767 3.16923 4.78243 2.77573 5.45 2.525C6.088 2.277 6.812 2.11 7.878 2.06C8.944 2.013 9.283 2 12 2ZM12 7C10.6739 7 9.40215 7.52678 8.46447 8.46447C7.52678 9.40215 7 10.6739 7 12C7 13.3261 7.52678 14.5979 8.46447 15.5355C9.40215 16.4732 10.6739 17 12 17C13.3261 17 14.5979 16.4732 15.5355 15.5355C16.4732 14.5979 17 13.3261 17 12C17 10.6739 16.4732 9.40215 15.5355 8.46447C14.5979 7.52678 13.3261 7 12 7ZM18.5 6.75C18.5 6.41848 18.3683 6.10054 18.1339 5.86612C17.8995 5.6317 17.5815 5.5 17.25 5.5C16.9185 5.5 16.6005 5.6317 16.3661 5.86612C16.1317 6.10054 16 6.41848 16 6.75C16 7.08152 16.1317 7.39946 16.3661 7.63388C16.6005 7.8683 16.9185 8 17.25 8C17.5815 8 17.8995 7.8683 18.1339 7.63388C18.3683 7.39946 18.5 7.08152 18.5 6.75ZM12 9C12.7956 9 13.5587 9.31607 14.1213 9.87868C14.6839 10.4413 15 11.2044 15 12C15 12.7956 14.6839 13.5587 14.1213 14.1213C13.5587 14.6839 12.7956 15 12 15C11.2044 15 10.4413 14.6839 9.87868 14.1213C9.31607 13.5587 9 12.7956 9 12C9 11.2044 9.31607 10.4413 9.87868 9.87868C10.4413 9.31607 11.2044 9 12 9Z"/>
                  </svg>
                </a>
                <a href="#" class="text-[#1677ff] transition-colors hover:text-[#4096ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M21.543 6.498C22 8.28 22 12 22 12C22 12 22 15.72 21.543 17.502C21.289 18.487 20.546 19.262 19.605 19.524C17.896 20 12 20 12 20C12 20 6.107 20 4.395 19.524C3.45 19.258 2.708 18.484 2.457 17.502C2 15.72 2 12 2 12C2 12 2 8.28 2.457 6.498C2.711 5.513 3.454 4.738 4.395 4.476C6.107 4 12 4 12 4C12 4 17.896 4 19.605 4.476C20.55 4.742 21.292 5.516 21.543 6.498ZM10 15.5L16 12L10 8.5V15.5Z"/>
                  </svg>
                </a>
                <a href="#" class="text-[#1677ff] transition-colors hover:text-[#4096ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM16.64 8.8C16.49 10.38 15.84 14.22 15.51 15.99C15.37 16.74 15.09 16.99 14.83 17.02C14.25 17.07 13.81 16.64 13.25 16.27C12.37 15.69 11.87 15.33 11.02 14.77C10.03 14.12 10.67 13.76 11.24 13.18C11.39 13.03 13.95 10.7 14 10.49C14.0069 10.4582 14.006 10.4252 13.9973 10.3938C13.9886 10.3624 13.9## 10.3337 13.96 10.31C13.89 10.26 13.78 10.28 13.71 10.29C13.61 10.31 12.24 11.22 9.55 13.02C9.16 13.29 8.8 13.43 8.49 13.42C8.15 13.41 7.49 13.22 7 13.06C6.4 12.87 5.92 12.77 5.96 12.44C5.98 12.27 6.21 12.1 6.66 11.93C9.55 10.68 11.48 9.85 12.46 9.44C15.19 8.33 15.74 8.14 16.1 8.14C16.18 8.14 16.38 8.16 16.51 8.27C16.62 8.36 16.65 8.49 16.66 8.58C16.65 8.65 16.67 8.73 16.64 8.8Z"/>
                  </svg>
                </a>
                <a href="#" class="text-[#1677ff] transition-colors hover:text-[#4096ff]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6.94 5C6.94 5.53043 6.72929 6.03914 6.35421 6.41421C5.97914 6.78929 5.47043 7 4.94 7C4.40957 7 3.90086 6.78929 3.52579 6.41421C3.15071 6.03914 2.94 5.53043 2.94 5C2.94 4.46957 3.15071 3.96086 3.52579 3.58579C3.90086 3.21071 4.40957 3 4.94 3C5.47043 3 5.97914 3.21071 6.35421 3.58579C6.72929 3.96086 6.94 4.46957 6.94 5ZM7 8.48H3V21H7V8.48ZM13.32 8.48H9.34V21H13.28V14.43C13.28 10.77 18.05 10.43 18.05 14.43V21H22V13.07C22 6.9 14.94 7.13 13.28 10.16L13.32 8.48Z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.2s ease;
}

.slide-enter-from,
.slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
