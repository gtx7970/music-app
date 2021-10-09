import { useEffect, useRef, cloneElement } from 'react'
import PropTypes from 'prop-types'
import { useScroll } from '../../hooks'

function Scroll(props) {
  const wrapper = useRef()
  const { position } = useScroll(wrapper, props)
  console.log(position)
  useEffect(() => {
    // props.handleScroll(position)
  }, [props, position])
  // console.log(props.handleScroll)
  // props.handleScroll(position)
  // console.log(position)
  return (
    <div ref={wrapper} className="h-full overflow-hidden">
      {/* {cloneElement(props.children, {position})} */}
      { props.children }
    </div>
  )
}

Scroll.defaultProps = {
  click: true,
  probeType: 0,
  handleScroll: () => {}
}

Scroll.propTypes = {
  click: PropTypes.bool,
  probeType: PropTypes.number,
  handleScroll: PropTypes.func
}

export default Scroll