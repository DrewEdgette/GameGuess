import React from 'react'

function Score({round, minutes, seconds}) {
  return (
    <div className='score'>
      <p>Time: {minutes.toString().length === 1 ? `0${minutes}` : minutes}:{seconds.toString().length === 1 ? `0${seconds}` : seconds}</p>
      <p>Round: {round+1}/5</p>
      </div>
  )
}

export default Score