function Cover(props) {
  console.log('cover', props)

  const state = props.gameState

  return (
    <div className="cover" style={{ display: `${state === 'PAUSE' ? 'block' : 'none'}` }}>
      <span>PAUSED</span>

      <div className="opera">
        <span onClick={props.onGameStateChange}><i className="iconfont icon-list"></i></span>
        <span onClick={props.onGameStateChange}><i className="iconfont icon-play"></i></span>
      </div>
    </div>
  )

}
export default Cover