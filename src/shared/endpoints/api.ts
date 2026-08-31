import { authEndpoints } from './auth'
import { plantsEndpoints } from './plants'

export const apiBase = process.env.VUE_APP_API_BASE || 'base'

export const apiEndpoints = {
  ...authEndpoints,
  ...plantsEndpoints
}
