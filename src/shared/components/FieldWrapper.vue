<template>
  <div class="fieldWrapper mb-5">
    <label v-if="label && label.length > 0" :for="name">{{ $t(label) }}</label>
    <div v-if="hint && hint.length > 0" class="text-hintColor text-start text-xs -mt-2 mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6818 14.6668 7.99992C14.6668 4.31802 11.6821 1.33325 8.00016 1.33325C4.31826 1.33325 1.3335 4.31802 1.3335 7.99992C1.3335 11.6818 4.31826 14.6666 8.00016 14.6666Z" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 10.6667V8" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M8 5.33325H8.00667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      {{ $t(hint) }}
    </div>
    <slot></slot>
    <div v-if="errors && errors.length">
      <p v-for="error of errors" :key="error.$uid" class="text-textError text-start text-xs">{{ $t(error.$message) }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'FieldWrapper',
  props: {
    label: String,
    name: String,
    hint: String,
    errors: Array
  }
})
</script>

<style scoped lang="scss">
</style>
