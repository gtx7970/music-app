<template>
  <m-header></m-header>
  <tab></tab>
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MHeader from '@/components/header/index.vue'
import Tab from '@/components/tab/index.vue'

export default defineComponent({
  components: { MHeader, Tab },
  setup() {},
})
</script>

<style lang="less"></style>
