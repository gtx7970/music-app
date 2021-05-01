<template>
  <div class="recommend">
    <div class="slider-wrapper">
      <div class="slider-content">
        <slider v-if="sliders.length > 0" :sliders="sliders" />
      </div>
    </div>
  </div>
</template>

<script>
import Slider from '@/components/slide'
import { getRecommend } from '@/api'
export default {
  data() {
    return {
      sliders: []
    }
  },
  components: {
    Slider
  },
  async created() {
    const res = await getRecommend()
    this.sliders = res.sliders
  }
}
</script>

<style lang="less" scoped>
.recommend {
  
}
</style>
