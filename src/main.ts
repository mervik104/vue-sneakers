import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createPinia } from 'pinia'
import { router } from './router'
import { createVuetify } from 'vuetify'
import Vue3Toastify, { Bounce, type ToastContainerOptions } from 'vue3-toastify';

const pinia = createPinia()
const vuetify = createVuetify({
  theme: {
    defaultTheme: 'light' // Или 'dark'
  }
})

const app = createApp(App)
app.use(router)
app.use(vuetify)
app.use(autoAnimatePlugin)
app.use(pinia)
app.use(Vue3Toastify, {
  position: "top-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "colored",
  transition: Bounce,
} as ToastContainerOptions);
app.mount('#app')
