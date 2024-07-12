import './assets/main.css'

import { createApp, provide } from 'vue'
import { createPinia } from 'pinia'

import utilities from "@/utilities"
import Notifications from '@kyvg/vue3-notification'
import VueTippy from 'vue-tippy'
import 'tippy.js/dist/tippy.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)
utilities(app)
app.use(createPinia())
app.use(router)
app.use(Notifications)
app.use(VueTippy, { directive: "tooltip", defaultProps: { allowHTML: true } })
app.mount('#app')