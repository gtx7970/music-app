import { useState, useEffect } from 'react';
import BScroll from '@better-scroll/core';
import Slide from '@better-scroll/slide';

BScroll.use(Slide);

export function useSlider(wrapperRef, sliders) {
  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    if (sliders.length && wrapperRef.current) {
      console.log(sliders, 'i')
      console.log(wrapperRef.current, 'i')
      const sliderVal = new BScroll(wrapperRef.current, {
        click: true,
        scrollX: true,
        scrollY: false,
        momentum: false,
        bounce: false,
        probeType: 2,
        slide: true,
      });

      sliderVal.on('slideWillChange', (page) => {
        setCurrentIndex(page.pageX);
      });

      return () => {
        sliderVal.destroy();
      };
    }
  }, [sliders.length]);

  return {
    currentIndex,
  };
}
