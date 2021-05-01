<template>
  <div id="nav">
    this is header
  </div>
  <tabs />
  <router-view />
</template>

<script>
import Tabs from '@/components/tab/tab.vue'
export default {
  components: {
    Tabs
  }
}
</script>

<style lang="less"></style>
