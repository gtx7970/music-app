import { useRef } from 'react'
import { useSlider } from '../../hooks'

function Slider({ sliders }) {
  const wrapperRef = useRef()
  const { currentIndex } = useSlider(wrapperRef)
  return (
    <div className='slider' ref={wrapperRef}>
      <div className='slider-group'>
        {sliders.map((item) => {
          return (
            <div className='slider-page' key={item.id}>
              <a href={item.link}>
                <img src={item.pic} alt='' />
              </a>
            </div>
          );
        })}
      </div>
      <div class='dots-wrapper'>
        {sliders.map((item, i) => {
          return (
            <span key={item.id} className={{ active: currentIndex === i, dot: true }}></span>
          );
        })}
      </div>
    </div>
  );
}

export default Slider;
