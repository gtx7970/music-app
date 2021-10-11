<template>
  <div class="music-list">
    <div class="back" @click="goBack">
      <i class="icon-back"></i>
    </div>
    <h1 class="title">{{ title }}</h1>
    <div class="bg-image">
      <div class="playbtn-wrapper"></div>
      <div class="filter"></div>
    </div>
    <scroll class="list">
      <song-list :songs="songs"></song-list>
    </scroll>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Scroll from '@/components/scroll/index.vue'
import SongList from '@/components/song-list/index.vue'

export default defineComponent({
  components: { Scroll, SongList },
  props: {
    songs: {
      type: Array,
      default() {
        return []
      }
    },
    title: String,
    pic: String
  },
  setup() {
    const goBack = () => {}
    return {
      goBack
    }
  }
})
</script>
