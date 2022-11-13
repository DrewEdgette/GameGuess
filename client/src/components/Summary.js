import React from "react";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";
import ResultsMap from "./ResultsMap";

function Summary() {
  const { onNewGameClick, totalScore } = useContext(ChallengeContext);
  return (
    <>
      <div className="results-info">
        <ResultsMap></ResultsMap>
        <strong>{totalScore} Points</strong>
      </div>
      <button onClick={onNewGameClick}>Play Again</button>
    </>
  );
}

export default Summary;
