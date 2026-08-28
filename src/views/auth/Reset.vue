<template>
  <div class="relative flex min-h-screen items-center justify-center">
    <form v-on:submit.prevent="reset" class="w-540 max-w-full flex flex-col bg-white p-8 rounded-lg shadow border">
      <div class="head mb-10">
        <h1 class="font-bold text-3xl text-start mb-2">{{ $t('reset.title') }}</h1>
        <p class="text-textHeaderColor text-start">
          {{ $t('reset.subtitle') }}
        </p>
      </div>
      <div class="mb-6">
        <FieldWrapper label="auth.password" name="password" :errors="v$.resetForm.password.$errors" :hint="`${$t('register.password_length')} ${$t('register.password_not_strong')}`">
          <input name="password" type="password" v-bind:class="{error: v$.resetForm.password.$error}" v-model="resetForm.password" class="focus:shadow" :placeholder="$t('auth.password_placeholder')" @blur="v$.resetForm.password.$touch"/>
        </FieldWrapper>
        <FieldWrapper label="auth.password_confirm" name="passwordConfirm" :errors="v$.resetForm.password_confirm.$errors" :hint="`${$t('register.password_length')} ${$t('register.password_not_strong')}`">
          <input name="passwordConfirm" type="password" v-bind:class="{error: v$.resetForm.password_confirm.$error}" v-model="resetForm.password_confirm" class="focus:shadow" :placeholder="$t('auth.password_confirm_placeholder')" @blur="v$.resetForm.password_confirm.$touch"/>
        </FieldWrapper>
      </div>
      <div class="flex flex-col items-center space-y-3">
        <button type="submit" class="primary w-full h-11" :disabled="v$.resetForm.invalid">{{ $t('reset.submit') }}</button>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, sameAs } from '@/customValidators'
import FieldWrapper from '@/shared/components/FieldWrapper.vue'

export default defineComponent({
  name: 'Reset',
  setup: () => {
    const store = useStore()
    store.commit('setVuelidateExternalResults', { resetForm: { } })
    return { v$: useVuelidate({ $externalResults: reactive(store.state.vuelidateExternalResults), $autoDirty: true }) }
  },
  data: function () {
    return {
      resetForm: {
        password: '',
        password_confirm: ''
      }
    }
  },
  validations: function () {
    return {
      resetForm: {
        password: { required },
        password_confirm: { required, sameAs: sameAs(this.resetForm.password) }
      }
    }
  },
  components: {
    FieldWrapper
  },
  methods: {
    reset: async function () {
      const email = this.$route.params.email
      const token = this.$route.params.token
      const isFormCorrect = await this.v$.resetForm.$validate()
      if (!isFormCorrect || !email || !token) return
      this.$store.dispatch('reset', { email, token, ...this.resetForm })
    }
  }
})
</script>

<style lang="scss">
</style>
