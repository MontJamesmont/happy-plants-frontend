<template>
  <section :id="id" class="py-20 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <div class="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h3 class="text-2xl font-semibold text-green-800">{{ $t(titleKey) }}</h3>
          <p class="mt-3 text-gray-600">{{ $t(descriptionKey) }}</p>
          <div v-if="ctaKey" class="mt-6">
            <router-link :to="ctaLink" class="inline-block px-4 py-2 bg-green-600 text-white rounded">{{ $t(ctaKey) }}</router-link>
          </div>
        </div>

        <div class="flex justify-center">
          <img :src="image" :alt="$t(titleKey)" class="w-full max-w-md object-contain rounded-lg shadow"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FeatureSection',
  props: {
    titleKey: { type: String, required: true },
    descriptionKey: { type: String, required: true },
    image: { type: String, required: true },
    ctaKey: { type: String, required: false, default: '' },
    ctaLink: { type: String, required: false, default: '/' },
    id: { type: String, required: false, default: '' }
  }
})
</script>

<style scoped>
</style>
