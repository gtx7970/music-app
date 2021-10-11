<template>
  <div class="singer-detail">
    <!-- <music-list></music-list> -->
  </div>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import MusicList from '@/components/music-list/index.vue'

export default defineComponent({
  components: { MusicList },
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { data } = toRefs(props)
    console.log(data.value)
  }
})
</script>

<style scoped lang="less">
.singer-detail {
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: @color-background;
}
</style>
