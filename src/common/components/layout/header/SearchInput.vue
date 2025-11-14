<script setup lang="ts"></script>

<template>
  <div class="flex h-10 flex-1 overflow-hidden rounded-lg border border-gray-200">
    <div class="flex flex-1 items-center gap-2 bg-white px-3">
      <input
        type="text"
        placeholder="Поиск"
        class="flex-1 border-none bg-transparent text-base text-gray-900 outline-none placeholder:text-gray-300"
      />
      <button class="flex cursor-pointer items-center justify-center border-none bg-transparent p-1 transition-opacity hover:opacity-70" type="button" aria-label="Voice search">
        <img
          src="/mavbar-main/icons/progress-input-input-icon-audio-outlined.svg"
          alt=""
          class="size-4"
        />
      </button>
    </div>
    <button class="cursor-pointer whitespace-nowrap border-none bg-primary px-6 text-base text-white transition-colors hover:bg-blue-500 active:bg-blue-600">Найти</button>
  </div>
</template>
