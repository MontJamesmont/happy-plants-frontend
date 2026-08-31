import { RouteRecordRaw } from 'vue-router'

const routesAuth: Array<RouteRecordRaw> = [
  {
    path: '',
    name: 'Login',
    component: () => import('./Login.vue')
  }, {
    path: 'signup',
    name: 'Register',
    component: () => import('./Register.vue')
  }, {
    path: 'activate/:email/:token',
    name: 'Activate',
    component: () => import('./ActivateAccount.vue')
  }, {
    path: 'forgot',
    name: 'Forgot',
    component: () => import('./Forgot.vue')
  }, {
    path: 'reset/:email/:token',
    name: 'Reset',
    component: () => import('./Reset.vue')
  },
  {
    path: 'register-success',
    name: 'RegisterSuccess',
    component: () => import('./RegisterSuccess.vue')
  },
]

export default routesAuth
