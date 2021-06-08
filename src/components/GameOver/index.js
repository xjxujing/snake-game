import { memo } from 'react'

const GameOver = memo(function (props) {
  
  const state = props.gameState

  function gameOver() {
    props.changeGameState('START')
  }
  return (
    <div className="cover" style={{ display: `${state === 'OVER' ? 'block' : 'none'}` }}>
      <span>GAME OVER</span>

      <div className="opera">
        <span onClick={gameOver}><i className="iconfont icon-list"></i></span>
      </div>
    </div>
  )
})


export default GameOver