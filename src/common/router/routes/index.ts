import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@features/store/views/MainView.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/catalog',
    name: 'catalog',
    component: () => import('@features/store/views/CatalogPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/catalog/:category',
    name: 'catalog-category',
    component: () => import('@features/store/views/CatalogPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/products/:id',
    name: 'product',
    component: () => import('@features/store/views/ProductPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('@features/cart/views/CartPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/checkout',
    name: 'checkout',
    component: () => import('@features/checkout/views/CheckoutPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/order/success/:id',
    name: 'order-success',
    component: () => import('@features/checkout/views/OrderSuccessPage.vue'),
    meta: { requiresAuth: false },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@features/auth/views/LoginPage.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@features/auth/views/RegisterPage.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () => import('@features/auth/views/ForgotPasswordPage.vue'),
    meta: { requiresGuest: true },
  },
  {
    path: '/account',
    name: 'account',
    component: () => import('@features/account/views/AccountPage.vue'),
    meta: { requiresAuth: true },
  },
]
