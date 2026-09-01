import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import routesAuth from '@/views/auth/router'
import store from '@/store/index'
import Account from '@/views/account/Account.vue'
import { VueCookieNext } from 'vue-cookie-next'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'homeeee',
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
  }, {
    path: '/account',
    name: 'Account',
    component: Account,
    beforeEnter: async (to, from, next) => {
      await store.dispatch('getLoggedUser')
      if (VueCookieNext.getCookie('token') && store.state.loggedUser && store.state.loggedUser._id) {
        next()
      } else {
        store.commit('setLoggedUser', {})
        next()
      }
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
