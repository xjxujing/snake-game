// import { useEffect } from "react";
import "./App.css";
// import Food from './components/Food';
import Snake from "./components/Snake";
import useSnake from "./hooks/useSnake";

function Game() {
  const time = 1000
  const [snakeBody, moveSnake] = useSnake();
  let timer = null

  function onGameStart() {
    clearTimeout(timer)
    moveSnake()
    timer = setTimeout(onGameStart, time)
  }

  return (
    <>
      <button onClick={onGameStart}>开始</button>
      <div className="game-area">
        <Snake snakeBody={snakeBody}></Snake>
        {/* <Food food={this.state.food}></Food> */}
      </div>
    </>
  );
}

export default Game;
