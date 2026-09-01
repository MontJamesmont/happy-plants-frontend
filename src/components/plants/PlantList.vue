<template>
  <div class="">
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <ul v-else class="space-y-2">
      <li v-for="plant in plants" :key="plant._id">
        <PlantRow :plant="plant" @open="openDetails" @delete="deletePlant" @rename="renamePlant" />
      </li>
    </ul>
    <PlantDetailsModal v-if="selectedPlant" :plant="selectedPlant" @close="(selectedPlant = null)" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlantRow from './PlantRow.vue'
import PlantDetailsModal from './PlantDetailsModal.vue'

export default defineComponent({
  name: 'PlantList',
  components: { PlantRow, PlantDetailsModal },
  data() {
    return { selectedPlant: null as any }
  },
  computed: {
    plants() {
      return (this as any).$store.getters['plants/allPlants'] || []
    },
    loading() {
      return (this as any).$store.state.plants.loading
    }
  },
  created() {
    (this as any).$store.dispatch('plants/fetchPlants')
  },
  methods: {
    openDetails(plant: any) {
      // open details modal
      (this as any).selectedPlant = plant
    },
    deletePlant(id: string) {
      (this as any).$store.dispatch('plants/deletePlant', id)
    },
    renamePlant({ id, name }: { id: string, name: string }) {
      (this as any).$store.dispatch('plants/updatePlantName', { id, ownersPlantName: name })
    }
  }
})
</script>

<!-- Tailwind utilities used; no scoped styles needed -->
