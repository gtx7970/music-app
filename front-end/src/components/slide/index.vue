<template>
  <div class="slider-wrapper" ref="rootRef">
    <div class="slider-content">
      <div class="slider-item" v-for="(slider, index) in sliders" :key="index">
        <a :href="slider.link">
          <img :src="slider.pic" />
        </a>
      </div>
      <div class="dots-wrapper">
        <span
          class="dot"
          v-for="(item, index) in sliders"
          :key="item.id"
          :class="{ active: currentPageIndex === index }"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useSlider } from './use-slider'

export default {
  props: {
    sliders: {
      type: Array,
      default: () => []
    }
  },

  setup() {
    const rootRef = ref(null)
    const { currentPageIndex } = useSlider(rootRef)

    return {
      rootRef,
      currentPageIndex
    }
  }
}
</script>

<style lang="less" scoped>
.slider-wrapper {
  min-height: 1px;
  font-size: 0;
  touch-action: pan-y;
  .slider-content {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    .slider-item {
      display: inline-block;
      transform: translate3d(0, 0, 0);
      backface-visibility: hidden;
      a {
        display: block;
        width: 100%;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
  .dots-wrapper {
    display: inline-block;
    margin: 0 4px;
    width: 8px;
    height: 8px;
    transform: translateZ(1px);
    border-radius: 50%;
    background: @color-text-l;
    &.active {
      width: 20px;
      border-radius: 5px;
      background: @color-text-ll;
    }
  }
}
</style>
