<template>
  <div class="mt-2 relative flex justify-center min-h-screen items-center">
    <div class="w-420 flex flex-col bg-white p-8 rounded-lg shadow border">
      <div class="head mb-10">
        <h1 class="font-bold text-2xl text-start mb-2">{{ $t('forgot.title') }}</h1>
        <p class="text-textHeaderColor text-start">
          {{ $t('forgot.subtitle') }}
        </p>
      </div>
      <div class="mb-6">
        <FieldWrapper label="auth.email" name="email" :errors="v$.email.$errors">
          <input name="email" type="email" v-bind:class="{error: v$.email.$error}" v-model="email" class="focus:shadow" :placeholder="$t('auth.email_placeholder')" @blur="v$.email.$touch"/>
        </FieldWrapper>
      </div>
      <div class="flex flex-col items-center space-y-3">
        <button class="primary w-355 h-11" @click="register" :disabled="v$.email.invalid">{{ $t('account.submit') }}</button>
      </div>
      <div class="flex items-center justify-center gap-x-2 mt-4">
        <div>{{ $t('forgot.account') }}</div>
        <router-link to="/auth" class="block text-primary font-bold hover:underline text-left">{{ $t('forgot.login') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useStore } from 'vuex'
import { required, email } from '@/customValidators'
import FieldWrapper from '@/shared/components/FieldWrapper.vue'

export default defineComponent({
  name: 'Forgot',
  setup: () => {
    const store = useStore()
    store.commit('setVuelidateExternalResults', {})
    return { v$: useVuelidate({ $externalResults: reactive(store.state.vuelidateExternalResults), $autoDirty: true }) }
  },
  data: function () {
    return {
      email: '',
      isError: false,
      errorMessage: ''
    }
  },
  validations: function () {
    return {
      email: { required, email }
    }
  },
  components: {
    FieldWrapper
  },
  methods: {
    register: async function () {
      const isFormCorrect = await this.v$.email.$validate()
      if (!isFormCorrect) return
      this.$store.dispatch('forgot', this.email)
      this.$router.push('/ForgotPasswordSuccess')
    }
  }
})
</script>

<style lang="scss">
</style>
