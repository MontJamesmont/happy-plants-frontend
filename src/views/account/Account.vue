<template>
  <div class="max-w-3xl mx-auto p-4">
    <header class="flex items-center justify-between mb-4">
      <h1 class="text-2xl font-bold">My Plants</h1>
      <button @click="showAdd = true" class="bg-green-500 text-white px-4 py-2 rounded">Add plant</button>
    </header>

    <PlantList />

    <AddPlantModal v-if="showAdd" @close="showAdd = false" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import PlantList from '@/components/plants/PlantList.vue'
import AddPlantModal from '@/components/plants/AddPlantModal.vue'

export default defineComponent({
  name: 'Account',
  components: { PlantList, AddPlantModal },
  data() {
    return { showAdd: false }
  }
})
</script>

<!-- Tailwind utilities used; no scoped styles needed -->
