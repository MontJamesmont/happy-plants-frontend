<template>
  <div id="app" class="min-h-screen">
    <Navbar />
    <main>
      <router-view/>
    </main>
    <ScrollTopButton />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from '@/components/layout/Navbar.vue'
import ScrollTopButton from '@/components/layout/ScrollTopButton.vue'

export default defineComponent({
  name: 'App',
  components: { Navbar, ScrollTopButton }
})
</script>

<style lang="scss">
@import "./styles/fonts.scss";
@import "./styles/main.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

/* leave navigation styling to Navbar component */
#app { padding-top: 64px; }
</style>
