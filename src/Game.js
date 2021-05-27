// import { useEffect } from "react";
import "./App.css";
// import Food from './components/Food';
import Snake from "./components/Snake";
import { useRef } from "react";
import useSnake from "./hooks/useSnake";

function Game() {
  // const time = 200
  const [snakeBody, moveSnake] = useSnake();
  const timer = useRef(null);

  function onGameStart() {
    if (!timer.current) {
      timer.current = setInterval(() => {
        moveSnake();
      }, 200);
    }
  }

  function onGameStop() {
    clearTimeout(timer.current);
    timer.current = null;
  }

  return (
    <>
      <button onClick={onGameStart}>开始</button>
      <button onClick={onGameStop}>暂停</button>
      <div className="game-area">
        <Snake snakeBody={snakeBody}></Snake>
        {/* <Food food={this.state.food}></Food> */}
      </div>
    </>
  );
}

export default Game;
