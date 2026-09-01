<template>
  <div class="fixed inset-0 bg-black/40 flex items-center justify-center" @click.self="$emit('close')">
    <div class="bg-white p-6 rounded-lg max-w-xl w-full relative">
      <button class="absolute right-2 top-2 text-gray-600 hover:text-gray-900" @click="$emit('close')">✕</button>
      <h2 class="text-xl font-bold">{{ plant.ownersPlantName || plant.commonName }}</h2>
      <p class="mt-2"><strong>{{ $t('plants.commonName') }}:</strong> {{ plant.commonName || $t('common.noData') }}</p>
      <p><strong>{{ $t('plants.nextWatering') }}:</strong> {{ nextWatering }}</p>
      <p><strong>{{ $t('plants.previousWatering') }}:</strong> {{ prevWatering }}</p>

      <div class="mt-4 grid grid-cols-1 gap-2">
        <div>
          <strong>{{ $t('plants.waterNeed') }}:</strong>
          <span class="ml-2">{{ waterNeed }}</span>
        </div>
        <div>
          <strong>{{ $t('plants.sunlight') }}:</strong>
          <span class="ml-2">{{ sunlight }}</span>
        </div>
        <div>
          <strong>{{ $t('plants.temperature') }}:</strong>
          <span class="ml-2">{{ temperature }}</span>
        </div>
        <div>
          <strong>{{ $t('plants.toxicity.label') }}:</strong>
          <span class="ml-2">{{ toxicity }}</span>
        </div>
        <div>
          <strong>{{ $t('plants.diseases') }}:</strong>
          <span class="ml-2">{{ diseases }}</span>
        </div>
        <div>
          <strong>{{ $t('plants.careInstructions') }}:</strong>
          <div class="mt-1 whitespace-pre-line text-sm text-gray-700">{{ care }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlantDetailsModal',
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
    }
    ,
    waterNeed(): string {
      const p: any = this.plant
      return p.watering || p.watering_general_benchmark || p.watering_needs || p.watering_info || (this as any).$t('common.noData')
    },
    sunlight(): string {
      const p: any = this.plant
      return p.sunlight || p.light || p.light_requirements || p.light_level || (this as any).$t('common.noData')
    },
    temperature(): string {
      const p: any = this.plant
      return p.temperature || p.temperature_range || p.temp || (this as any).$t('common.noData')
    },
    toxicity(): string {
      const p: any = this.plant
      if (p.toxicity && typeof p.toxicity === 'string') return p.toxicity
      if (p.toxicity && typeof p.toxicity === 'object') {
        const human = p.toxicity.human || p.toxicity.humans || ''
        const animal = p.toxicity.animal || p.toxicity.animals || ''
        const parts = [] as string[]
        if (human) parts.push((this as any).$t('plants.toxicity.humans', { value: human }))
        if (animal) parts.push((this as any).$t('plants.toxicity.animals', { value: animal }))
        return parts.length ? parts.join(' / ') : (this as any).$t('common.noData')
      }
      if (p.toxic) return p.toxic
      if (p.toxicity_info) return p.toxicity_info
      return (this as any).$t('common.noData')
    },
    diseases(): string {
      const p: any = this.plant
      return p.diseases || p.disease || p.pests || p.issues || (this as any).$t('common.noData')
    },
    care(): string {
      const p: any = this.plant
      return p.care_instructions || p.care || p.cultivation || p.care_instructions_long || (this as any).$t('common.noData')
    }
  }
})
</script>

<!-- Tailwind utilities used; no scoped styles needed -->
