<template>
  <scroll
    class="index-list"
    @scroll="onScroll"
    :probe-type="3"
    v-if="data.length"
  >
    <ul ref="groupRef">
      <li v-for="group in data" :key="group.title" class="group">
        <h2 class="title">{{ group.title }}</h2>
        <ul>
          <li
            v-for="item in group.list"
            :key="item.id"
            class="item"
            @click="onItemClick(item)"
          >
            <img class="avatar" :src="item.pic" />
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="fixed" :style="fixedStyle">
      <div class="fixed-title">{{ fixedTitle }}</div>
    </div>
  </scroll>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Scroll from '@/components/scroll/index.vue'
import { useFixed } from './use-fixed'

export default defineComponent({
  components: { Scroll },
  emits: ['select'],
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  setup(props, { emit }) {
    const { groupRef, onScroll, fixedTitle, fixedStyle } = useFixed(props)

    const onItemClick = (item: any) => {
      emit('select', item)
    }

    return {
      onScroll,
      groupRef,
      fixedTitle,
      fixedStyle,
      onItemClick
    }
  }
})
</script>

<style scoped lang="less">
.index-list {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: @color-background;
  .group {
    padding-bottom: 30px;
    .title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
    .item {
      display: flex;
      align-items: center;
      padding: 20px 0 0 30px;
      .avatar {
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .name {
        margin-left: 20px;
        color: @color-text-l;
        font-size: @font-size-medium;
      }
    }
  }
  .fixed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    .fixed-title {
      height: 30px;
      line-height: 30px;
      padding-left: 20px;
      font-size: @font-size-small;
      color: @color-text-l;
      background: @color-highlight-background;
    }
  }
}
</style>
