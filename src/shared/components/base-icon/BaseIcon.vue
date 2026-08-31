<template>
  <component
    :is="iconComponent"
    role="img"
    :class="classNames"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { getIcons, Icons } from './getIcons'

const icons: Icons = getIcons()

export default defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    classNames: {
      type: String,
      required: false
    }
  },
  setup (props) {
    const iconComponent = icons[props.name]
    return { iconComponent }
  }
})
</script>
