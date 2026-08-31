import client from 'axios'
import { apiEndpoints } from '@/shared/endpoints/api'
import { Plant } from '@/shared/interfaces/plant.model'

const state = {
  plants: [] as Plant[],
  loading: false
}

const getters = {
  allPlants: (state: any) => state.plants,
  getPlantById: (state: any) => (id: string) => state.plants.find((p: Plant) => p._id === id)
}

const mutations = {
  setPlants: (state: any, plants: Plant[]) => { state.plants = plants },
  addPlant: (state: any, plant: Plant) => { state.plants = [plant, ...state.plants] },
  updatePlant: (state: any, plant: Plant) => { state.plants = state.plants.map((p: Plant) => p._id === plant._id ? plant : p) },
  removePlant: (state: any, id: string) => { state.plants = state.plants.filter((p: Plant) => p._id !== id) },
  setLoading: (state: any, loading: boolean) => { state.loading = loading }
}

const actions = {
  fetchPlants: async (context: any) => {
    context.commit('setLoading', true)
    try {
      const resp = await client({ method: apiEndpoints.list.method, url: apiEndpoints.list.url })
      context.commit('setPlants', resp.data.result || resp.data)
      context.commit('setLoading', false)
    } catch (err) {
      context.commit('setLoading', false)
      throw err
    }
  },
  fetchPlant: async (context: any, id: string) => {
    try {
      const url = apiEndpoints.get.url.replace(':id', id)
      const resp = await client({ method: apiEndpoints.get.method, url })
      return resp.data.result || resp.data
    } catch (err) {
      throw err
    }
  },
  createPlant: async (context: any, plantData: any) => {
    try {
      const resp = await client({ method: apiEndpoints.create.method, url: apiEndpoints.create.url, data: plantData })
      const created = resp.data.result || resp.data
      context.commit('addPlant', created)
      return created
    } catch (err) {
      throw err
    }
  },
  updatePlantName: async (context: any, { id, ownersPlantName }: { id: string, ownersPlantName: string }) => {
    try {
      const url = apiEndpoints.patchName.url.replace(':id', id)
      const resp = await client({ method: apiEndpoints.patchName.method, url, data: { ownersPlantName } })
      const updated = resp.data.result || resp.data
      context.commit('updatePlant', updated)
      return updated
    } catch (err) {
      throw err
    }
  },
  deletePlant: async (context: any, id: string) => {
    try {
      const url = apiEndpoints.remove.url.replace(':id', id)
      await client({ method: apiEndpoints.remove.method, url })
      context.commit('removePlant', id)
    } catch (err) {
      throw err
    }
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
