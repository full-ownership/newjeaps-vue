
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import './assets/tailwind.css'
import { useKakao } from 'vue3-kakao-maps/@utils';

useKakao("6968378f2f6b7f841d023ce674b9b307")
const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')
