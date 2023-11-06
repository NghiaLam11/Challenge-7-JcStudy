import { createApp } from 'vue'
import './style.css'
import './reset.css'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
