import { useEffect, useState, createRef, useRef, useCallback, useMemo } from 'react';
import Scroll from '../scroll';
import { useFixed } from '../../hooks/useFixed';
import { useScroll } from '../../hooks';

function SingerList({ dataList }) {
  console.log('kkkkkkkk')
  const op = useMemo(() => ({probeType: 3}), [])
  const rootWrap = useRef();
  const listWrapper = useRef(null);
  const { position } = useScroll(rootWrap, op);
  console.log(position, 'post......');
  // const [scrollY, setScrollY] = useState(0)
  const { fixedTitle } = useFixed(listWrapper, dataList, -1 * position.y)
  // const handleScroll = useCallback((pos) => {
  //   console.log(pos, 'simger')
  //   setScrollY(-1 * pos.y)
  // }, [])

  return (
    <div ref={rootWrap} className="h-full overflow-hidden">
      <ul ref={listWrapper}>
        {dataList.map((item) => {
          return (
            <li key={item.title}>
              <h2 className='fixed-title'>{item.title}</h2>
              <ul>
                {item.list.map((group, index) => {
                  return (
                    <li key={group.name}>
                      <img src={group.pic} alt='' className='w-10 h-10' />
                      <span>{group.name}</span>
                    </li>
                  );
                })}
              </ul>
            </li>
          );
        })}
      </ul>
      <div className='top-0 left-0 w-full absolute'>
        <div className='fixed-title'>{fixedTitle.current}</div>
      </div>
      {/* <div>
        <ul>
          {}
        </ul>
      </div> */}
    </div>
  );
}

export default SingerList;
