import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useScroll } from '../../hooks'

function Scroll(props) {
  const wrapper = useRef()
  const { position } = useScroll(wrapper, props)
  // console.log(position)
  return (
    <div ref={wrapper} className="h-full overflow-hidden">
      { props.children }
    </div>
  )
}

Scroll.defaultProps = {
  click: true,
  probeType: 0
}

Scroll.propTypes = {
  click: PropTypes.bool,
  probeType: PropTypes.number
}

export default Scroll