import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Score({ round, minutes, seconds }) {
  return (
    <div className='score'>
      <strong>
        <p>
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit'}}>
            GameGuess
          </Link>
        </p>
      </strong>
      {/* Only display the timer if both minutes and seconds are provided */}
      {minutes !== undefined && seconds !== undefined && (
        <p>
          Time: {minutes.toString().length === 1 ? `0${minutes}` : minutes}:
          {seconds.toString().length === 1 ? `0${seconds}` : seconds}
        </p>
      )}
      <p>Round: {round + 1}/5</p>
    </div>
  );
}

export default Score;
