import { Method as apiMethod } from 'axios'

export const perenualEndpoints = {
  speciesList: {
    method: 'get' as apiMethod,
    // Full URL to external Perenual API
    url: 'https://perenual.com/api/species-list'
  },
  speciesDetails: {
    method: 'get' as apiMethod,
    url: 'https://perenual.com/api/species/details/:id'
  }
}
