import React from "react";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import ResultsMap from "./ResultsMap";

function Summary() {
  const { onNewGameClick, totalScore } = useContext(ChallengeContext);
  return (
    <div className="results">
      <div className="results-info">
        <ResultsMap></ResultsMap>
        <h1>{totalScore} Points</h1>
      </div>
      <button onClick={onNewGameClick}>Play Again</button>
    </div>
  );
}

export default Summary;
