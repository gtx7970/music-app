<template>
  <div class="header">
    <span class="icon"></span>
    <h1 class="text">music</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {},
})
</script>

<style lang="less" scoped>
.header {
  height: 44px;
  text-align: center;
  color: @color-theme;
  font-size: 0;
  .icon {
    // display: inline-block;
    // vertical-align: top;
    // margin-top: 6px;
    // width: 30px;
    // height: 32px;
    // margin-right: 9px;
    // .bg-image('logo');
    // background-size: 30px 32px;
  }
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 44px;
    font-size: @font-size-large;
  }
  .mine {
    position: absolute;
    top: 0;
    right: 0;
    .icon-mine {
      display: block;
      padding: 12px;
      font-size: @font-size-large-x;
      color: @color-theme;
    }
  }
}
</style>
