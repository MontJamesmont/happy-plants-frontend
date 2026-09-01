import { Method as apiMethod } from 'axios'

export const authEndpoints = {
  me: {
    method: 'get' as apiMethod,
    url: '/users/me'
  },
  updateUser: {
    method: 'put' as apiMethod,
    url: '/users/me'
  },
  login: {
    method: 'post' as apiMethod,
    url: '/users/login'
  },
  logout: {
    method: 'post' as apiMethod,
    url: '/users/logout'
  },
  activate: {
    method: 'post' as apiMethod,
    url: '/users/activateAccount'
  },
  forgot: {
    method: 'post' as apiMethod,
    url: '/users/passwordForgotten'
  },
  reset: {
    method: 'post' as apiMethod,
    url: '/users/resetPassword'
  },
  register: {
    method: 'post' as apiMethod,
    url: '/users/register'
  }
}
