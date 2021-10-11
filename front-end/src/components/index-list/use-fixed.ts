import { ref, watchEffect, nextTick, watch, computed } from 'vue'

export const useFixed = (props: any) => {
  const TITLE_HEIGHT = 30
  const groupRef = ref()
  const listHeights = ref<number[]>([])
  const scrollY = ref(0)
  const currentIndex = ref(0)
  const distance = ref(0)


  const genListHeights = () => {
    const list = groupRef.value!.children
    const listHeightsVal = listHeights.value
    let height = 0

    listHeightsVal.length = 0
    listHeightsVal.push(height)

    for (let i = 0; i < list.length; i++) {
      height += list[i].clientHeight
      listHeightsVal.push(height)
    }
  }

  const onScroll = (pos: any) => {
    scrollY.value = -pos.y
  }

  const fixedTitle = computed(() => {
    if (scrollY.value < 0) return ''
    const currentGroup = props.data[currentIndex.value]
    console.log(currentGroup)
    return currentGroup ? currentGroup.title : ''
  })

  const fixedStyle = computed(() => {
    const diff = (distance.value > 0 && distance.value < TITLE_HEIGHT) ? distance.value - TITLE_HEIGHT : 0
    return {
      transform: `translate3d(0,${diff}px,0)`
    }
  })

  watch(() => scrollY.value, (newY) => {
    const list = listHeights.value

    for (let i = 0; i < list.length - 1; i++) {
      const top = list[i]
      const bottom = list[i + 1]
      if (newY >= top && newY <= bottom) {
        currentIndex.value = i
        distance.value = bottom - newY
      }
    }
  })

  watch(
    () => props.data,
    async () => {
      await nextTick()
      genListHeights()
    }
  )

  return {
    groupRef,
    onScroll,
    fixedTitle,
    fixedStyle
  }
}
