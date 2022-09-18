import React from 'react'

function Score({round}) {
  return (
    <div className='score'>Round: {round+1}/5</div>
  )
}

export default Score