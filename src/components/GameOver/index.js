import { memo } from 'react'
import './index.css'

const GameOver = memo(function (props) {

  const state = props.gameState

  return (
    <div className="cover" style={{ display: `${state === 'OVER' ? 'block' : 'none'}` }}>
      <span className="game-over">GAME OVER</span>

      <div className="opera">
        <span onClick={props.reStartGame}><i className="iconfont icon-list"></i></span>
      </div>
    </div>
  )
})


export default GameOver