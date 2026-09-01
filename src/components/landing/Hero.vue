<template>
  <section class="hero relative w-full overflow-hidden pt-20">
    <div class="absolute inset-0">
      <img :src="heroImg" alt="plants background" class="w-full h-full object-cover brightness-90"/>
      <div class="absolute inset-0 bg-gradient-to-b from-green-800/30 to-transparent"></div>
    </div>

    <div class="relative max-w-6xl mx-auto px-4 py-32 text-center text-white">

      <h1 class="text-4xl md:text-5xl font-extrabold leading-tight">{{ $t('landing.hero.title') }}</h1>
      <p class="mt-4 text-lg md:text-xl text-green-100 max-w-2xl mx-auto">{{ $t('landing.hero.subtitle') }}</p>

      <div class="mt-8 flex items-center justify-center gap-4">
        <router-link to="/auth/register" class="px-6 py-3 bg-green-600 text-white rounded-md font-medium">{{ $t('landing.hero.ctaPrimary') }}</router-link>
        <a href="#features" @click.prevent="scrollToSection('features')" class="px-6 py-3 border border-white text-white rounded-md">{{ $t('landing.hero.ctaSecondary') }}</a>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { scrollToSection as scrollToSectionUtil } from '@/shared/utils/scrollTo'

export default defineComponent({
  name: 'Hero',
  data() {
    return {
      heroImg: '/images/plant-placeholder.svg'
    }
  }
  ,
  methods: {
    scrollToSection(id: string) {
      scrollToSectionUtil(id)
    }
  }
})
</script>

<style scoped>
.hero { min-height: 60vh; }
</style>
