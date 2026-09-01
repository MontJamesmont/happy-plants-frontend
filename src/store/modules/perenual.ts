import axios from 'axios'
import { perenualEndpoints } from '@/shared/endpoints/perenual'

const state = {
  species: [] as any[],
  loading: false,
  page: 1,
  totalPages: 1
}

const mutations = {
  setSpecies: (state: any, payload: any[]) => { state.species = payload },
  setLoading: (state: any, loading: boolean) => { state.loading = loading },
  setPage: (state: any, page: number) => { state.page = page },
  setTotalPages: (state: any, total: number) => { state.totalPages = total }
}

const actions = {
  async searchSpecies(context: any, { query, page = 1 }: { query?: string, page?: number }) {
    if (query && query.length < 3) return []
    context.commit('setLoading', true)
    try {
      const key = process.env.VUE_APP_PERENUAL_API_KEY
      const resp = await axios.get(perenualEndpoints.speciesList.url, { params: { key, q: query, page } })
      const data = resp.data.data || resp.data.result || []
      context.commit('setSpecies', data)
      // some APIs return pagination info; try to set totalPages if available
      const total = resp.data.total_pages || resp.data.last_page || resp.data.totalPages || 1
      context.commit('setTotalPages', total)
      context.commit('setPage', page)
      context.commit('setLoading', false)
      return data
    } catch (err) {
      context.commit('setSpecies', [])
      context.commit('setLoading', false)
      throw err
    }
  },
  async getSpeciesDetails(context: any, id: string) {
    try {
      const key = process.env.VUE_APP_PERENUAL_API_KEY
      const url = perenualEndpoints.speciesDetails.url.replace(':id', id)
      const resp = await axios.get(url, { params: { key } })
      return resp.data.data || resp.data.result || resp.data
    } catch (err) {
      throw err
    }
  }
}

const getters = {
  species: (state: any) => state.species,
  loading: (state: any) => state.loading,
  page: (state: any) => state.page,
  totalPages: (state: any) => state.totalPages
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
