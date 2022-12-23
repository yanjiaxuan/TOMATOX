import { createApp } from 'vue'
import naive from 'naive-ui'
import router from './router'
import { createPinia } from 'pinia'
import App from './App.vue'
import FullContainer from './components/full-container/index.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(naive)
app.use(router)
app.use(pinia)

// global components
app.component('FullContainer', FullContainer)

app.mount('#app')
