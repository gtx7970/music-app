import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'
import {
  onMounted,
  ref,
  onDeactivated,
  onUnmounted,
  onActivated,
  Ref
} from 'vue'

BScroll.use(ObserveDOM)

export const useScroll = (el: Ref, options, emit) => {
  const scroll = ref<any>(null)
  onMounted(() => {
    scroll.value = new BScroll(el.value, {
      ...options,
      observeDOM: true
    })

    if (options.probeType > 0) {
      scroll.value.on('scroll', (pos) => {
        emit('scroll', pos)
      })
    }
  })

  onUnmounted(() => {
    scroll.value.destroy()
  })

  onActivated(() => {
    scroll.value.enable()
    scroll.value.refresh()
  })

  onDeactivated(() => {
    scroll.value.disable()
  })

  return {
    scroll
  }
}
