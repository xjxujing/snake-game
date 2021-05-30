import { memo } from 'react'

const Food = memo(function(props) {
  const { food } = props

  return (
    <span className="dot food" style={{left: `${food[0]}%`, top: `${food[1]}%`}}></span>
  )
})

export default Food