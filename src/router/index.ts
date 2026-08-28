import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import routesAuth from '@/views/auth/router.js'
import store from '@/store/index.js'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  }, {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/auth/Auth.vue'),
    children: routesAuth,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) next()
      else next({ path: from.path })
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
