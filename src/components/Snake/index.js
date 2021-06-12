
import React, { Component } from 'react'


class Snake extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    function checkIsOut() {
      const head = nextProps.snakeBody[nextProps.snakeBody.length - 1]
      if (head[0] >= 100 ||
        head[1] >= 100 ||
        head[0] < 0 ||
        head[1] < 0) {
          return true
      }
    }
    // 出界了就不要继续渲染了
    if(checkIsOut()) return null
    // console.log({ nextProps, nextState })
    return true
  }

  render() {
    const { snakeBody } = this.props
    return (
      <>
        {
          snakeBody.map((dot, dotIndex) => {
            // const style = { left: `${dot[0]}%`, top: `${dot[1]}%` }
            const style = { transform: `translate(${dot[0] * 25}%,${dot[1] * 25}%)` }
            return (
              <span key={dotIndex} className="dot snake" style={style}></span>
            )
          }
          )
        }
      </>
    )
  }
}

export default Snake