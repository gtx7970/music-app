import { useEffect, useState } from 'react'
import BScroll from '@better-scroll/core'
import ObserveDOM from '@better-scroll/observe-dom'

BScroll.use(ObserveDOM)

export function useScroll(wrapper, options) {
  const [position, setPosition] = useState('')
  useEffect(() => {
    if (wrapper.current) {
      const scroll = new BScroll(wrapper.current, {
        ...options,
        observeDOM: true,
      })

      console.log(scroll)

      if (options.probeType > 0) {
        scroll.on('scroll', pos => {
          setPosition(pos)
        })
      }

      return () => {
        scroll.destroy()
      }
    }
  }, [options])

  return {
    position
  }
}