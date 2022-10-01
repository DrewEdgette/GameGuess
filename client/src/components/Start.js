import React from "react";

function Start({ setMode }) {
  return (
    <div>
      <button onClick={() => setMode("play")}>start game</button>
    </div>
  );
}

export default Start;
