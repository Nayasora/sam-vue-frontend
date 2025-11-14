<template>
  <footer class="border-t border-gray-100 bg-white px-6 py-12">
    <div class="mx-auto max-w-[1440px]">
      <div class="mb-6 flex gap-6">
        <div class="flex flex-1 flex-col justify-between">
          <div class="mb-12 flex gap-6">
            <a href="#" class="text-sm text-gray-600 transition-colors hover:text-gray-900">О нас</a>
            <a href="#" class="text-sm text-gray-600 transition-colors hover:text-gray-900">Новости</a>
            <a href="#" class="text-sm text-gray-600 transition-colors hover:text-gray-900">Контакты</a>
            <a href="#" class="text-sm text-gray-600 transition-colors hover:text-gray-900">Доп. раздел</a>
          </div>

          <div class="flex flex-col gap-4">
            <div class="h-11 w-[90.52px]">
              <img src="/logo.svg" alt="SAM" class="h-full w-full object-contain" />
            </div>
            <p class="text-sm text-gray-600">
              Quality materials, good designs, professional craftsmanship and sustainability.
            </p>
          </div>
        </div>

        <div class="flex w-[344px] min-h-[205px] flex-col justify-end gap-6 rounded-3xl bg-blue-50 p-6">
          <div class="flex flex-col gap-3">
            <h3 class="text-xl font-semibold text-gray-900">Cлужбу поддержки</h3>
            <div class="my-1 h-px w-full bg-gray-100"></div>
          </div>

          <div class="flex flex-col gap-3">
            <div class="flex items-center gap-2">
              <img src="/footer/icons/phone.svg" alt="" class="size-6 flex-shrink-0" />
              <span class="text-base text-gray-900">+7 (707) 777 89 76</span>
            </div>
            <div class="flex items-center gap-2">
              <img src="/footer/icons/chat-bubble-empty.svg" alt="" class="size-6 flex-shrink-0" />
              <span class="text-base text-gray-900">+7 778 701 23 45</span>
            </div>
            <div class="flex items-center gap-2">
              <img src="/footer/icons/mail.svg" alt="" class="size-6 flex-shrink-0" />
              <span class="text-base text-gray-900">Office@Sammarket.gmail.com</span>
            </div>
          </div>
        </div>

        <div class="flex flex-1 flex-col gap-6 rounded-3xl bg-blue-50 p-6">
          <div class="flex flex-col gap-3">
            <h3 class="text-xl font-semibold text-gray-900">Будьте всегда в курсе!</h3>
            <div class="my-1 h-px w-full bg-gray-100"></div>
            <p class="text-sm text-gray-600">
              Получайте уведомления о новых товарах, скидках и статьях.
            </p>
          </div>

          <form class="flex gap-2" @submit.prevent="handleSubscribe">
            <input
              type="email"
              placeholder="Email"
              class="h-8 flex-1 rounded-md border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder:text-gray-300 transition-all hover:border-primary focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/10"
              v-model="email"
              required
            />
            <button
              type="submit"
              class="h-8 whitespace-nowrap rounded-md border border-primary bg-primary px-4 text-sm text-white transition-colors hover:bg-blue-500 hover:border-blue-500 active:bg-blue-600 active:border-blue-600"
            >
              Подписаться
            </button>
          </form>
        </div>
      </div>

      <div class="my-6 h-px w-full bg-gray-100"></div>

      <div class="flex items-center justify-between">
        <p class="text-sm text-gray-600">© 2024 SAM Market. All Rights Reserved.</p>
        <div class="flex gap-4">
          <a href="#" class="flex size-6 items-center justify-center transition-opacity hover:opacity-70" aria-label="Facebook">
            <img src="/footer/icons/FacebookFilled.svg" alt="Facebook" class="block h-full w-full" />
          </a>
          <a href="#" class="flex size-6 items-center justify-center transition-opacity hover:opacity-70" aria-label="Instagram">
            <img src="/footer/icons/InstagramFilled.svg" alt="Instagram" class="block h-full w-full" />
          </a>
          <a href="#" class="flex size-6 items-center justify-center transition-opacity hover:opacity-70" aria-label="Twitter">
            <img src="/footer/icons/TwitterSquareFilled.svg" alt="Twitter" class="block h-full w-full" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')

const handleSubscribe = () => {
  if (email.value) {
    console.log('Subscribing:', email.value)
    email.value = ''
  }
}
</script>
