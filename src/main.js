import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import PrimeVue from 'primevue/config';
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css';

import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
try {
  const app = createApp(App)
  const pinia = createPinia()
  app.use(pinia)
  app.use(router)
  app.use(PrimeVue, {
    theme: {
        preset: definePreset(Aura)
    }
});
  app.mount('#app')
  console.log('App mounted successfully')
} catch (error) {
  console.error('Error mounting app:', error)
}

