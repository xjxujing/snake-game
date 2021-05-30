import { Component } from 'react';
import './App.css';
import Food from './components/Food';
import Snake from './components/Snake';
import Control from './components/Control'
import Cover from './components/Cover'
import GameOver from './components/GameOver'
import buttonWav from './audio/button.wav'


let timer = null
const STEP = 4
const initialState = {
  snakeBody: [
    [0, 0],
    [STEP, 0],
  ],
  food: generateFoodCoordinate(),
  direction: 'RIGHT',
  time: 400,

  gameState: 'START', // START | PAUSE | CONTINUE | OVER

  aspectRatio: calcScreenAspectRatio(),

  score: 0
}

let buttonVoice = new Audio(buttonWav)


function calcScreenAspectRatio() {
  const W = document.documentElement.clientWidth
  const H = document.documentElement.clientHeight
  return (W / H) >= 0.56
}

// 食物坐标 x, y 是 0 ~ 96 之间 的偶数
function generateFoodCoordinate() {
  const MAX = 98
  const MIN = 1
  const x = Math.floor((Math.random() * MAX + MIN) / STEP) * STEP
  const y = Math.floor((Math.random() * MAX + MIN) / STEP) * STEP
  return [x, y]
}

class App extends Component {

  state = initialState

  componentDidMount() {
    document.addEventListener('keydown', this.controlDirection.bind(this))
    this.moveSnake()
  }

  componentDidUpdate() {
    if (this.state.gameState === 'OVER') {
      clearTimeout(timer)
      timer = null
      return
    }
    this.checkIsOut()
    this.checkIsEatFood()
    this.checkIsTouchSelf()
  }

  clickDirection = (direction) => {
    const currentDirection = this.state.direction
    if (currentDirection === direction) return

    if (currentDirection === 'LEFT' && direction === 'RIGHT') return
    if (direction === 'LEFT' && currentDirection === 'RIGHT') return

    if (currentDirection === 'UP' && direction === 'DOWN') return
    if (direction === 'UP' && currentDirection === 'DOWN') return

    buttonVoice.play()
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
    clearTimeout(timer)
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
    timer = setTimeout(this.moveSnake, this.state.time)
  }

  checkIsOut() {
    const head = this.state.snakeBody[this.state.snakeBody.length - 1]
    if (head[0] >= 100 ||
      head[1] >= 100 ||
      head[0] < 0 ||
      head[1] < 0) {

      this.onGameOver()
    }
  }

  checkIsEatFood() {
    const head = this.state.snakeBody[this.state.snakeBody.length - 1]
    const food = this.state.food

    if (head[0] === food[0] && head[1] === food[1]) {
      let newSnake = [...this.state.snakeBody];
      newSnake.unshift([]);

      this.setState({
        food: generateFoodCoordinate(),
        snakeBody: newSnake
      })
    }
  }

  checkIsTouchSelf() {
    const body = [...this.state.snakeBody]
    const head = body.pop()
    body.forEach(item => {
      if (item[0] === head[0] && item[1] === head[1]) {
        this.onGameOver()
      }
    })
  }

  changeSpeed(type) {
    const currentTime = this.state.time

    if (type === 'SPEED_UP') {
      if (currentTime < 200) return
      buttonVoice.play()
      this.setState({ time: currentTime - 100 })
    } else {
      if (currentTime > 700) return
      buttonVoice.play()
      this.setState({ time: currentTime + 100 })
    }
  }

  onGameOver() {
    // clearTimeout(timer)
    // timer = null
    alert(`游戏结束！`);
    this.setState(initialState)
    // this.setState({ gameState: 'OVER' })
  }

  onGameStart = () => {
    clearTimeout(timer)
    this.setState(initialState)
    this.moveSnake()
  }

  onGameStateChange = () => {
    if (this.state.gameState === 'PAUSE') {
      this.onGameContinue()
    } else {
      this.onGamePause()
    }
    buttonVoice.play()
  }

  onGamePause = () => {
    this.setState({ gameState: 'PAUSE' })
    clearTimeout(timer)
  }

  onGameContinue = () => {
    this.setState({ gameState: 'CONTINUE' })
    this.moveSnake()
  }


  render() {
    return (
      <div className={[`wrapper ${this.state.aspectRatio ? 'height-100' : 'width-100'}`]}>
        <div className="game-area">
          <Snake snakeBody={this.state.snakeBody}></Snake>
          <Food food={this.state.food}></Food>
        </div>

        <Control
          snakeBody={this.state.snakeBody}
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
        >
        </Cover>

        <GameOver gameState={this.state.gameState}></GameOver>
      </div>
    )
  }
}

export default App;
