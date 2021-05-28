import { useState, useEffect } from "react";

const STEP = 4;

function useSnake() {
  const initialState = {
    body: [[0, 0], [STEP, 0]],
    direction: 'RIGHT'
  }
  const [snake, setSnake] = useState(initialState);

  function moveSnake() {
    setSnake(s => {
      const { body, direction } = s;
      const head = body[body.length - 1];

      const directionMap = {
        UP: [head[0], head[1] - STEP],
        DOWN: [head[0], head[1] + STEP],
        RIGHT: [head[0] + STEP, head[1]],
        LEFT: [head[0] - STEP, head[1]]
      };

      const moveHead = directionMap[direction];
      body.push(moveHead);
      body.shift();
      return { ...s, body, direction }
    })
  }


  useEffect(() => {
    const controlDirection = ({ key }) => {
      const keysMap = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowRight: "RIGHT",
        ArrowLeft: "LEFT"
      };
      if (!Object.keys(keysMap).includes(key)) return;
      const d = keysMap[key];
      setSnake((s) => {
        return { ...s, direction: d };
      });
    }
    document.addEventListener('keydown', controlDirection)

    return () => {
      document.removeEventListener('keydown', controlDirection);
    }
  }, [snake])

  // useEffect(() => {
  //   checkIsOut()
  // })

  // function checkIsOut() {
  //   const head = snake.body[snake.body.length - 1]
  //   if (head[0] >= 100 ||
  //     head[1] >= 100 ||
  //     head[0] < 0 ||
  //     head[1] < 0) {

  //     onGameOver()
  //   }
  // }

  // function onGameOver() {
  //   alert('游戏结束啦！0 分！')
  //   setSnake(initialState)
  // }

  return [snake.body, moveSnake];
}

export default useSnake;
