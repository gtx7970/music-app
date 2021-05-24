import { useEffect, useState, memo } from 'react';
import Slider from '../../components/slider';
import Scroll from '../../components/scroll';
import { getRecommend } from '../../api';

function Recommend() {
  const [sliders, setSliders] = useState([]);
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    getRecommend().then((res) => {
      setSliders(res.sliders);
      setAlbums(res.albums);
    });
  }, []);
  return (
    <div className='recommend w-full overflow-scroll fixed bottom-0 top-20'>
      <Scroll>
        <div>
          <div className='slider-wrapper w-full h-0 overflow-hidden'>
            <div className='slider-content absolute top-0 left-0 w-full h-full'>
              <Slider sliders={sliders}></Slider>
            </div>
          </div>
          <div className='recommend-list'>
            <ul>
              {albums.map((item) => {
                return (
                  <li key={item.id}>
                    <div>
                      <img src={item.pic} alt='' width={60} height={60} />
                    </div>
                    <div className='text'>
                      <h2 className='name'>{item.username}</h2>
                      <p className='title'>{item.title}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </Scroll>
    </div>
  );
}

export default memo(Recommend);
