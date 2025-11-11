<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Search } from 'lucide-vue-next'

interface SearchInputProps {
  modelValue?: string
  placeholder?: string
}

const props = withDefaults(defineProps<SearchInputProps>(), {
  modelValue: ''
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  search: [query: string]
  submit: [query: string]
}>()

const { t } = useI18n()
const searchQuery = ref(props.modelValue)

const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value
  searchQuery.value = value
  emit('update:modelValue', value)
  emit('search', value)
}

const handleSubmit = (event: Event) => {
  event.preventDefault()
  emit('submit', searchQuery.value)
}
</script>

<template>
  <form
    class="relative flex w-full items-center"
    @submit="handleSubmit"
  >
    <!-- Search Icon -->
    <Search
      :size="20"
      class="absolute left-3 text-muted-foreground"
    />

    <!-- Input -->
    <input
      :value="searchQuery"
      type="search"
      :placeholder="placeholder || t('header.searchPlaceholder')"
      class="h-10 w-full rounded-lg border border-input bg-background pl-10 pr-4 text-sm transition-colors placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
      @input="handleInput"
    />
  </form>
</template>
