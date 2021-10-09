import { FaHeart, FaRandom, FaExchangeAlt } from 'react-icons/fa'

function Player() {
  return (
    <div className="normal-player">
      <div className="top"></div>
      <div className="middle"></div>
      <div className="bottom">
        <div className="progress-bar"></div>
        <div className="operator">
          <div className="icon-left"></div>
          <div className="icon-left"></div>
          <div className="icon-center"></div>
          <div className="icon-right"></div>
          <div className="icon-right"></div>
        </div>
      </div>
    </div>
  )
}

export default Player