<template>
  <div class="mt-2 relative flex justify-center min-h-screen items-center">
    <form v-on:submit.prevent="register" class="w-540 max-w-full flex flex-col bg-white p-8 rounded-lg shadow border">
      <div class="head mb-10">
        <h1 class="font-bold text-3xl text-start mb-2">{{ $t('register.form_title') }}</h1>
      </div>
      <div class="mb-6">
        <FieldWrapper label="auth.email" name="email" :errors="v$.registerForm.email.$errors">
          <input name="email" type="email" v-bind:class="{error: v$.registerForm.email.$error}" v-model="registerForm.email" class="focus:shadow" :placeholder="$t('auth.email_placeholder')" @blur="v$.registerForm.email.$touch"/>
        </FieldWrapper>
        <FieldWrapper label="auth.password" name="password" :errors="v$.registerForm.password.$errors" :hint="`${$t('register.password_length')} ${$t('register.password_not_strong')}`">
          <input name="password" type="password" v-bind:class="{error: v$.registerForm.password.$error}" v-model="registerForm.password" class="focus:shadow" :placeholder="$t('auth.password_placeholder')" @blur="v$.registerForm.password.$touch"/>
        </FieldWrapper>
        <FieldWrapper label="auth.password_confirm" name="passwordConfirm" :errors="v$.registerForm.passwordConfirm.$errors" :hint="`${$t('register.password_length')} ${$t('register.password_not_strong')}`">
          <input name="passwordConfirm" type="password" v-bind:class="{error: v$.registerForm.passwordConfirm.$error}" v-model="registerForm.passwordConfirm" class="focus:shadow" :placeholder="$t('auth.password_confirm_placeholder')" @blur="v$.registerForm.passwordConfirm.$touch"/>
        </FieldWrapper>
      </div>
      <div class="flex flex-col items-center space-y-3">
        <button type="submit" class="primary w-full h-11" :disabled="v$.registerForm.invalid">{{ $t('register.submit') }}</button>
      </div>
      <div class="flex items-center justify-center gap-x-2 mt-4">
        <div>{{ $t('register.account') }}</div>
        <router-link to="/auth" class="block text-primary font-bold hover:underline text-left">{{ $t('register.login') }}</router-link>
      </div>
    </form>
  </div>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useStore } from 'vuex'
import useVuelidate from '@vuelidate/core'
import { required, sameAs, email } from '@/customValidators'
import FieldWrapper from '@/shared/components/FieldWrapper.vue'

export default defineComponent({
  name: 'Register',
  setup: () => {
    const store = useStore()
    store.commit('setVuelidateExternalResults', { registerForm: { } })
    return { v$: useVuelidate({ $externalResults: reactive(store.state.vuelidateExternalResults), $autoDirty: true }) }
  },
  data: function () {
    return {
      registerForm: {
        email: '',
        password: '',
        passwordConfirm: ''
      }
    }
  },
  validations: function () {
    return {
      registerForm: {
        email: { required, email },
        password: { required },
        passwordConfirm: { required, sameAs: sameAs(this.registerForm.password) },
      }
    }
  },
  components: {
    FieldWrapper
  },
  methods: {
    async register () {
      const isFormCorrect = await this.v$.registerForm.$validate()
      if (!isFormCorrect) return

      this.$store.dispatch('register', this.registerForm)
    }
  }
}
)
</script>

<style lang="scss">
</style>
