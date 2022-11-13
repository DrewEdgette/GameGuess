import React from "react";

function Start({ setMode, challengeInfo }) {
  return (
    <div>
      {challengeInfo ?
      <div>
      <p>Map Name: {challengeInfo.name}</p>
      <br></br>
      <p>Description: {challengeInfo.description}</p>
      <br></br>
      <button onClick={() => setMode("play")}>start game</button>
      </div>
      : <p>challenge not found</p>
    }
    </div>
  );
}

export default Start;
