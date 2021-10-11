<template>
  <div class="singer">
    <index-list :data="singers" @select="handleSelect"></index-list>
    <router-view v-slot="{ Component }">
      <transition appear name="slide">
        <component :is="Component" :data="selectedSinger" />
      </transition>
    </router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getSingerList } from '@/api'
import IndexList from '@/components/index-list/index.vue'

export default defineComponent({
  components: { IndexList },
  setup() {
    const router = useRouter()

    const singers = ref([])
    const selectedSinger = ref()

    getSingerList().then((res) => {
      singers.value = res.singers
    })

    const handleSelect = (item: any) => {
      selectedSinger.value = item
      router.push({ path: `/singer/${item.mid}` })
    }

    return {
      singers,
      handleSelect,
      selectedSinger
    }
  }
})
</script>

<style lang="less" scoped>
.singer {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;
}
</style>
