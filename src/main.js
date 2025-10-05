

import { createApp } from 'vue'
// Попробуйте добавить расширения файлов
import App from './App.vue'  // Убедитесь что файл существует
import { createPinia } from 'pinia'

// Добавьте обработку ошибок
try {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.mount('#app')
  console.log('App mounted successfully')
} catch (error) {
  console.error('Error mounting app:', error)
}
