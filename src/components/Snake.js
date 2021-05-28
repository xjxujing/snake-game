function Snake(props) {
  const { snakeBody } = props
  console.log('子组件 Snake', props)

  return (
    <>
      {
        snakeBody.map((dot, dotIndex) => {
          const style = { left: `${dot[0]}%`, top: `${dot[1]}%` }
            return (
              <span key={dotIndex} className="dot snake" style={style}></span>
            )
          }
        )
      }
    </>
  )
}

export default Snake