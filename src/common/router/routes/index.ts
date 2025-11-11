import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@features/store/views/MainView.vue'),
    meta: { requiresGuest: true },
  },
]
