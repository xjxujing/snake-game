import { memo } from 'react'
import './index.css'

const GameStart = memo((props) => {

  function showScore() {
    let highScoreStr = String(props.highScore)
    return highScoreStr.padStart(5, '0')
  }

  return (
    <div className="start-cover" style={{ display: props.gameState === 'START' ? 'block' : 'none' }}>

      <div className="game-title">SNAKE</div>
      <button onClick={props.onGameStart} type="button" className="start-btn nes-btn">START</button>

      <p className="high-score">High Score</p>
      <p className="high-score">{showScore()}</p>

    </div>
  )
})


export default GameStart