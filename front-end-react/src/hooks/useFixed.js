import { useState, useEffect, useRef } from 'react';

export function useFixed(el, list, scrollY) {
  console.log(list, 'list....', scrollY)
  const listHeights = useRef([]);
  const currentIndex = useRef(0);
  const distance = useRef(0);
  const fixedTitle = useRef('');
  useEffect(() => {
    if (el.current) {
      console.log(el.current, 'el current....');
      console.log(el.current.children);
      const list = el.current.children;
      console.log(list.length);
      let height = 0;
      for (let i = 0; i < list.length; i++) {
        console.log(list[i].clientHeight);
        height += list[i].clientHeight;
        listHeights.current.push(height);
      }
    }
  }, [list, el]);

  useEffect(() => {
    if (el.current) {
      for (let i = 0; i < listHeights.current.length - 1; i++) {
        const top = listHeights.current[i];
        const bottom = listHeights.current[i + 1];

        console.log(top, bottom, scrollY)

        if (scrollY >= top && scrollY <= bottom) {
          currentIndex.current = i;
          distance.current = bottom - scrollY;
          fixedTitle.current = list[i].title
        }
      }
    }
  }, [scrollY]);

  return {
    currentIndex,
    distance,
    fixedTitle
  };
}
