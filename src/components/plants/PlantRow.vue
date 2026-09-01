<template>
  <div class="flex items-center justify-between p-3 border rounded bg-white shadow-sm">
    <div class="flex-1">
      <strong class="text-lg font-semibold">{{ plant.ownersPlantName || plant.commonName || 'Unnamed' }}</strong>
      <div v-if="!!plant.ownersPlantName" class="text-sm text-gray-500">{{ plant.commonName }}</div>
    </div>
    <div class="text-right mr-4">
      <div :class="nextClass">Next: {{ nextWatering }}</div>
      <div :class="prevClass">Prev: {{ prevWatering }}</div>
    </div>
    <div class="flex items-center">
      <button @click="$emit('open', plant)" class="text-sm text-blue-600 hover:underline">Details</button>
      <button @click="onDelete" class="ml-3 text-sm text-red-600 hover:underline">Delete</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlantRow',
  props: { plant: { type: Object, required: true } },
  computed: {
    nextWatering(): string {
      const p: any = this.plant
      if (!p.firstWateringDay) return 'N/A'
      const interval = p.wateringIntervalDays || 7
      const first = new Date(p.firstWateringDay)
      const next = new Date(first.getTime() + interval * 24 * 60 * 60 * 1000)
      return next.toLocaleDateString()
    },
    prevWatering(): string {
      const p: any = this.plant
      if (!p.firstWateringDay) return 'N/A'
      const first = new Date(p.firstWateringDay)
      return first.toLocaleDateString()
    },
    nextClass(): string {
      const today = new Date();
      const next = new Date(this.nextWatering);
      const tomorrow = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1)
      return (next <= tomorrow) ? 'urgent' : ''
    },
    prevClass(): string {
      const today = new Date();
      const prev = new Date(this.prevWatering);
      const yesterday = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
      return (prev >= yesterday && prev < today) ? 'urgent' : ''
    }
  },
  methods: {
    onDelete() {
      if (confirm('Delete plant?')) this.$emit('delete', this.plant._id)
    }
  }
})
</script>

<style scoped lang="scss">
.urgent { @apply text-red-600 font-bold }
</style>
