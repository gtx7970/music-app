<template>
  <div ref="root"><slot /></div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useScroll } from './use-scroll'

export default defineComponent({
  props: {
    click: {
      type: Boolean,
      default: true
    },
    probeType: {
      type: Number,
      default: 0
    }
  },
  setup(props, { emit }) {
    const root = ref(null)
    const scroll = useScroll(root, props, emit)

    return {
      root,
      scroll
    }
  }
})
</script>
