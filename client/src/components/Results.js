import React from "react";
import ResultsMap from "./ResultsMap";

function Results({ locations, guessLocation, round, onContinueClick, onNewGameClick }) {
  let button;
  button =
    round < 4 ? (
      <button onClick={onContinueClick}>Next Round</button>
    ) : (
      <button onClick={onNewGameClick}>New Game</button>
    );

  return (
    <div className="results">
      <ResultsMap locations={locations} guessLocation={guessLocation} round={round}></ResultsMap>
      {button}
    </div>
  );
}

export default Results;
