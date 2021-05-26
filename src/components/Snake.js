function Snake(props) {
  const { snakeBody } = props

  return (
    <>
      {
        snakeBody.map((dot,dotIndex) => (
          <span key={dotIndex} className="dot snake" style={{ left: `${dot[0]}%`, top: `${dot[1]}%` }}></span>
        ))
      }
    </>
  )
}

export default Snake