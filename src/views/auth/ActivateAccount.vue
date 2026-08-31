<template>
  <div class="flex justify-center items-center w-screen h-screen">
    <IndicatorIcon v-if="isLoading" class="animate-spin h-20 w-20 text-textColor" ></IndicatorIcon>
    <div v-if="isError" class="animate-spin h-20 w-20 text-textColor">
      {{ $t('auth.activateError') }}
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import IndicatorIcon from '@/shared/components/base-icon/icons/IndicatorIcon.vue'

export default defineComponent({
  name: 'ActivateAccount',
  data: function () {
    return {
      isLoading: true,
      isError: false
    }
  },
  components: {
    IndicatorIcon
  },
  beforeMount () {
    const email = this.$route.params.email
    const token = this.$route.params.token
    this.$store.dispatch('activate', { email, token })
      .finally(() => {
        this.$router.push('/auth')
      })
      .catch(() => {
        this.isError = true
      })
      .finally(() => {
        this.isLoading = false
      })
  }
})
</script>

<style lang="scss">
</style>
