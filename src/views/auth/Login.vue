<template>
  <div class="flex h-screen items-center">
    <div class="w-420 m-auto">
      <div class="login flex flex-col bg-white p-9 rounded-lg shadow space-y-3 border">
        <form v-on:submit.prevent="login">
          <div class="head mb-10">
            <h1 class="font-bold text-3xl text-start mb-2">{{ $t('auth.signin_header') }}</h1>
          </div>
          <FieldWrapper label="auth.email" name="email" :errors="v$.email.$errors">
            <input name="email" id="email" type="email" v-bind:class="{error: v$.email.$error}" v-model="email" class="focus:shadow" :placeholder="$t('auth.email_placeholder')" @blur="v$.email.$touch" :disabled="isLoading"/>
          </FieldWrapper>
          <FieldWrapper class="mb-8" label="auth.password" name="pass" :errors="v$.password.$errors">
            <input name="password" id="password" type="password" v-bind:class="{error: v$.password.$error}" v-model="password" class="focus:shadow" :placeholder="$t('auth.password_placeholder')" @blur="v$.password.$touch" :disabled="isLoading"/>
          </FieldWrapper>
          <button type="submit" class="primary w-full mb-2" :disabled="isLoading">
            <IndicatorIcon v-if="isLoading" class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" ></IndicatorIcon>
            {{ $t('auth.signin') }}
          </button>
          <router-link to="/auth/forgot" class="inline-block text-primary font-bold hover:underline mb-4">{{ $t('auth.forget_pass') }}</router-link>
          <div class="flex items-center justify-center gap-x-2">
            <div>{{ $t('auth.no_account') }}</div>
            <router-link to="/auth/signup" class="block text-primary font-bold hover:underline text-left">{{ $t('auth.register_account') }}</router-link>
          </div>
        </form>
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
import IndicatorIcon from '@/shared/components/base-icon/icons/IndicatorIcon.vue'

export default defineComponent({
  setup: () => {
    const store = useStore()
    store.commit('setVuelidateExternalResults', {})
    return { v$: useVuelidate({ $externalResults: reactive(store.state.vuelidateExternalResults), $autoDirty: true }) }
  },
  data: function () {
    return {
      email: '',
      password: '',
      isLoading: false
    }
  },
  validations: function () {
    return {
      email: { required, email },
      password: { required }
    }
  },
  components: {
    FieldWrapper,
    IndicatorIcon
  },
  methods: {
    login: async function () {
      const isFormCorrect = await this.v$.$validate()
      if (!isFormCorrect) return
      this.isLoading = true
      await this.$store.dispatch('login', { email: this.email, password: this.password }).then(() => {
        this.isLoading = false
        this.v$.$reset()
        this.email = ''
        this.password = ''
        this.$router.push(this.$route.query.redirect || '/creator')
      }).catch((err) => {
        this.isLoading = false
        console.log(err)
      })
    }
  }
})
</script>
