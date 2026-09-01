<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center" @click.self="$emit('close')">
    <div class="bg-white p-6 rounded-lg max-w-3xl w-full relative overflow-auto max-h-screen">
      <button class="absolute right-2 top-2 text-gray-600 hover:text-gray-900" @click="$emit('close')">✕</button>
      <h3 class="text-lg font-semibold">{{ $t('plants.addModal.title') }}</h3>

      <div class="mt-3 flex gap-2">
        <input v-model="query" @input="onInput" :placeholder="$t('plants.addModal.searchPlaceholder')" class="flex-1 border rounded px-3 py-2" />
        <button @click="search(1)" :disabled="query.length < 3 || loading" class="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50">{{ $t('plants.addModal.searchButton') }}</button>
      </div>

      <div v-if="showForm" class="mt-4 p-4 border rounded bg-gray-50">
        <div class="flex items-center gap-4">
          <img :src="getThumbnail(selectedSpec) || '/images/plant-placeholder.svg'" alt="" class="w-28 h-28 object-cover rounded" />
          <div>
            <div class="font-medium">{{ selectedSpec.common_name }}</div>
            <div v-if="selectedSpec.scientific_name && selectedSpec.scientific_name.length > 0" class="text-sm text-gray-600">({{ selectedSpec.scientific_name[0] }})</div>
            <div class="text-sm text-gray-600 mt-2">{{ $t('plants.wateringInterval', { interval: formatWateringInterval(selectedDetails?.watering_general_benchmark || selectedSpec?.watering_general_benchmark) }) }}</div>
          </div>
        </div>

        <div class="mt-3">
          <label class="block text-sm text-gray-700">Custom name</label>
          <input v-model="ownersPlantName" class="w-full border rounded px-3 py-2 mt-1" placeholder="Give your plant a name" />
        </div>

        <div class="mt-3">
          <label class="block text-sm text-gray-700">Last watered</label>
          <input v-model="firstWateringDayInput" type="date" class="border rounded px-3 py-2 mt-1" />
        </div>

        <div class="mt-3 flex justify-end gap-2">
          <button @click="cancelChoose" class="px-3 py-2 border rounded">{{ $t('cancel') }}</button>
          <button @click="addPlant" class="bg-green-600 text-white px-4 py-2 rounded">{{ $t('add') }}</button>
        </div>
      </div>

      <div class="mt-4">
        <div v-if="loading" class="text-gray-500">{{ $t('plants.addModal.loading') }}</div>
        <div v-else>
          <div v-if="species.length === 0" class="text-gray-600">{{ $t('plants.addModal.noResults') }}</div>
          <ul class="mt-2 space-y-4">
            <li v-for="spec in species" :key="spec.id" class="flex items-center justify-between p-6 border rounded">
              <div class="flex items-center truncate">
                <img
                  v-if="getThumbnail(spec)"
                  :src="getThumbnail(spec)"
                  alt=""
                  class="w-40 h-40 object-cover rounded mr-6 flex-shrink-0"
                  loading="lazy"
                />
                <img
                  v-else
                  src="/images/plant-placeholder.svg"
                  alt=""
                  class="w-40 h-40 object-cover rounded mr-6 flex-shrink-0"
                  loading="lazy"
                />

                <div class="truncate">{{ spec.common_name }} <span v-if="spec.scientific_name && spec.scientific_name.length > 0" class="text-xs text-gray-500">({{ spec.scientific_name[0] }})</span></div>
              </div>
              <div class="flex items-center gap-2">
                <button @click="choose(spec)" class="text-sm text-indigo-600">{{ $t('choose') }}</button>
              </div>
            </li>
          </ul>

          <div v-if="totalPages > 1" class="mt-3 flex items-center justify-between">
            <div class="text-sm text-gray-600">{{ $t('plants.addModal.page', { page: page, total: totalPages }) }}</div>
            <div class="flex gap-2">
              <button @click="prevPage" :disabled="page <= 1" class="px-2 py-1 border rounded">{{ $t('plants.addModal.prev') }}</button>
              <button @click="nextPage" :disabled="page >= totalPages" class="px-2 py-1 border rounded">{{ $t('plants.addModal.next') }}</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AddPlantModal',
  data() {
    return {
      query: '',
      timer: null as number | null,
      showForm: false,
      selectedSpec: null as any | null,
      selectedDetails: null as any | null,
      ownersPlantName: '',
      firstWateringDayInput: ''
    }
  },
  computed: {
    loading() {
      return (this as any).$store.getters['perenual/loading']
    },
    species() {
      return (this as any).$store.getters['perenual/species'] || []
    },
    page() {
      return (this as any).$store.getters['perenual/page'] || 1
    },
    totalPages() {
      return (this as any).$store.getters['perenual/totalPages'] || 1
    }
  },
  methods: {
    onInput() {
      if (this.timer) window.clearTimeout(this.timer)
      this.timer = window.setTimeout(() => {
        if (this.query.length >= 3) {
          (this as any).$store.dispatch('perenual/searchSpecies', { query: this.query, page: 1 })
        }
      }, 400)
    },
    search(p = 1) {
      if (this.query.length < 3) return
      (this as any).$store.dispatch('perenual/searchSpecies', { query: this.query, page: p })
    },
    async choose(spec: any) {
      this.selectedSpec = spec
      this.showForm = true
      this.ownersPlantName = ''
      // default to today
      this.firstWateringDayInput = new Date().toISOString().slice(0, 10)
      try {
        const details = await (this as any).$store.dispatch('perenual/getSpeciesDetails', spec.id)
        this.selectedDetails = details
      } catch (err) {
        console.error(err)
        this.selectedDetails = null
      }
    },

    cancelChoose() {
      this.showForm = false
      this.selectedSpec = null
      this.selectedDetails = null
      this.ownersPlantName = ''
      this.firstWateringDayInput = ''
    },

    async addPlant() {
      if (!this.selectedSpec) return
      const plantImage = this.getThumbnail(this.selectedDetails) || this.getThumbnail(this.selectedSpec) || null
      const plantData: any = {
        perenualId: this.selectedSpec.id || this.selectedSpec.perenual_id,
        commonName: this.selectedSpec.common_name || this.selectedSpec.scientific_name,
        ownersPlantName: this.ownersPlantName || undefined,
        firstWateringDay: this.firstWateringDayInput ? new Date(this.firstWateringDayInput).toISOString() : new Date().toISOString(),
        wateringIntervalDaysValue: (this.selectedDetails && this.selectedDetails.watering_general_benchmark) ? this.selectedDetails.watering_general_benchmark.value : this.selectedSpec.watering_general_benchmark ? this.selectedSpec.watering_general_benchmark.value : undefined,
        wateringIntervalDaysUnit: (this.selectedDetails && this.selectedDetails.watering_general_benchmark) ? this.selectedDetails.watering_general_benchmark.unit : this.selectedSpec.watering_general_benchmark ? this.selectedSpec.watering_general_benchmark.unit : undefined
      }
      if (plantImage) plantData.images = [plantImage]
      try {
        await (this as any).$store.dispatch('plants/createPlant', plantData)
        this.$emit('close')
      } catch (err) {
        console.error(err)
      }
    },
    formatWateringInterval(field: any) {
      // Perenual returns an object like: { value: "5-7", unit: "days" }
      if (field === null || field === undefined) return '-'
      if (typeof field === 'string' || typeof field === 'number') return String(field)
      try {
        if (field.value !== undefined && field.value !== null) {
          const unit = field.unit || 'days'
          return `${field.value} ${unit}`
        }

        // If min/max with unit
        if (field.min != null && field.max != null && field.unit) {
          return `${field.min}-${field.max} ${field.unit}`
        }

        // Fallback: join any primitive values
        const vals = Object.values(field).filter(v => v !== null && v !== undefined && (typeof v === 'string' || typeof v === 'number'))
        if (vals.length) return vals.join(' - ')
      } catch (e) {
        // ignore and fallback
      }
      return '-'
    },
    getThumbnail(spec: any) {
      // Try several common keys returned by external APIs (perenual response may vary)
      return (
        spec.default_image?.small_url ||
        spec.default_image?.medium_url ||
        spec.default_image?.original_url ||
        spec.default_image?.url ||
        (spec.images && spec.images[0] && spec.images[0].url) ||
        spec.image_url ||
        spec.image?.url ||
        undefined
      )
    },
    prevPage() {
      const p = this.page - 1
      if (p >= 1) this.search(p)
    },
    nextPage() {
      const p = this.page + 1
      if (p <= this.totalPages) this.search(p)
    }
  },
  beforeMount() {
    (this as any).$store.dispatch('perenual/searchSpecies', { page: 0 })
  },
  beforeUnmount() {
    if (this.timer) window.clearTimeout(this.timer)
  }
})
</script>

<!-- Tailwind utilities used; no scoped styles needed -->
