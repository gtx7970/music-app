import { useRef, memo } from 'react';
import { useSlider } from '../../hooks';

function Slider({ sliders }) {
  const wrapperRef = useRef();
  const { currentIndex } = useSlider(wrapperRef, sliders);
  return (
    <div className='slider' ref={wrapperRef}>
      <div className='overflow-hidden relative whitespace-nowrap'>
        {sliders.map((item) => {
          return (
            <div className='inline-block' key={item.pic}>
              <a href={item.link} className="block w-full">
                <img src={item.pic} alt='' className="block w-full" />
              </a>
            </div>
          );
        })}
      </div>
      <div className='dots-wrapper'>
        {sliders.map((item, i) => {
          return (
            <span
              key={item.pic}
              className={{ active: currentIndex === i, dot: true }}
            ></span>
          );
        })}
      </div>
    </div>
  );
}

export default memo(Slider);
