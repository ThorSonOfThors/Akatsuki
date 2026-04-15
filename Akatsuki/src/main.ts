import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'leaflet/dist/leaflet.css'
import { createPinia } from 'pinia'

// ✅ IMPORT GLOBAL CSS
import '../src/style.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')