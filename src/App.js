import { Component } from 'react';
import './App.css';

import GameStart from './components/GameStart'
import Food from './components/Food';
import Snake from './components/Snake';
import Control from './components/Control'
import Cover from './components/Cover'
import GameOver from './components/GameOver'
import buttonWav from './audio/click.ogg'
import overWav from './audio/gameover.ogg'

// import {throttle} from './utils/utils'

let timeoutInstance;

const clear = (tm) => {
  if (tm) clearTimeout(tm);
};

const STEP = 4
const initialState = {
  snakeBody: [
    [0, 0],
    [STEP, 0],
  ],
  food: generateFoodCoordinate(),
  direction: 'RIGHT',
  time: 500,
  gameState: 'START', // OVER | CONTINUE | PAUSE | START
  aspectRatio: calcViewportAspectRatio(),
  score: 0
}

let buttonVoice = new Audio(buttonWav)
let overVoice = new Audio(overWav)

function calcViewportAspectRatio() {
  const W = document.documentElement.clientWidth
  const H = document.documentElement.clientHeight
  return (W / H).toFixed(2) >= 0.56
}

// 食物坐标 x, y 是 0 ~ 96 之间 的偶数
function generateFoodCoordinate() {
  const MAX = 98
  const MIN = 1
  const x = Math.floor((Math.random() * MAX + MIN) / STEP) * STEP
  const y = Math.floor((Math.random() * MAX + MIN) / STEP) * STEP
  return [x, y]
}

const localHighScore = localStorage.getItem('snake-game-high-score')

class App extends Component {

  state = { ...initialState, highScore: localHighScore ? localHighScore : 0}


  componentDidMount() {
    document.addEventListener('keydown', this.controlDirection)
  }

  componentDidUpdate = () => {
    if (this.state.gameState === 'OVER') return
    this.checkIsOut()
    this.checkIsEatFood()
    this.checkIsTouchSelf()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.controlDirection)
  }

  clickDirection = (direction) => {   
    // console.log('clickDirection') 
    const currentDirection = this.state.direction
    if (currentDirection === direction) return

    if (currentDirection === 'LEFT' && direction === 'RIGHT') return
    if (direction === 'LEFT' && currentDirection === 'RIGHT') return

    if (currentDirection === 'UP' && direction === 'DOWN') return
    if (direction === 'UP' && currentDirection === 'DOWN') return

    buttonVoice.play()
    // console.log(direction)
    this.setState({ direction })
  }

  controlDirection = ({ key }) => {
    const keysMap = {
      'ArrowUp': 'UP',
      'ArrowDown': 'DOWN',
      'ArrowRight': 'RIGHT',
      'ArrowLeft': 'LEFT',
    }
    if (!Object.keys(keysMap).includes(key)) return
    this.clickDirection(keysMap[key])
  }

  moveSnake = () => {
    clear(timeoutInstance)
    if (this.state.gameState === 'OVER') return

    const body = [...this.state.snakeBody]
    const head = body[body.length - 1]

    const directionMap = {
      'UP': [head[0], head[1] - STEP],
      'DOWN': [head[0], head[1] + STEP],
      'RIGHT': [head[0] + STEP, head[1]],
      'LEFT': [head[0] - STEP, head[1]]
    }

    const moveHead = directionMap[this.state.direction]
    body.push(moveHead)
    body.shift()
    this.setState({ snakeBody: body })

    timeoutInstance = setTimeout(this.moveSnake, this.state.time)
  }

  checkIsOut = () => {
    const head = this.state.snakeBody[this.state.snakeBody.length - 1]
    // debugger

    if (head[0] >= 100 ||
      head[1] >= 100 ||
      head[0] < 0 ||
      head[1] < 0) {
      this.onGameOver()
    }
  }

  checkIsEatFood = () => {
    const head = this.state.snakeBody[this.state.snakeBody.length - 1]
    const food = this.state.food

    if (head[0] === food[0] && head[1] === food[1]) {
      let newSnake = [...this.state.snakeBody];
      newSnake.unshift([]);

      const score = (newSnake.length - 2) * 5
      this.setState({
        food: generateFoodCoordinate(),
        snakeBody: newSnake,
        score
      })

      this.changeSpeed('SPEED_UP')
    }
  }

  checkIsTouchSelf = () => {
    const body = [...this.state.snakeBody]
    const head = body.pop()
    body.forEach(item => {
      if (item[0] === head[0] && item[1] === head[1]) {
        this.onGameOver()
      }
    })
  }

  changeSpeed = (type) => {
    const currentTime = this.state.time

    if (type === 'SPEED_UP') {
      if (currentTime < 300) return
      buttonVoice.play()
      this.setState({ time: currentTime - 100 })
    } else {
      if (currentTime > 800) return
      buttonVoice.play()
      this.setState({ time: currentTime + 100 })
    }
  }

  onGameStart = () => {
    buttonVoice.play()
    this.changeGameState('CONTINUE')
    this.moveSnake()
  }

  reStartGame = () => {
    this.changeGameState('START')
    if (this.state.highScore < this.state.score) {
      localStorage.setItem('snake-game-high-score', this.state.score)
      this.setState({ highScore: this.state.score })
    }
    this.setState({ ...initialState })
    clear(timeoutInstance)
  }

  onGameStateChange = () => {
    if (this.state.gameState === 'PAUSE') {
      this.onGameContinue()
    } else {
      this.onGamePause()
    }
    buttonVoice.play()
  }

  changeGameState = (state) => {
    this.setState({ gameState: state })
  }

  onGamePause = () => {
    clear(timeoutInstance)
    this.changeGameState('PAUSE')
  }

  onGameContinue = () => {
    this.changeGameState('CONTINUE')
    this.moveSnake()
  }

  onGameOver = () => {
    clear(timeoutInstance)
    overVoice.play()
    this.changeGameState('OVER')
  }

  render() {
    return (
      <div className={[`wrapper ${this.state.aspectRatio ? 'height-100' : 'width-100'}`]}>
        <GameStart
          highScore={this.state.highScore}
          gameState={this.state.gameState}
          onGameStart={this.onGameStart}
        />

        <div className="game-area">
          <Snake snakeBody={this.state.snakeBody}></Snake>
          <Food food={this.state.food}></Food>
        </div>

        <Control
          score={this.state.score}
          highScore={this.state.highScore}
          direction={this.state.direction}
          clickDirection={direc => this.clickDirection(direc)}
          onGameStateChange={this.onGameStateChange}
          changeSpeed={type => this.changeSpeed(type)}
          gameState={this.state.gameState}
        >
        </Control>

        <Cover
          gameState={this.state.gameState}
          onGameStateChange={this.onGameStateChange}
          changeGameState={this.changeGameState}
          reStartGame={this.reStartGame}
        >
        </Cover>

        <GameOver gameState={this.state.gameState} reStartGame={this.reStartGame}></GameOver>
      </div>
    )
  }
}

export default App;
