import React from "react";
import ResultsMap from "./ResultsMap";

function Results({ locations, round, onContinueClick }) {

  return (
  <div className="results">
    <ResultsMap locations={locations}></ResultsMap>
    <button onClick={onContinueClick}>Next Rounds</button>
    </div>);
}

export default Results;
