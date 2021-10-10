import BScroll from '@better-scroll/core'
import Slide from '@better-scroll/slide'
import { ref, onMounted, onUnmounted, onActivated, onDeactivated } from 'vue'

BScroll.use(Slide)

export const useSlide = (el: any) => {
  const currentPageIndex = ref(0)
  const slider = ref<any>()

  onMounted(() => {
    const sliderVal = (slider.value = new BScroll(el.value, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    }))
    sliderVal.on('slideWillChange', (page: any) => {
      currentPageIndex.value = page.pageX
    })
  })

  onUnmounted(() => {
    slider.value.destroy()
  })

  onActivated(() => {
    slider.value.enable()
    slider.value.refresh()
  })

  onDeactivated(() => {
    slider.value.disable()
  })

  return {
    currentPageIndex,
    slider,
  }
}
