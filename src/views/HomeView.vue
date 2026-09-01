<template>
  <div>
    <Hero />

    <FeatureSection
      id="features"
      titleKey="landing.features.discover.title"
      descriptionKey="landing.features.discover.description"
      image="/images/plant-placeholder.svg"
      ctaKey="landing.features.explore"
      cta-link="/plants"
    />

    <FeatureSection
      id="how"
      titleKey="landing.features.track.title"
      descriptionKey="landing.features.track.description"
      image="/images/plant-placeholder.svg"
      ctaKey="landing.features.startTracking"
      cta-link="/account"
    />

    <FeatureSection
      id="community"
      titleKey="landing.features.community.title"
      descriptionKey="landing.features.community.description"
      image="/images/plant-placeholder.svg"
      ctaKey="landing.features.joinNow"
      cta-link="/auth/register"
    />

    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Hero from '@/components/landing/Hero.vue'
import FeatureSection from '@/components/landing/FeatureSection.vue'
import Footer from '@/components/layout/Footer.vue'

export default defineComponent({
  name: 'HomeView',
  components: { Hero, FeatureSection, Footer }
})
</script>
