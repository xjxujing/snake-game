import { memo } from 'react'
import './index.css'

const Cover = memo(function(props) {
  const state = props.gameState

  return (
    <div className="cover" style={{ display: `${state === 'PAUSE' ? 'block' : 'none'}` }}>
      <span>PAUSED</span>

      <div className="opera">
        <span onClick={props.reStartGame}><i className="iconfont icon-list"></i></span>
        <span onClick={props.onGameStateChange}><i className="iconfont icon-play"></i></span>
      </div>
    </div>
  )
})

export default Cover