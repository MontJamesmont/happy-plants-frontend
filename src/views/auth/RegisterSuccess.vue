<template>
  <div class="container mx-auto p-1 sm:p-8">
    <div class="bg-primary-50 p-1 rounded shadow-md bg-white sm:p-8">
      <h3 class="text-xl font-semibold text-gray-900 mb-4"> {{ $t('register.success_header') }} </h3>
      <p class="text-lg text-gray-600 mb-4"> {{ $t('register.success_message') }} </p>
      <a href="/" class="primary mt-4 inline-block px-8 py-3 text-lg text-white bg-primary-600 rounded-lg hover:bg-primary-700"> {{ $t('nav.return_home') }} </a>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
  }
})
</script>
