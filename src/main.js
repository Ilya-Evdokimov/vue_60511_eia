import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
try {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.mount('#app')
  console.log('App mounted successfully')
} catch (error) {
  console.error('Error mounting app:', error)
}
