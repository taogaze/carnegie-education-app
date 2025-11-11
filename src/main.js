import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import sticky from './directives/sticky'

const app = createApp(App)
app.use(router)
// Register global directive: v-sticky
app.directive('sticky', sticky)
app.mount('#app')