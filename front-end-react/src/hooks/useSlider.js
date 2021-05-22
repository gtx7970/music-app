import { useState, useEffect } from 'react';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';

BScroll.use(Slide)

export function useSlider(wrapperRef) {
  const [currentIndex, setCurrentIndex] = useState(-1);
  useEffect(() => {
    const sliderVal = new BScroll(wrapperRef.current, {
      click: true,
      scrollX: true,
      scrollY: false,
      momentum: false,
      bounce: false,
      probeType: 2,
      slide: true,
    });

    sliderVal.on('slideWillChange', page => {
      setCurrentIndex(page.pageX)
    })

    return () => {
      sliderVal.destroy()
    }
  }, [wrapperRef]);

  return {
    currentIndex,
  };
}
