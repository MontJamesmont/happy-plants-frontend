import { Method as apiMethod } from 'axios'

export const plantsEndpoints = {
  list: {
    method: 'get' as apiMethod,
    url: '/plants'
  },
  get: {
    method: 'get' as apiMethod,
    url: '/plants/:id'
  },
  create: {
    method: 'post' as apiMethod,
    url: '/plants'
  },
  patchName: {
    method: 'patch' as apiMethod,
    url: '/plants/:id'
  },
  remove: {
    method: 'delete' as apiMethod,
    url: '/plants/:id'
  }
}
