import { Component } from 'react';
import './App.css';
import Food from './components/Food';
import Snake from './components/Snake';



class App extends Component {

  state = {
    snakeBody: [
      [0, 0],
      [2, 0]
    ],
    food: this.generateFoodCoordinate()
  }

  // 食物坐标 x, y 是 0 ~ 98 之间 
  generateFoodCoordinate() {
    const MAX = 98
    const MIN = 1
    const x = Math.floor((Math.random() * MAX + MIN) / 2) * 2
    const y = Math.floor((Math.random() * MAX + MIN) / 2) * 2
    return [x, y]
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
