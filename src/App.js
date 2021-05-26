import { Component } from 'react';
import './App.css';
import Food from './components/Food';
import Snake from './components/Snake';


const STEP = 4

class App extends Component {

  state = {
    snakeBody: [
      [0, 0],
      [STEP, 0]
    ],
    food: this.generateFoodCoordinate(),
    direction: 'RIGHT',
    time: 100
  }

  // 食物坐标 x, y 是 0 ~ 96 之间 的偶数
  generateFoodCoordinate() {
    const MAX = 98
    const MIN = 1
    const x = Math.floor((Math.random() * MAX + MIN) / STEP) * STEP
    const y = Math.floor((Math.random() * MAX + MIN) / STEP) * STEP
    return [x, y]
  }

  componentDidMount() {
    document.addEventListener('keydown', this.controlDirection.bind(this))
    this.moveSnake()
  }

  componentDidUpdate() {
    this.checkIsOut()
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
    setTimeout(this.moveSnake, this.state.time)
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

  onGameOver() {
    alert('游戏结束啦！0 分！')
  }

  render() {
    return (
      <div className="game-area">
        <Snake snakeBody={this.state.snakeBody}></Snake>
        <Food food={this.state.food}></Food>
      </div>
    )
  }
}

export default App;
