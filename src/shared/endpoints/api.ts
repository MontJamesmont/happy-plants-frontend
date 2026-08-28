import { authEndpoints } from './auth'

export const apiBase = process.env.VUE_APP_API_BASE || 'base'

export const apiEndpoints = {
  ...authEndpoints
}
