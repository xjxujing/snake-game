import { useState, useEffect } from "react";

const STEP = 4;

function useSnakeBody() {
  const [snake, setSnake] = useState({
    body: [[0, 0], [STEP, 0]],
    direction: 'RIGHT'
  });

  function moveSnake() {
    setSnake((sbody) => {
      const {body, direction} = sbody;
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
      return {...sbody, body};
    });
  };


  useEffect(() => {
    const controlDirection = ({ key }) => {
      const keysMap = {
        ArrowUp: "UP",
        ArrowDown: "DOWN",
        ArrowRight: "RIGHT",
        ArrowLeft: "LEFT"
      }

      if (!Object.keys(keysMap).includes(key)) return;
      const d = keysMap[key]
      setSnake((sbody) => {return {...sbody, direction: d}})
    }
    document.addEventListener('keydown', controlDirection)

    return () => {
      document.removeEventListener('keydown', controlDirection);
    }
  }, [])

  return [snake.body, moveSnake];
}

export default useSnakeBody;
