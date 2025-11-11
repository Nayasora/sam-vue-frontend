# Header Components

Полный набор компонентов для header'а интернет-магазина SAM Market.

## 🏗 Структура

```
header/
├── AppHeader.vue       # Главный компонент (обертка)
├── TopBar.vue         # Верхняя полоска с контактами
├── MainNavbar.vue     # Основная навигация
├── Logo.vue           # Логотип SAM MARKET
├── SearchInput.vue    # Поле поиска
├── NavMenu.vue        # Меню пользователя
├── NavMenuItem.vue    # Элемент меню
├── MobileMenu.vue     # Мобильное меню (drawer)
├── types.ts           # TypeScript типы
└── index.ts           # Экспорты
```

## 📦 Использование

### Быстрый старт

Header уже интегрирован в `App.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AppHeader } from '@common/components/layout/header'

const favoritesCount = ref(5)
const ordersCount = ref(1)
const cartCount = ref(3)
</script>

<template>
  <AppHeader
    :favorites-count="favoritesCount"
    :orders-count="ordersCount"
    :cart-count="cartCount"
    sticky
  />
</template>
```

### Props

#### AppHeader

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `sticky` | `boolean` | `true` | Фиксированный header при скролле |
| `favoritesCount` | `number` | `0` | Количество избранных товаров |
| `ordersCount` | `number` | `0` | Количество заказов |
| `cartCount` | `number` | `0` | Количество товаров в корзине |

#### SearchInput

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `modelValue` | `string` | `''` | v-model значение поиска |
| `placeholder` | `string` | `i18n` | Placeholder текст |

**Events:**
- `@update:modelValue` - изменение значения
- `@search` - поиск (при каждом вводе)
- `@submit` - отправка формы (Enter)

#### Logo

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `to` | `string` | `'/'` | Ссылка при клике на логотип |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Размер логотипа |

## 🎨 Адаптивность

### Desktop (≥ 1024px)
- ✅ Отображается TopBar
- ✅ Полная навигация
- ✅ Поиск в navbar
- ✅ Иконки + текст в меню

### Tablet (768px - 1023px)
- ❌ TopBar скрыт
- ✅ Полная навигация
- ✅ Поиск в navbar
- ✅ Иконки + текст в меню

### Mobile (< 768px)
- ❌ TopBar скрыт
- ❌ NavMenu скрыто
- ✅ Бургер-меню
- ✅ Поиск под navbar

## 🌍 Интернационализация

Поддерживаются 3 языка: **Русский (ru)**, **English (en)**, **Қазақша (kz)**

Ключи переводов в `src/common/locale/locales/`:

```typescript
header: {
  favorites: 'Избранное',
  orders: 'Заказы',
  cart: 'Корзина',
  login: 'Войти',
  catalog: 'Каталог',
  menu: 'Меню',
  close: 'Закрыть',
  searchPlaceholder: 'Поиск товаров...',
  topbar: {
    delivery: 'Бесплатная доставка от 10 000 ₸',
    workingHours: 'Пн-Вс: 9:00 - 21:00',
    trackOrder: 'Отследить заказ'
  }
}
```

## 🔧 Интеграция с Pinia (будущее)

В данный момент используются mock данные. Для интеграции с реальными stores:

```typescript
// App.vue
import { useCartStore } from '@/stores/cart'
import { useFavoritesStore } from '@/stores/favorites'
import { useOrdersStore } from '@/stores/orders'

const cartStore = useCartStore()
const favoritesStore = useFavoritesStore()
const ordersStore = useOrdersStore()
```

```vue
<AppHeader
  :favorites-count="favoritesStore.count"
  :orders-count="ordersStore.count"
  :cart-count="cartStore.count"
/>
```

## 🎯 Features

- ✅ **Responsive Design** - полностью адаптивный
- ✅ **i18n Support** - 3 языка
- ✅ **TypeScript** - полная типизация
- ✅ **Accessibility** - aria-labels, keyboard navigation
- ✅ **Sticky Header** - фиксация при скролле
- ✅ **Mobile Menu** - drawer с анимацией
- ✅ **Search** - интерактивный поиск
- ✅ **Badge Counters** - счетчики в меню

## 🚀 Следующие шаги

1. Создать Pinia stores для корзины, избранного и заказов
2. Добавить реальную авторизацию
3. Реализовать CategoryBar (полоса категорий)
4. Добавить выпадающее меню при клике на "Каталог"
5. Интегрировать с API поиска

## 📝 Примечания

- Все иконки из **Lucide Vue Next**
- Стили на **Tailwind CSS**
- Компоненты следуют паттернам **Shadcn Vue**
- Использует **Vue Router** для навигации
