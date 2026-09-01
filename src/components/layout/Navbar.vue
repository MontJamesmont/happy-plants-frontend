<template>
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur shadow-sm">
    <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      <router-link to="/" class="flex items-center gap-3">
        <img :src="logo" :alt="$t('app.name')" class="h-10 w-10 object-contain"/>
        <span class="font-bold text-xl text-green-700">{{ $t('app.name') }}</span>
      </router-link>

      <nav class="hidden md:flex items-center gap-6">
        <a href="#features" @click.prevent="scrollToSection('features')" class="text-gray-700 hover:text-green-600">{{ $t('landing.nav.features') }}</a>
        <a href="#how" @click.prevent="scrollToSection('how')" class="text-gray-700 hover:text-green-600">{{ $t('landing.nav.how') }}</a>
        <a href="#community" @click.prevent="scrollToSection('community')" class="text-gray-700 hover:text-green-600">{{ $t('landing.nav.community') }}</a>
      </nav>

      <div class="flex items-center gap-3">
        <router-link v-if="!isAuthenticated" to="/auth" class="px-4 py-2 text-sm font-medium text-green-700 border border-green-700 rounded hover:bg-green-50">{{ $t('landing.nav.login') }}</router-link>
        <router-link v-if="!isAuthenticated" to="/auth/register" class="px-4 py-2 text-sm font-medium bg-green-600 text-white rounded hover:opacity-95">{{ $t('landing.nav.signup') }}</router-link>

        <router-link v-if="isAuthenticated" to="/account" class="px-4 py-2 text-sm font-medium text-gray-800 border border-gray-200 rounded">{{ $t('landing.nav.account') }}</router-link>
        <button v-if="isAuthenticated" @click="handleLogout" class="px-3 py-2 text-sm text-red-600">{{ $t('landing.nav.logout') }}</button>
        
        <!-- Language switcher -->
        <div class="ml-2">
          <select v-model="currentLocale" @change="onChangeLocale" class="border rounded px-2 py-1 text-sm">
            <option v-for="opt in localeOptions" :key="opt.code" :value="opt.code">{{ opt.nativeName }}</option>
          </select>
        </div>
      </div>
    </div>
  </header>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import store from '@/store'
import logoImg from '@/assets/logo.png'
import router from '@/router'
import { locales as supportedLocales, changeLocale } from '@/i18n'
import { scrollToSection as scrollToSectionUtil } from '@/shared/utils/scrollTo'

export default defineComponent({
  name: 'Navbar',
  data() {
    return {
      logo: logoImg,
      currentLocale: ''
    }
  },
  computed: {
    localeOptions() {
      return supportedLocales
    },
    isAuthenticated(): boolean {
      try {
        return store.getters.isAuthenticated
      } catch (e) {
        return false
      }
    }
  },
  created() {
    // ensure current locale is available in component
    this.currentLocale = (localStorage.getItem('locale') || (this.localeOptions.length > 0 ? this.localeOptions[0].code : 'en'))
  },
  methods: {
    async handleLogout() {
      await store.dispatch('logout')
      router.push('/')
    },
    onChangeLocale() {
      if (this.currentLocale) {
        changeLocale(this.currentLocale)
      }
    },
    scrollToSection(id: string) {
      scrollToSectionUtil(id)
    }
  }
})
</script>

<style scoped>
header { height: 64px; }
</style>
