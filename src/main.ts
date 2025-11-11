import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from '@common/router'
import { i18n } from '@common/locale'
import { useLocaleStore } from '@common/locale/store/locale.store.ts'
import '@common/styles/globals.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)

useLocaleStore().initializeLocales()

app.mount('#app')
