import { memo } from 'react'
import './index.css'

const GameStart = memo((props) => {

  return (
    <div className="start-cover" style={{display: props.gameState === 'START' ? 'block' : 'none'}}>

      <h4>SNAKE</h4>
      <button className="start-btn" onClick={props.onGameStart}>START</button>
    </div>
  )
})


export default GameStart