import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

import Home from './index.vue'
import Config from './config.vue'

import App from './App.vue'

import store from './store.js'

import "./css/reset.css"
import "./css/main.css"

const routes = [
  { path: '/', component: Home },
  { path: '/config', component: Config },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

app.use(router)
app.use(store)
app.mount('#app')
