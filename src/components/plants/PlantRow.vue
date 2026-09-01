<template>
  <div class="flex items-center justify-between p-3 border rounded bg-white shadow-sm gap-3">
    <div class="flex items-center flex-1 min-w-0 gap-3">
      <img
        :src="plantImage"
        :alt="displayName"
        class="w-40 h-40 object-cover rounded border bg-gray-100 flex-shrink-0"
        loading="lazy"
      />
      <div class="flex-1 min-w-0">
        <div v-if="!editing">
          <strong class="text-lg font-semibold cursor-pointer" @click="startEdit">{{ displayName }}</strong>
          <div v-if="!!plant.commonName" class="text-sm text-gray-500">{{ plant.commonName }}</div>
        </div>
        <div v-else class="flex items-start space-x-2">
          <input
            ref="nameInput"
            v-model="name"
            @keyup.enter="saveName"
            @keyup.esc="cancelEdit"
            class="border rounded px-2 py-1 text-lg"
            placeholder="Give this plant a name"
          />
          <div class="flex flex-col">
            <button @click="saveName" :disabled="loading" class="text-sm text-blue-600 hover:underline">Save</button>
            <button @click="cancelEdit" class="text-sm text-gray-600 hover:underline">Cancel</button>
          </div>
        </div>
        <div v-if="error" class="text-sm text-red-600 mt-1">{{ error }}</div>
      </div>
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
  data() {
    return {
      editing: false as boolean,
      name: (this as any).plant.ownersPlantName || '',
      loading: false as boolean,
      error: '' as string,
    }
  },
  computed: {
    plantImage(): string {
      const p: any = this.plant
      const imageList = Array.isArray(p.images) ? p.images : []

      for (const image of imageList) {
        if (typeof image === 'string' && image.trim()) return image
        if (image && typeof image === 'object') {
          if (typeof image.url === 'string' && image.url.trim()) return image.url
          if (typeof image.src === 'string' && image.src.trim()) return image.src
          if (typeof image.small_url === 'string' && image.small_url.trim()) return image.small_url
        }
      }

      return '/images/plant-placeholder.svg'
    },
    displayName(): string {
      return this.name || (this as any).plant.ownersPlantName || 'Unnamed'
    },
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
    startEdit() {
      this.error = ''
      this.name = (this as any).plant.ownersPlantName || ''
      this.editing = true
      this.$nextTick(() => {
        const el: any = this.$refs.nameInput
        if (el && el.focus) el.focus()
      })
    },
    cancelEdit() {
      this.error = ''
      this.name = (this as any).plant.ownersPlantName || ''
      this.editing = false
    },
    async saveName() {
      if (this.loading) return
      const trimmed = (this.name || '').trim()
      if (!trimmed) {
        this.error = 'Name cannot be empty'
        return
      }
      this.loading = true
      this.error = ''
      try {
        const updated = await (this as any).$store.dispatch('plants/updatePlantName', { id: (this as any).plant._id, ownersPlantName: trimmed })
        this.name = updated.ownersPlantName || trimmed
        this.editing = false
      } catch (err: any) {
        this.error = (err && err.message) ? err.message : 'Failed to update name'
      } finally {
        this.loading = false
      }
    },
    onDelete() {
      if (confirm('Delete plant?')) this.$emit('delete', this.plant._id)
    }
  }
})

</script>

<style scoped lang="scss">
.urgent { @apply text-red-600 font-bold }
</style>
