<template>
  <footer class="bg-gray-50 border-t mt-12">
    <div class="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
      <div class="flex items-center gap-3">
        <img :src="logo" :alt="$t('app.name')" class="h-8 w-8"/>
        <span>{{ $t('landing.footer.copyright', { year }) }}</span>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import logoImg from '@/assets/logo.png'

export default defineComponent({
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
      logo: logoImg
    }
  }
})
</script>

<style scoped>
</style>
