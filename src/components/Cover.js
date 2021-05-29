function Cover(props) {
  console.log('cover', props)

  return (
    <div className="cover" style={{display: `${props.gameState === 'PAUSE' ? 'block' : 'none'}`}}>
      PAUSED
    </div>
  )

}
export default Cover