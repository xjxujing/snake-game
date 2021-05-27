import { Component } from 'react';
import './App.css';
import Food from './components/Food';
import Snake from './components/Snake';


let timer = null
const STEP = 4
const initialState = {
  snakeBody: [
    [0, 0],
    [STEP, 0],
  ],
  food: generateFoodCoordinate(),
  direction: 'RIGHT',
  time: 200,

  gameState: 'START', // START | PAUSE | CONTINUE | OVER
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
  }

  componentDidUpdate() {
    this.checkIsOut()
    this.checkIsEatFood()
  }

  controlDirection(e) {
    const keysMap = {
      'ArrowUp': 'UP',
      'ArrowDown': 'DOWN',
      'ArrowRight': 'RIGHT',
      'ArrowLeft': 'LEFT',
    }
    if (!Object.keys(keysMap).includes(e.key)) return
    this.setState({ direction: keysMap[e.key] })
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

  onGameOver() {
    alert('游戏结束啦！0 分！')
    this.setState(initialState)
  }

  onGameStart = () => {
    clearTimeout(timer)
    this.setState(initialState)
    this.moveSnake()
  }

  onGameStateChange = () =>  {
    if(this.state.gameState === 'PAUSE') {
      this.onGameContinue()
    }else {
      this.onGamePause()
    }
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
      <>
        <div>
          <button onClick={this.onGameStart}>开始</button>

          <button onClick={this.onGameStateChange}>
            {this.state.gameState === 'PAUSE' ? '继续' : '暂停'}
          </button>

          <button>得分：{this.state.snakeBody.length - 2}</button>
        </div>

        <div className="game-area">
          <Snake snakeBody={this.state.snakeBody}></Snake>
          <Food food={this.state.food}></Food>
        </div>

      </>
    )
  }
}

export default App;
