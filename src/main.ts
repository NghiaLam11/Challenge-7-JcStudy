import { createApp } from 'vue'
import './style.scss'
import './styles/theme.scss'
import './styles/global.scss'
import './styles/reset.scss'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
const pinia = createPinia();

createApp(App).use(router).use(pinia).mount('#app')
