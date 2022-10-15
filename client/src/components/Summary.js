import React from "react";
import SummaryMap from "./SummaryMap";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengeContext";

function Summary() {
  const { onNewGameClick, totalScore } = useContext(ChallengeContext);
  return (
    <>
      <div className="results-info">
        <SummaryMap></SummaryMap>
        <strong>{totalScore} Points</strong>
      </div>
      <button onClick={onNewGameClick}>Start New Game</button>
    </>
  );
}

export default Summary;
